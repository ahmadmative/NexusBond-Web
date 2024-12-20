"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import logoImage from '../../public/assets/images/logoWithText.png';
import { authService } from '@/api/services/auth.service';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add this array of routes where sign-out button should be hidden
  const hideSignOutRoutes = ['/subscription', '/payment', '/identity-essence', '/character-vibe', '/login', '/register', '/visual-persona', '/your-character'];
  
  // Add this helper function to check current route
  const shouldHideSignOut = hideSignOutRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    window.addEventListener('authStateChanged', checkAuth);

    // Listen for storage changes (for multi-tab support)
    window.addEventListener('storage', (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    });

    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]); // Add pathname as dependency

  const handleSignOut = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Event dispatch is now handled in authService.logout()
    router.push('/login');
  };

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
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
          <li><Link href="/pricing">PRICING</Link></li>
          <li><Link href="/contact">CONTACT</Link></li>
        </ul>
      </nav>

      <div className={styles.authButtons}>
        {isAuthenticated && currentUser ? (
          <div className={styles.userProfile}>
            <ProfileDropdown 
              onSignOut={handleSignOut}
              userName={currentUser.name || 'User'}
            />
          </div>
        ) : (
          <div className={styles.authButtonsContainer}>
            <Link href="/login" className={styles.loginButton}>
              LOGIN
            </Link>
            <Link href="/register" className={styles.registerNow}>
              Register Now
            </Link>
          </div>
        )}
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