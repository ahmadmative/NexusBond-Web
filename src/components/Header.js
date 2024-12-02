"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import logoImage from '../../public/assets/images/logoWithText.png';
import { authService } from '@/api/services/auth.service';

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

  const handleSignOut = (e) => {
    e.preventDefault();
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

      {!isAuthenticated && (
        <nav className={`${styles.nav} ${isOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </nav>
      )}

      <div className={styles.authButtons}>
        {isAuthenticated && currentUser ? (
          <div className={styles.userProfile}>
            <div className={styles.profileImageContainer}>
              <Image
                src={currentUser.profile_picture || '/assets/images/avatar.png'}
                alt={currentUser.name || 'User'}
                width={50}
                height={50}
                className={styles.profileImage}
                onClick={() => router.push('/profile')}
                style={{ cursor: 'pointer' }}
              />
            </div>
            {/* Only show sign out button if not in hideSignOutRoutes */}
            {!shouldHideSignOut && (
              <button
                onClick={handleSignOut}
                className={styles.registerNow}
              >
                Sign out
              </button>
            )}
          </div>
        ) : (
          <Link href="/register" className={styles.registerNow}>
            Register Now
          </Link>
        )}
      </div>

      {!isAuthenticated && (
        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
    </header>
  );
} 