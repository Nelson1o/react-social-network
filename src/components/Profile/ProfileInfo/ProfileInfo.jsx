import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            {/* <div>
                <img src='https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300' alt="title__img"></img>
            </div> */}
            <div className={s.description__block}>
                <img src={props.profile.photos.large} alt='profile img' />
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
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