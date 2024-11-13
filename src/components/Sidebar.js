"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ selectedBot, onBotSelect }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Temporary bot data - will come from API later
    const bots = [
        {
            id: 1,
            name: 'Pretty Sers',
            avatar: '/assets/images/avatar1.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: true
        },
        {
            id: 2,
            name: 'Julia Asses',
            avatar: '/assets/images/avatar2.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: false
        },
        {
            id: 3,
            name: 'Clark Smith',
            avatar: '/assets/images/avatar3.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: false
        },
        {
            id: 4,
            name: 'Alex Smith',
            avatar: '/assets/images/avatar4.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: false
        },
        {
            id: 5,
            name: 'John Doe',
            avatar: '/assets/images/avatar5.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: false
        },
        {
            id: 6,
            name: 'Clark Kent',
            avatar: '/assets/images/avatar6.png',
            lastMessage: 'Hello, Good Morning.',
            timestamp: '12:45 PM',
            online: false
        },
        // Add more bots...
    ];

    const filteredBots = bots.filter(bot =>
        bot.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <button className={styles.filterButton}>
                        <Image
                            src="/assets/icons/filter.png"
                            alt="Filter"
                            width={20}
                            height={20}
                        />
                    </button>
                    <button className={styles.addButton}>
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
                {filteredBots.map(bot => (
                    <div
                        key={bot.id}
                        className={`${styles.botItem} ${selectedBot?.id === bot.id ? styles.selected : ''}`}
                        onClick={() => onBotSelect(bot)}
                    >
                        <div className={styles.avatarContainer}>
                            <Image
                                src={bot.avatar}
                                alt={bot.name}
                                width={48}
                                height={48}
                                className={styles.avatar}
                            />
                            {bot.online && <div className={styles.onlineIndicator} />}
                        </div>
                        <div className={styles.botInfo}>
                            <div className={styles.nameRow}>
                                <h3>{bot.name}</h3>
                                <span className={styles.timestamp}>{bot.timestamp}</span>
                            </div>
                            <p className={styles.lastMessage}>{bot.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 