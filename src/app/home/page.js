"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import ChatSection from '@/components/ChatSection';
import MobileSidebar from '@/components/mobile/MobileSidebar';
import MobileChat from '@/components/mobile/MobileChat';
import styles from './home.module.css';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';

export default function Home() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    getChats();
    
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
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
        
        const formattedChats = response.data.map(chat => {
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
        
        setChats(formattedChats);
      }
    } catch(error) {
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
    } finally {
      setLoading(false);
    }
  };

  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
    setIsMobileMenuOpen(false);
  };

  const handleBackToList = () => {
    setIsMobileMenuOpen(true);
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

        const botResponse = {
          id: Math.round(Math.random() * 1000000),
          content: response.data.response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
    }
  };

  // Mobile specific handlers
  const handleMobileBotSelect = (bot) => {
    setSelectedBot(bot);
    setShowMobileChat(true);
    getMessages(bot.id);
  };

  const handleMobileBack = () => {
    setShowMobileChat(false);
    setSelectedBot(null);
  };

  // Render mobile or desktop version based on screen size
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {!showMobileChat ? (
          <MobileSidebar 
            chats={chats}
            onBotSelect={handleMobileBotSelect}
            loading={loading}
          />
        ) : (
          <MobileChat 
            selectedBot={selectedBot}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={handleMobileBack}
          />
        )}
        {loading && <LoaderPopup />}
      </div>
    );
  }

  // Desktop version
  return (
    <div className={styles.container}>
      <Sidebar 
        selectedBot={selectedBot}
        onBotSelect={setSelectedBot}
        chats={chats}
        loading={loading}
      />
      <div className={styles.divider}/>
      <div className={styles.chatSection}>
        <ChatSection
          selectedBot={selectedBot}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
      {loading && <LoaderPopup />}
    </div>
  );
} 