"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ProfileDropdown.module.css';

export default function ProfileDropdown({ onSignOut, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: "👤", label: "Profile", path: "/profile" },
    { icon: "📊", label: "Dashboard", path: "/home" },
    { icon: "💳", label: "Subscription", path: "/subscriptionHome" },
  ];

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.profileHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.userInfo}>
          <img 
            src="/assets/images/avatarHeader.png" 
            alt="Profile" 
            className={styles.profileImage}
          />
          <span>Hello, {userName}</span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button 
            className={`${styles.menuItem} ${styles.logoutButton}`}
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
          >
            <span className={styles.icon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
} 