import React, { useState, useEffect } from 'react';


const api_base = 'http://localhost:3001';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(api_base + '/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const response = await fetch(api_base + '/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: newMessage }),
            });
            const data = await response.json();
            if (data.success) {
                setNewMessage('');
                fetchMessages();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <div>
                {messages.map((messageObj, index) => (
                    <p key={index}>{messageObj.message}</p>
                ))}

            </div>
            <input
                className='add-todo-input'
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className='button' onClick={sendMessage}>Send</div>
        </div>
    );
}

export default Messages;
