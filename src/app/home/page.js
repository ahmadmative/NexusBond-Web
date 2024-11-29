"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import ChatSection from '@/components/ChatSection';
import styles from './home.module.css';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';

export default function Home() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (selectedBot) {
      getMessages(selectedBot.id);
    }
  }, [selectedBot]);

  const getChats = async () => {
    try {
      setLoading(true);
      const token = authService.getAccessToken();

      const response = await axios({
        method: 'get',
        url: 'https://application.nexusbond.ai/api/chats',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        console.log('Raw chat data:', response.data);
        
        const formattedChats = response.data.map(chat => {
          console.log('chat in formattedChats', chat);
          const features = JSON.parse(chat.features);
          
          return {
            id: chat.id,
            name: features.Name,
            profilePicture: chat.profile_picture,
            lastMessage: chat.messages[0]?.response,
            timestamp: chat.messages[0]?.created_at ? new Date(chat.messages[0]?.created_at) : new Date(chat.created_at),
            features: features,
            messages: chat.messages
          };
        });
        
        console.log('Formatted chats:', formattedChats);
        setChats(formattedChats);
      }
    } catch(error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async (characterId) => {
    try {
      setLoading(true);
      const token = authService.getAccessToken();

      const response = await axios({
        method: 'get',
        url: `https://application.nexusbond.ai/api/chat/messages/${characterId}`,
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
      }
    } catch(error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
  };

  const handleSendMessage = async (message) => {
    if (!selectedBot) return;

    const newMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      const token = authService.getAccessToken();
      
      const formData = new FormData();
      formData.append('character_id', selectedBot.id);
      formData.append('message', message);

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
        console.log("AI response:", response.data);

        const botResponse = {
          id: Math.round(Math.random() * 1000000),
          content: response.data.response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        selectedBot={selectedBot}
        onBotSelect={handleBotSelect}
        chats={chats}
        loading={loading}
      />
      <div className={styles.divider}/>
      <ChatSection
        selectedBot={selectedBot}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      {loading && <LoaderPopup />}
    </div>
  );
} 