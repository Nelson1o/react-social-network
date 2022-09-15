import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, post: 'Hi, how are you?', likesCount: '15' },
                { id: 2, post: 'It\'s my first post', likesCount: '18' }
            ],
            newPostText: "React Super Good"
        },

        dialogsPage: {
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
        },

        sidebar: {}
    },

    subscribe(observer) {
        this._callSubscriber = observer;  // observer
    },

    getState() {
        return this._state;
    },

    _callSubscriber() {
        console.log("State change");
    },

    dispatch(action) {   // {type: 'ADD-POST'}
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        
        this._callSubscriber(this._state);
    }
}

export default store;