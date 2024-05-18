// Chatbot.js
import React, { useState } from 'react';
import { chatbotAxiosInstance } from '../api/axiosInstances';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        try {
            const res = await chatbotAxiosInstance.post('/chat/', { message });
            setResponse(res.data.reply);
        } catch (error) {
            console.error('Error sending message:', error);
            setResponse('Failed to get response from the chatbot.');
        }
    };

    return (
        <div>
            <h2>Chat with us</h2>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            {response && <div><strong>Chatbot:</strong> {response}</div>}
        </div>
    );
};

export default Chatbot;