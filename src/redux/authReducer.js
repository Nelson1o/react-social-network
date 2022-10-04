import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    isFetching: false,
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authRuducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    }
}

export const getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authAPI.me();

        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authRuducer;