"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ChatSection.module.css';

export default function ChatSection({ selectedBot, messages, onSendMessage }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setNewMessage('');
    }, [selectedBot?.id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    if (!selectedBot) {
        return (
            <div className={styles.emptyChatSection}>
                <p>Select a bot to start chatting</p>
            </div>
        );
    }

    // Sort messages by timestamp to ensure correct order
    const sortedMessages = [...messages].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
    );

    return (
        <div className={styles.chatSection} key={selectedBot.id}>
            <div className={styles.chatHeader}>
                <div className={styles.avatarContainer}>
                    <Image
                        src={selectedBot.profilePicture}
                        alt={selectedBot.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    />
                    {selectedBot.online && <div className={styles.onlineIndicator} />}
                </div>
                <div className={styles.botInfo}>
                    <h2>{selectedBot.name}</h2>
                    <span className={styles.onlineStatus}>
                        Online
                    </span>
                </div>
            </div>

            <div className={styles.messageList}>
                {sortedMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                    >
                        <div className={styles.messageContent}>
                            {message.content}
                            <div className={styles.messageActions}>
                                {/* Message actions */}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className={styles.messageInput}>
                <input
                    type="text"
                    placeholder="Type Here......"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">
                    <Image
                        src="/assets/icons/send2.png"
                        alt="Send"
                        width={48}
                        height={48}
                    />
                </button>
            </form>
        </div>
    );
} 