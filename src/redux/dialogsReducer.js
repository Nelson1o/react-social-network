const UPDATE_NEW_MESSSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Anton' }
    ],

    messagesData: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'What is your Name?' },
        { id: 3, message: 'Where are you?' },
        { id: 4, message: 'Oups!?' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Hello world!' }
    ],

    newMessageText: ''
};

const dialogsRuducer = (state = initialState, action) => {
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