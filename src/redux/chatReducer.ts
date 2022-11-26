import store, { BaseThunkType, InferActionsTypes, AppStateType } from './reduxStore';
import { chatAPI, ChatMessageApiType, StatusType } from '../api/chatAPI';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

type ChatMessageType = ChatMessageApiType & {id: string};

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof Actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const chatRuducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            };
        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}

export const Actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ type: "MESSAGES_RECEIVED", payload: {messages} } as const),
    statusChanged: (status: StatusType) => ({ type: "STATUS_CHANGED", payload: {status} } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(Actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(Actions.statusChanged(status));
        }
    }
    return _statusChangedHandler;
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start();
        // @ts-ignore
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch));
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        // @ts-ignore
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
        chatAPI.stop();
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message);
    }
}

export default chatRuducer;