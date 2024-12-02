"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { authService } from '@/api/services/auth.service';
import { useRouter } from 'next/navigation';

export default function Sidebar({ selectedBot, onBotSelect, chats, loading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const checkPlan = () => {
        const user = authService.getCurrentUser();
        console.log('allowed chats', user?.subscribedTo?.plan?.no_of_chats);
        console.log('chats length', chats.length);
        if (user?.subscribedTo?.plan?.no_of_chats === 0 || chats.length >= user?.subscribedTo?.plan?.no_of_chats || user?.subscribedTo === 'No subscription found') {
            router.push('/subscriptionHome');
        }
        else {
            router.push('/identity-essence');
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <Image
                        src="/assets/icons/search.png"
                        alt="Search"
                        width={20}
                        height={20}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={styles.actions}>
                    {/* <button className={styles.filterButton}>
                        <Image
                            src="/assets/icons/filter.png"
                            alt="Filter"
                            width={20}
                            height={20}
                        />
                    </button> */}
                    <button 
                        onClick={checkPlan}
                        className={styles.addButton}>
                        <Image
                            src="/assets/icons/add.png"
                            alt="Add"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>

            <div className={styles.botList}>
                {chats.map(bot => (
                    <div
                        key={bot.id}
                        className={`${styles.botItem} ${selectedBot?.id === bot.id ? styles.selected : ''}`}
                        onClick={() => onBotSelect(bot)}
                    >
                        <div className={styles.avatarContainer}>
                            <Image
                                src={bot.profilePicture}
                                alt={bot.name}
                                width={48}
                                height={48}
                                className={styles.avatar}
                            />
                            <div className={styles.onlineIndicator} />
                        </div>
                        <div className={styles.botInfo}>
                            <div className={styles.nameRow}>
                                <h3>{bot.name}</h3>
                                <span className={styles.timestamp}>{new Date(bot.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className={styles.lastMessage}>{bot.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 