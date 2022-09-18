import * as axios from "axios";
import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.jpg'

let Users = (props) => {
    if (props.users.length === 0) {
        axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
            })
    }

    return (
        <div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="man" className={styles.usersPhoto} />
                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> :
                                        <button onClick={() => { props.follow(u.id) }}>Follow</button>
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
        </div>
    )
}

export default Users;

/* [
    {
        id: 1,
        photoUrl: 'https://imena.guru/wp-content/uploads/2018/06/dmitriy-nagiev.jpg',
        followed: false,
        fullName: 'Dmitry',
        status: 'I am a boss',
        location: {
            city: 'Minsk',
            country: 'Belarus'
        }
    },
    {
        id: 2,
        photoUrl: 'https://тайна-вашего-имени.рф/img/imena/dmitriy.jpg',
        followed: true,
        fullName: 'Sasha',
        status: 'I am a boss too',
        location: {
            city: 'Moscow',
            country: 'Russia'
        }
    },
    {
        id: 3,
        photoUrl: 'https://vokrug.tv/pic/news/e/e/f/6/eef6c03ced05d010793b363018350bec.jpg',
        followed: false,
        fullName: 'Misha',
        status: 'I am a boss too too',
        location: {
            city: 'Kiev',
            country: 'Ukraine'
        }
    }
] */