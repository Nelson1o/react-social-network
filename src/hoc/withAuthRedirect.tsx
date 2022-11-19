import { AppStateType } from '../redux/reduxStore';
import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type OwnPropsType = {
    isAuth: boolean
}

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<OwnPropsType>{
        render(){
            if(!this.props.isAuth) {
                return <Navigate to='/login' />
            }
            return <Component {...this.props} />
        }
    }
    
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}