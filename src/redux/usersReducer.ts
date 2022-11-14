import { AppStateType } from './reduxStore';
import { usersAPI } from "../api/api";
import { UserType } from "../components/types/types";
import { updateObjectInArray } from "../utils/objectsHelpers";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count / 100
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type ActionsTypes = FollowSuccessActionCreator | UnfollowSuccessActionCreator
    | SetUserActionCreator | SetCurrentPageActionCreator | SetTotalUsersCountActionCreator
    | ToggleIsFetchingActionCreator | ToggleFollowingProgressActionCreator;

type FollowSuccessActionCreator = {
    type: typeof FOLLOW,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionCreator => {
    return {
        type: FOLLOW,
        userId
    }
}

type UnfollowSuccessActionCreator = {
    type: typeof UNFOLLOW,
    userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionCreator => {
    return {
        type: UNFOLLOW,
        userId
    }
}

type SetUserActionCreator = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUserActionCreator => {
    return {
        type: SET_USERS,
        users
    }
}

type SetCurrentPageActionCreator = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionCreator => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

type SetTotalUsersCountActionCreator = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionCreator => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalCount
    }
}

type ToggleIsFetchingActionCreator = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionCreator => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type ToggleFollowingProgressActionCreator = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionCreator => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

//===========================================================================================================================//
// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowSuccessActionCreator | UnfollowSuccessActionCreator) => {
    //dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    //dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

export default usersRuducer;