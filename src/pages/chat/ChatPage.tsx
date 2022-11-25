import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chatAPI";
//@ts-ignore
import userSTDPhoto from '../../assets/images/user.jpg';
import { sendMessage, startMessagesListening, stopMessagesListening, AppDispatch } from "../../redux/chatReducer";
import { AppStateType } from "../../redux/reduxStore";



const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {   
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((item, index) => <Message message={item} key={index} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo != null ? message.photo : userSTDPhoto} alt="User profile" style={{ width: '50px' }} />
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    const dispatch = useDispatch<AppDispatch>();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;