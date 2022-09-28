import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const addMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder='Enter your message...'
                    validate={[requiredField, maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'diaolgAddMessageForm' })(addMessageForm);

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogsData.map((d) => {
        return <DialogItem name={d.name} key={d.id} id={d.id} />
    });

    let messagesElement = state.messagesData.map((m) => {
        return <Message message={m.message} key={m.id} />
    });

    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__item}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;