import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

const ProjectChatroom: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                id: Date.now(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prevMessages => [...prevMessages, message]);
            setNewMessage('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-2xl font-semibold">Project Chatroom</h2>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`bg-gray-800 rounded-lg p-3 max-w-[70%] ${message.sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs text-gray-500 block text-right mt-1">{message.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-700 flex items-center">
                <button className="text-gray-400 hover:text-gray-300 mr-3">
                    <Paperclip size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-300 mr-3">
                    <Mic size={20} />
                </button>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 rounded-md p-2 text-sm focus:outline-none resize-none overflow-hidden"
                    style={{ height: 'auto', minHeight: '24px' }}
                />
                <button onClick={handleSendMessage} className="text-blue-500 hover:text-blue-400 ml-3">
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProjectChatroom;