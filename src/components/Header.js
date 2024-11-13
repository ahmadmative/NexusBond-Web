"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import logoImage from '../../public/assets/images/logoWithText.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src={logoImage}
            alt="NexusBond.ai"
            width={180}
            height={60}
            priority
          />
        </Link>
      </div>

      <nav className={`${styles.nav} ${isOpen ? styles.active : ''}`}>
        <ul className={styles.navList}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li className={styles.features}>
            <Link href="/features">
              Features <span className={styles.arrow}>▼</span>
            </Link>
          </li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/demo">Demo</Link></li>
        </ul>
      </nav>

      <div className={styles.authButtons}>
        <Link href="/signin" className={styles.signIn}>
          Sign In
        </Link>
        <Link href="/register" className={styles.registerNow}>
          Register Now
        </Link>
      </div>

      <button 
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
} 