"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './MobileChat.module.css';
import { authService } from '@/api/services/auth.service';
import axios from 'axios';

export default function MobileChat({ selectedBot, onBack }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedBot) {
            getMessages();
        }
    }, [selectedBot]);

    const getMessages = async () => {
        try {
            setLoading(true);
            const token = authService.getAccessToken();
            
            const response = await axios({
                method: 'get',
                url: `https://application.nexusbond.ai/api/chat/messages/${selectedBot.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.status === 200) {
                const formattedMessages = response.data.flatMap(chat => {
                    return [
                        {
                            id: `${chat.id}_message`,
                            content: chat.message,
                            timestamp: new Date(chat.created_at),
                            sender: 'user',
                        },
                        {
                            id: `${chat.id}_response`,
                            content: chat.response,
                            timestamp: new Date(chat.created_at),
                            sender: 'bot',
                        }
                    ];
                });

                formattedMessages.sort((a, b) => b.timestamp - a.timestamp);
                setMessages(formattedMessages);
                scrollToBottom();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !selectedBot) return;

        const newMessage = {
            id: Date.now(),
            content: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        scrollToBottom();

        try {
            const token = authService.getAccessToken();
            
            const formData = new FormData();
            formData.append('character_id', selectedBot.id);
            formData.append('message', inputMessage);

            const response = await axios({
                method: 'post',
                url: 'https://application.nexusbond.ai/api/chat/message',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            });

            if (response.status === 200) {
                const botResponse = {
                    id: Math.round(Math.random() * 1000000),
                    content: response.data.response,
                    sender: 'bot',
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, botResponse]);
                scrollToBottom();
            }
        } catch (error) {
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.mobileChat}>
            <div className={styles.header}>
                <button 
                    className={styles.backButton} 
                    onClick={onBack}
                    aria-label="Go back"
                >
                    <Image 
                        src="/assets/icons/arrowback.png"
                        alt="Back" 
                        width={24} 
                        height={24}
                        priority
                        onError={(e) => {
                            e.target.src = '/assets/icons/arrowback.png';
                            console.log('Error loading back arrow image');
                        }}
                    />
                </button>
                <div className={styles.botInfo}>
                    <div className={styles.avatarContainer}>
                        <Image
                            src={selectedBot.profile_picture || '/assets/images/avatar.png'}
                            alt={selectedBot.name}
                            fill
                            className={styles.avatar}
                        />
                    </div>
                    <span className={styles.name}>{selectedBot.name}</span>
                </div>
            </div>

            <div className={styles.chatContent}>
                {loading ? (
                    <div className={styles.loading}>Loading messages...</div>
                ) : (
                    messages.map((message, index) => (
                        <div 
                            key={index}
                            className={`${styles.message} ${
                                message.sender === 'bot' ? styles.botMessage : styles.userMessage
                            }`}
                        >
                            <div className={styles.messageContent}>
                                {message.content}
                            </div>
                            <div className={styles.timestamp}>
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className={styles.inputArea}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.input}
                />
                <button type="submit" className={styles.sendButton}>
                    <Image 
                        src="/assets/icons/send.png"
                        alt="Send" 
                        width={24} 
                        height={24} 
                    />
                </button>
            </form>
        </div>
    );
} 