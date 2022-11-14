// import { ThunkAction } from "redux-thunk";
// import { AppStateType } from "./reduxStore";
import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
};

const appRuducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type ActionsTypes = InitializedSuccessActionType;

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

//======================================================================================
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        });
    }
}

export default appRuducer;