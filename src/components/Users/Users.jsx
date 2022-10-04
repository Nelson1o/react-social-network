import React from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator'

let Users = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} />
            {
                props.users.map(u =>
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