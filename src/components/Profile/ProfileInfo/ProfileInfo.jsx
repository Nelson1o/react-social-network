import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.description__block}>
                <img src={props.profile.photos.large} alt='profile img' />
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                <div>
                    <div>
                        About me: <span>{props.profile.aboutMe}</span>
                        <div>{props.profile.fullName}</div>
                    </div>
                    <div>
                        Contacts: <div>{props.profile.contacts.facebook}</div>
                        <div>{props.profile.contacts.twitter}</div>
                        <div>{props.profile.contacts.github}</div>
                        <div>{props.profile.contacts.vk}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;