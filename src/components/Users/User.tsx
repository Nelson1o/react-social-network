import React from "react";
// @ts-ignore
import styles from './Users.module.css';
// @ts-ignore
import userPhoto from '../../assets/images/user.jpg';
import { NavLink } from "react-router-dom";
import { UserType } from "../types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,

    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

let User: React.FC<PropsType> = (props) => {
    let u = props.user;
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="man"
                            className={styles.usersPhoto} />
                    </NavLink>
                </div>
                <div>
                    {
                        u.followed ?
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button> :
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>
    )
}

export default User;