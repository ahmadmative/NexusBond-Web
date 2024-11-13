"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './forgotPassword.module.css';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
          >
            <Image 
              src="/assets/icons/arrowBack.png" 
              alt="Back" 
              width={24} 
              height={24}
            />
          </button>
          <h2>Forgot Password</h2>
        </div>

        <div className={styles.content}>
          <h1>Enter your email</h1>
          <p className={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <Input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="/assets/icons/email.png"
                required
              />
            </div>

            <Button type="submit">Send Code</Button>
          </form>
        </div>
      </div>
    </div>
  );
} 