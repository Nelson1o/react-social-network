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
};

const dialogsRuducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: `${body}` }]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}

export default dialogsRuducer;