const UPDATE_NEW_MESSSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsRuducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSSAGE_BODY:
            state.newMessageText = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageText;
            state.newMessageText = '';
            state.messagesData.push({id: 6, message: `${body}`});
            return state;
        default:
            return state;
    }
}

export const updateNewMessageBodyCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSSAGE_BODY,
        body: body
    }
}

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE,
    }
}

export default dialogsRuducer;