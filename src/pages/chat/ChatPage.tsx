import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageApiType } from "../../api/chatAPI";
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

    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some Error occured. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    
    useEffect(() => {
        if(isAutoScroll){
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.clientHeight - element.scrollTop) - element.clientHeight) < 300){
            isAutoScroll && setIsAutoScroll(true);
        }
        else {
            isAutoScroll && setIsAutoScroll(false);
        }
    }

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((item, index) => <Message message={item} key={item.id} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo( ({ message }) => {
    return (
        <div>
            <img src={message.photo != null ? message.photo : userSTDPhoto} alt="User profile" style={{ width: '50px' }} />
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');

    const status = useSelector((state: AppStateType) => state.chat.status);

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
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;