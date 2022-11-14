import React from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator';
import { UserType } from "../types/types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {
                users.map(u =>
                    <User
                        user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                    />
                )
            }
        </div>
    )
}

export default Users;