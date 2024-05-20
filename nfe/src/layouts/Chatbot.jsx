import React, { useState } from 'react';
import { chatbotAxiosInstance } from '../api/axiosInstances';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async () => {
        try {
            const res = await chatbotAxiosInstance.post('/chat/', { message });
            setResponse(res.data.reply);
        } catch (error) {
            console.error('Error sending message:', error);
            setResponse('Failed to get response from the chatbot.');
        }
    };

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50"> {/* Ensure it's fixed and on top */}
            <button
                className="bg-pink-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
                onClick={toggleChatWindow}
            >
                {isOpen ? '×' : '💬'}
            </button>

            {isOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg p-4 w-72">
                    <h2 className="text-xl font-semibold mb-2">Chat with us</h2>
                    <div className="flex mb-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message"
                            className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                        />
                        <button onClick={sendMessage} className="bg-pink-500 text-white p-2 rounded-r-lg">
                            Send
                        </button>
                    </div>
                    {response && (
                        <div className="mt-2">
                            <strong>Chatbot:</strong> {response}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;