"use client";
import styles from './MessageList.module.css';

export default function MessageList({ messages, loading }) {
    if (loading) {
        return <div className={styles.loading}>Loading messages...</div>;
    }

    return (
        <div className={styles.messageList}>
            {messages?.map((message) => (
                <div 
                    key={message.id}
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
            ))}
        </div>
    );
} 