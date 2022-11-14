import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from '../../redux/usersReducer';
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/usersSelectors";
import { UserType } from "../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string,
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, { follow, unfollow, requestUsers })
)(UsersContainer);