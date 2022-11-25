import { Action, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authRuducer from "./authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appRuducer from "./appReducer";
import chatRuducer from "./chatReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authRuducer,
    form: formReducer,
    app: appRuducer,
    chat: chatRuducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;

export default store;