"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatSection from '@/components/ChatSection';
import styles from './home.module.css';

export default function Home() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
    // Here we'll later fetch chat history from API
    setMessages([]); // Reset messages when switching bots
  };

  const handleSendMessage = (message) => {
    // Here we'll later integrate with API
    const newMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        selectedBot={selectedBot}
        onBotSelect={handleBotSelect}
      />
      <div className={styles.divider}/>
      <ChatSection
        selectedBot={selectedBot}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
} 