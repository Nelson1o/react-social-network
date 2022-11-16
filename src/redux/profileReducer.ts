import { profileAPI } from "../api/profileAPI";
import { PostType, ProfileType } from "../components/types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

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
type ActionsType = InferActionsTypes<typeof Actions>;
type ThunkType = BaseThunkType<ActionsType>;

const profileRuducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const Actions = {
    addPostActionCreator: (newPostText: string) => {
        return {
            type: 'ADD_POST',
            newPostText
        }as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {
            type: 'SET_USER_PROFILE',
            profile
        }as const
    },
    setStatus: (status: string) => {
        return {
            type: 'SET_STATUS',
            status
        }as const
    }
}

//========================================================================================

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(Actions.setUserProfile(response));
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = profileAPI.getStatus(userId);
        dispatch(Actions.setStatus(await response));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.resultCode === 0) {
                dispatch(Actions.setStatus(status));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default profileRuducer;