import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "cc3d12aa-b0b9-461e-95cb-e69576efd8e9"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptchaEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { 
        id: number, 
        email: string, 
        login: string
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

type LoginResponseType = {
    data: { 
        userId: number
    },
    resultCode: ResultCodeEnum | ResultCodeWithCaptchaEnum,
    messages: Array<string>
}

export const authAPI = {
    async me() {
        // return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
        const res = await instance.get<MeResponseType>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        // return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
        const res = await instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`);
    }
}