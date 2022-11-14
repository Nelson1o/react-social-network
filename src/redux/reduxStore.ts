import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authRuducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appRuducer from "./appReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authRuducer,
    form: formReducer,
    app: appRuducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;