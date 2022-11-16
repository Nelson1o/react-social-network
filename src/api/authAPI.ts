import { instance, APIResponseType, ResultCodeEnum, ResultCodeWithCaptchaEnum } from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseType = {
    userId: number
}

export const authAPI = {
    async me() {
        // return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
        const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        // return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
        const res = await instance.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodeWithCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}