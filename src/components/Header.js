"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import logoImage from '../../public/assets/images/logoWithText.png';
import { authService } from '@/api/services/auth.service';
import UserAvatar from './UserAvatar';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add this array of routes where sign-out button should be hidden
  const hideSignOutRoutes = ['/subscription', '/payment', '/identity-essence', '/character-vibe', '', '/home', '/visual-persona', '/your-character'];
  
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

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu when a link is clicked
  };

  return (
    <>
      {/* Desktop Header */}
      <header className={styles.desktopHeader}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logoImage} alt="NexusBond.ai" width={180} height={60} priority />
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.authSection}>
          {!isAuthenticated ? (
            <div className={styles.authButtons}>
              <Link href="/login" className={styles.signIn}>Log In</Link>
              <Link href="/register" className={styles.registerNow}>Register Now</Link>
            </div>
          ) : (
            <ProfileDropdown 
              onSignOut={handleSignOut}
              userName={currentUser?.name}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          <span></span>
          <span></span>
        </button>

        <div className={styles.mobileLogo} onClick={() => setIsOpen(false)}>
          <Image src={logoImage} alt="NexusBond.ai" width={180} height={60} priority />
        </div>

        {isAuthenticated ? (
          <div className={styles.mobileUserProfile} onClick={() => setIsOpen(false)}>
            <Image 
              src={currentUser?.about} 
              alt="" 
              width={60} 
              height={60} 
              className={styles.mobileAvatar} 
            />
            <h3>{currentUser?.name}</h3>
            <p>User</p>
          </div>
        ) : null}

        <nav className={styles.mobileNav}>
          <ul>
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            
            {isAuthenticated ? (
              <>
                <li><Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
                <li><Link href="/home" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                <li><Link href="/subscription" onClick={() => setIsOpen(false)}>Subscription</Link></li>
              </>
            ) : null}
          </ul>
        </nav>

        {!isAuthenticated ? (
          <div className={styles.mobileAuthButtons}>
            <Link href="/login" className={styles.mobileSignIn} onClick={() => setIsOpen(false)}>Log In</Link>
            <Link href="/register" className={styles.mobileRegister} onClick={() => setIsOpen(false)}>Register Now</Link>
          </div>
        ) : (
          <button 
            className={styles.signOutButton} 
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
} 