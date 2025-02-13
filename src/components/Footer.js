"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import logoImage from '../../public/assets/images/logo.png';
import { authService } from '@/api/services/auth.service';
// Import social media icons
import { FaLinkedin, FaFacebookF, FaRedditAlien, FaInstagram, FaTiktok, FaQuora } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
    };

    checkAuth();
    window.addEventListener('authStateChanged', checkAuth);
    
    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, []);

  // Routes where footer should always be visible
  const showFooterRoutes = [
    '/', 
    '/about', 
    '/pricing', 
    '/contact', 
    '/policies',
    '/policies/dmca',
    '/policies/privacy',
    '/policies/terms',
    '/policies/complaint',
    '/policies/blocked-content',
    '/policies/community-guidelines',
    '/policies/content-removal',
    '/policies/2257-exemption',
    '/policies/underage',
    '/policies/safety-center',
    '/faq'
  ];
  
  // Show footer if it's in showFooterRoutes, otherwise hide if user is authenticated
  if (!showFooterRoutes.includes(pathname) && isAuthenticated) {
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
              alt="NexusBond Logo"
              width={33}
              height={36}
            />
            <span className={styles.companyName}>NexusBond</span>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <h4>Email</h4>
              <p>info@nexusbond.ai</p>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Phone</h4>
              <p>571-207-6851</p>
            </div>
            
            <div className={styles.infoItem}>
              <h4>Address</h4>
              <p>30 N Gould St. Suite N</p>
              <p>Sheridan, WY 82801</p>
            </div>
          </div>
        </div>

        {/* Company Links Section */}
        <div className={styles.linksSection}>
          <h3>Company</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>

          </ul>
        </div>

        {/* Direct Links Section */}
        <div className={styles.linksSection}>
          <h3>Direct Links</h3>
          <ul>
            <li><Link href="/policies/dmca">DMCA Policy</Link></li>
            <li><Link href="/policies/privacy">Privacy Policy</Link></li>
            <li><Link href="/policies/terms">Terms of Service</Link></li>
            <li><Link href="/faq">FAQ,s</Link></li>
          </ul>
        </div>
      </div>

      {/* New social media and copyright section */}
      <div className={styles.bottomSection}>
        <div className={styles.socialSection}>
          <h3>Connect With Us</h3>
          <div className={styles.socialIcons}>
            <Link href="https://www.linkedin.com/company/nexusbond-ai/" target="_blank" aria-label="LinkedIn">
              <FaLinkedin />
            </Link>
            <Link href="https://www.facebook.com/NexusBondAI/" target="_blank" aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link href="https://x.com/NexusBondAI" target="_blank" aria-label="X (Twitter)">
              <FaXTwitter />
            </Link>
            <Link href="https://www.instagram.com/NexusBond.AI" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link href="https://www.tiktok.com/@nexusbond.ai" target="_blank" aria-label="TikTok">
              <FaTiktok />
            </Link>
            <Link href="https://www.reddit.com/r/NexusBondAI/" target="_blank" aria-label="Reddit">
              <FaRedditAlien />
            </Link>
            <Link href="https://nexusbondai.quora.com/" target="_blank" aria-label="Quora">
              <FaQuora />
            </Link>
          </div>
        </div>
        
        <div className={styles.policyLinks}>
          <Link href="/policies/complaint">Complaint Policy</Link>
          <Link href="/policies/blocked-content">Blocked Content Policy</Link>
          <Link href="/policies/community-guidelines">Community Guidelines</Link>
          <Link href="/policies/content-removal">Content Removal Policy</Link>
          <Link href="/policies/2257-exemption">18 USC 2257 Exemption</Link>
          <Link href="/policies/underage">Underage Policy</Link>
          <Link href="/policies/safety-center">Safety Center</Link>
          <Link href="/policies/eula">End User License Agreement</Link>
        </div>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} NexusBond AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 