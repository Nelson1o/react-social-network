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
            ]
        }
    },

    getState() {
        return this._state;
    },

    _callSubscriber() {
        console.log("State change");
    },

    addPost() {
        let newPost = {
            id: 5,
            post: this._state.profilePage.newPostText,
            likesCount: 0
        };

        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
    },

    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },

    subscribe(observer) {
        this._callSubscriber = observer;  // observer
    }

}

export default store;