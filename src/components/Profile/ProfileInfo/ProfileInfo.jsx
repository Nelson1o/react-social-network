import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.jpg';
import { useState } from "react";

const ProfileInfo = (props) => {

    let [editMode, setEditmode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.description__block}>
                <img src={props.profile.photos.large || userPhoto} alt='profile img' className={s.mainPhoto} />
                {props.isOwner && <input type={'file'} />}
                <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => { setEditmode(true) }} />
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return (
        <div>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
            <div>
                <b>Looking for a job: </b> {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>About me: </b> {props.profile.fullName}
                {props.profile.aboutMe}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={props.profile.contacts[key]} key={key} />
                })}
            </div>
        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactTitle}: </b>{contactValue}
    </div>
}

export default ProfileInfo;