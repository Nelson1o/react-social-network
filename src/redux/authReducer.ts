import { ResultCodeWithCaptchaEnum } from './../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { authAPI } from '../api/authAPI';
import { securityAPI } from '../api/securityAPI';

let initialState = {
    isFetching: false,
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authRuducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            };
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const Actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: 'SET_USER_DATA',
            payload: {
                userId,
                email,
                login,
                isAuth
            }
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: 'GET_CAPTCHA_URL_SUCCESS',
            payload: {
                captchaUrl
            }
        } as const
    }
}

//=====================================================================================================
type ActionsType = InferActionsTypes<typeof Actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authAPI.me();

        if (meData.resultCode === ResultCodeEnum.Success) {
            let { id, login, email } = meData.data;
            dispatch(Actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => {
    return async (dispatch) => {
        let loginData = await authAPI.login(email, password, rememberMe, captcha);
        if (loginData.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData());
        }
        else {
            if (loginData.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(Actions.setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptcha();
        const captchaUrl = response.url;
        dispatch(Actions.getCaptchaUrlSuccess(captchaUrl));
    }
}

export default authRuducer;