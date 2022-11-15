import { AppStateType, InferActionsTypes } from './reduxStore';
import { usersAPI } from "../api/api";
import { UserType } from "../components/types/types";
import { updateObjectInArray } from "../utils/objectsHelpers";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

let initialState = {
    users: [] as Array<UserType> | any, // !!!!!!
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user id
};

type InitialState = typeof initialState;

const usersRuducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count / 100
            };
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const Actions = {
    followSuccess: (userId: number) => {
        return {
            type: 'FOLLOW',
            userId
        } as const
    },
    
    unfollowSuccess: (userId: number) => {
        return {
            type: 'UNFOLLOW',
            userId
        } as const
    },

    setUsers: (users: Array<UserType>) => {
        return {
            type: 'SET_USERS',
            users
        } as const
    },
    
    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage
        } as const
    },
    
    setTotalUsersCount: (totalCount: number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            count: totalCount
        } as const
    },
    
    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_IS_FETCHING',
            isFetching
        } as const
    },
    
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const
    }
}

type ActionsTypes = InferActionsTypes<typeof Actions>;

//===========================================================================================================================//
// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(Actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(Actions.toggleIsFetching(false));
        dispatch(Actions.setUsers(data.items));
        dispatch(Actions.setTotalUsersCount(data.totalCount));
        dispatch(Actions.setCurrentPage(currentPage));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    //dispatch(Actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    //dispatch(Actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), Actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), Actions.unfollowSuccess);
    }
}

export default usersRuducer;