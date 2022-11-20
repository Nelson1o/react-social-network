import React, { useEffect } from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, requestUsers } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";
import { AppDispatch } from "../../redux/reduxStore";
import { useLocation, useNavigate } from "react-router-dom";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const history = useNavigate();
    const location = useLocation();

    

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const parsed = new URLSearchParams(location.search);
        const queryTerm = parsed.get('term');
        const queryFriend = parsed.get('friend');
        const queryPage = parsed.get('page');

        let actualPage = currentPage;
        let actualFilter = filter;

        if (queryPage) {
            actualPage = Number(queryPage);
        }

        if (!!queryTerm) {
            actualFilter = { ...actualFilter, term: queryTerm };
        }

        switch (queryFriend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
            default:
                break;
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        history({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, currentPage]);

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
