import { useEffect, useState } from 'react';

function Chat({ socket }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('chat message');
        };
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the chat message
        socket.emit('chat message', input);

        // Clear the input field
        setInput('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="chat-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
