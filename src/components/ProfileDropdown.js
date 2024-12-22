"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProfileDropdown.module.css';
import { getProfileDisplay } from '@/utils/profileImage';
import { authService } from '@/api/services/auth.service';
import UserAvatar from './UserAvatar';

export default function ProfileDropdown({ onSignOut, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = authService.getCurrentUser();
  const profileDisplay = getProfileDisplay(currentUser);

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
          {profileDisplay.isImage ? (
            <Image 
              src={profileDisplay.src}
              alt="Profile"
              width={30}
              height={30}
              className={styles.profileImage}
              onError={(e) => {
                e.target.onerror = null;
                const user = authService.getCurrentUser();
                user.about = null;
                authService.setCurrentUser(user);
              }}
            />
          ) : (
            <UserAvatar 
              name={userName}
              size={30}
            />
          )}
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