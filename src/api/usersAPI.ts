import { GetItemsType, instance, APIResponseType } from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term = "", friend: null | boolean = null) {
        const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`));
        return res.data;
    },
    async follow(userId: number) {
        const res = await instance.post<APIResponseType>(`follow/${userId}`);
        return res.data;
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    }
}
