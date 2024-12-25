"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './MessageInput.module.css';

export default function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
                <Image 
                    src="/send.svg" 
                    alt="Send" 
                    width={24} 
                    height={24}
                />
            </button>
        </form>
    );
} 