import { InferActionsTypes } from './reduxStore';
import { getAuthUserData } from "./authReducer";

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof Actions>;

const appRuducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const Actions = {
    initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const)
}

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(Actions.initializedSuccess());
            });
    }
}

export default appRuducer;