import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    isFetching: false,
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authRuducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPaloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPaloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
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

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string
    }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {
            captchaUrl
        }
    }
}

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let response = await authAPI.me();

        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return async (dispatch: any) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let response = await securityAPI.getCaptcha();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
}

export default authRuducer;