"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import logoImage from '../../public/assets/images/logo.png';
import { authService } from '@/api/services/auth.service';

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
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
  }, [pathname]);

  // Don't render the footer if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Company Info Section */}
        <div className={styles.companyInfo}>
          <div className={styles.logoSection}>
            <Image
              src={logoImage}
              alt="Company Logo"
              width={33}
              height={36}
            />
            <span className={styles.companyName}>YourName</span>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <h4>Email</h4>
              <p>example@gmail.com</p>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Phone</h4>
              <p>+1234 56 655 59</p>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Address</h4>
              <p>312 N Main St</p>
              <p>Berlin, Maryland(MD), 21811</p>
            </div>
          </div>
        </div>

        {/* Company Links Section */}
        <div className={styles.linksSection}>
          <h3>Company</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Direct Links Section */}
        <div className={styles.linksSection}>
          <h3>Direct Links</h3>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/privacy-policy">Privacy & Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/faqs">FAQ,s</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className={styles.linksSection}>
          <h3>Social Media</h3>
          <ul>
            <li><Link href="#">LinkedIn</Link></li>
            <li><Link href="#">Facebook</Link></li>
            <li><Link href="#">Twitter</Link></li>
            <li><Link href="#">Pinterest</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
} 