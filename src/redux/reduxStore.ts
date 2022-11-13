import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authRuducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appRuducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authRuducer,
    form: formReducer,
    app: appRuducer
});

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

// window.store = store;

export default store;