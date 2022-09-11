import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElement = props.dialogs.map((d) => {
        return <DialogItem name={d.name} id={d.id} />
    });

    let messagesElement = props.messages.map((m) => {
        return <Message message={m.message} />
    });

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__item}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    )
}

export default Dialogs;