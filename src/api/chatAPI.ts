export type StatusType = 'pending' | 'ready' | 'error'; 

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void;
type StatusChangedSubscriberType = (messages: StatusType) => void;

export type ChatMessageApiType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;

type EventsNamesTypes = 'message-received' | 'status-changed';

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages));
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.log('REfresh PAGE');    
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((item) => item(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws?.addEventListener('close', closeHandler);
    ws?.addEventListener('message', messageHandler);
    ws?.addEventListener('open', openHandler);
    ws?.addEventListener('error', errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    subscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
    stop() {
        subscribers['message-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    }
}