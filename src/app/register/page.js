"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './register.module.css';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/identity-essence');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <h1>Register</h1>
        <p className={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              icon="/assets/icons/user.png"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon="/assets/icons/email.png"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon="/assets/icons/lock.png"
              required
            />
          </div>

          <Button type="submit"
          onClick={handleSubmit}
          >Register</Button>

          <div className={styles.divider}>
            <span>Or Login with</span>
          </div>

          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <Image src="/assets/icons/mobile.png" alt="Phone" width={24} height={24} />
            </button>
            <button className={styles.socialButton}>
              <Image src="/assets/icons/google.png" alt="Google" width={24} height={24} />
            </button>
            <button className={styles.socialButton}>
              <Image src="/assets/icons/apple.png" alt="Apple" width={24} height={24} />
            </button>
          </div>

          <div className={styles.login}>
            <span>Already Have An Account? </span>
            <Link href="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 