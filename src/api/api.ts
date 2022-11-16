import { UserType } from './../components/types/types';
import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "cc3d12aa-b0b9-461e-95cb-e69576efd8e9"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptchaEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum | ResultCodeWithCaptchaEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}