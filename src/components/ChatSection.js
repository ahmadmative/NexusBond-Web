"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ChatSection.module.css';

export default function ChatSection({ selectedBot, messages, onSendMessage }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

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

    return (
        <div className={styles.chatSection}>
            <div className={styles.chatHeader}>
                <div className={styles.avatarContainer}>
                    <Image
                        src={selectedBot.avatar}
                        alt={selectedBot.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                    />
                    {selectedBot.online && <div className={styles.onlineIndicator} />}
                </div>
                <div className={styles.botInfo}>
                    <h2>{selectedBot.name}</h2>
                    <span className={styles.onlineStatus}>
                        {selectedBot.online ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>

            <div className={styles.messageList}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage
                            }`}>
                        <div className={styles.messageContent}>
                            {message.content}
                            <div className={styles.messageActions}>
                                <button>
                                    <Image
                                        src="/assets/icons/copy.svg"
                                        alt="Copy"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button>
                                    <Image
                                        src="/assets/icons/share.svg"
                                        alt="Share"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </div>
                        </div>
                        {/* <span className={styles.timestamp}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span> */}
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