"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profile.module.css';
import {authService} from '@/api/services/auth.service';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.dispatchEvent(new Event('authStateChanged'));
    router.push('/login');
  };

  const menuItems = [
    {
      icon: "/assets/icons/subscription.png",
      label: "Subscriptions",
      link: `/subscriptionHome?email=${user?.email}&name=${user?.name}`
    },
    // {
    //   icon: "/assets/icons/payment.png",
    //   label: "Payment",
    //   link: "/payment"
    // },
    {
      icon: "/assets/icons/profile.png",
      label: "Edit Profile",
      link: "/edit-profile"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <Image 
            src="/assets/icons/arrowBack.png" 
            alt="Back" 
            width={30} 
            height={30} 
          />
        </button>
        <h1>Profile</h1>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.profileImageContainer}>
            <Image
              src={user?.about || "/assets/images/avatarHeader.png"}
              alt="Profile"
              width={150}
              height={150}
              className={styles.profileImage}
            />
            <div className={styles.editButton} onClick={() => router.push('/edit-profile')}>
              <Image
                src="/assets/icons/editButton.png"
                alt="Edit"
                width={35}
                height={35}
              />
            </div>
          </div>
          <h2 className={styles.userName}>{user?.name || "User Name"}</h2>
        </div>

        <div className={styles.menuItems}>
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index} className={styles.menuItem}>
              <div className={styles.menuItemContent}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <span>{item.label}</span>
              </div>
              <Image
                src="/assets/icons/arrowRight.png"
                alt="Navigate"
                width={20}
                height={20}
              />
            </Link>
          ))}
          
          <button onClick={handleLogout} className={styles.logoutButton}>
            <div className={styles.menuItemContent}>
              <Image
                src="/assets/icons/logout.png"
                alt="Logout"
                width={24}
                height={24}
              />
              <span className={styles.logoutText}>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 