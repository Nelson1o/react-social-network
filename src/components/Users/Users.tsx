import React, { useEffect } from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, requestUsers } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/usersSelectors";
import { AppDispatch } from "../../redux/reduxStore";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }

    const follow = (userId: number) => {
        dispatch(follow(userId));
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {
                users.map((u: any) =>
                    <User
                        user={u}
                        key={u.id}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                    />
                )
            }
        </div>
    )
}
