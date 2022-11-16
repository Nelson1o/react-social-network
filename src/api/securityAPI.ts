import { instance } from "./api";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptcha() {
        const res = await instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`);
        return res.data;
    }
}