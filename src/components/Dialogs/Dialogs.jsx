import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogsData.map((d) => {
        return <DialogItem name={d.name} id={d.id} />
    });

    let messagesElement = props.state.messagesData.map((m) => {
        return <Message message={m.message} />
    });

    let newMessageElement = React.createRef();

    let addMessage = () => {
        let text = newMessageElement.current.value;
        alert(text);
        newMessageElement.current.value = "";
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__item}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <div><textarea ref={newMessageElement}></textarea></div>
                <div><button onClick={addMessage}>Add post</button></div>
            </div>
        </div>
    )
}

export default Dialogs;