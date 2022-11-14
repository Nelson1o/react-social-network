import { ThunkAction } from "redux-thunk";
import { usersAPI, profileAPI } from "../api/api";
import { PostType, ProfileType } from "../components/types/types";
import { AppStateType } from "./reduxStore";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";

let initialState = {
    posts: [
        { id: 1, post: 'Hi, how are you?', likesCount: 15 },
        { id: 2, post: 'It\'s my first post', likesCount: 18 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
};

export type InitialStateType = typeof initialState;

const profileRuducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                post: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionType | SetStatusActionType;

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        newPostText
    }
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
}

//========================================================================================
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default profileRuducer;