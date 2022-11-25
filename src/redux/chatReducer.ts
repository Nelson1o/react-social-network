import store, { BaseThunkType, InferActionsTypes, AppStateType } from './reduxStore';
import { chatAPI, ChatMessageType } from '../api/chatAPI';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

let initialState = {
    messages: [] as ChatMessageType[]
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
                messages: [...state.messages, ...action.payload]
            };
        default:
            return state;
    }
}

export const Actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ type: "MESSAGE_RECEIVED", payload: messages })
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(Actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.subscribe(newMessageHandlerCreator(dispatch));
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
        chatAPI.start();
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message);
        chatAPI.stop();
    }
}

export default chatRuducer;