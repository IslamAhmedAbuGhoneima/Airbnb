'use client';
import { apiGet } from '@/app/services/apiServices';
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
const ConversationDetail = ({ userId, token, conversation }) => {

    const currentUser = conversation.users.find((user) => user.id == userId);
    const otherUser = conversation.users.find((user) => user.id != userId);

    const { sendJsonMessage, lastJsonMessage } =
        useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`);

    const [message, setMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState([]);
    const messageDiv = useRef('');

    const conversationMessages = async () => {
        const data = await apiGet(`http://127.0.0.1:8000/chat/${conversation.id}/conversation-messages/`);
        setRealtimeMessages(data);
    }
    useEffect(() => {
        conversationMessages();
        scrollToBottom();
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        if (message) {
            const data = {
                'body': message,
                'name': currentUser.email,
                'sent_to_id': otherUser.id,
                'conversation_id': conversation.id
            }
            sendJsonMessage(data);
            setMessage('');
            scrollToBottom();
        }

    }
    const scrollToBottom = () => {
        if (messageDiv.current) {
            setTimeout(() => {
                messageDiv.current.scrollTo({
                    top: messageDiv.current.scrollHeight,
                    behavior: "smooth",
                })
            }, 500);
        }
    }
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }
    return (
        <>
            <div
                ref={messageDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
            >
                {
                    realtimeMessages.map((message) =>
                    (
                        <div
                            key={message.created_at}
                            className={`w-[80%]py-4 px-6 rounded-xl ${message.sender == currentUser?.email ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                        >
                            <div className='flex justify-between'>
                                <p className="font-bold text-gray-500">{message.sender}</p>
                                <p className="font-bold text-gray-500">{new Date(message.created_at).toLocaleTimeString()}</p>
                            </div>
                            <p>{message.message}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl focus:outline-none"
                    value={message}
                    onChange={handleChangeMessage}
                />

                <div
                    onClick={sendMessage}
                    className="flex select-none cursor-pointer mb-2 text-base text-white py-4 px-6 rounded-xl bg-airbnb hover:bg-airbnbDark transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <button
                    >Send</button>
                </div>
            </div>
        </>
    )
}

export default ConversationDetail