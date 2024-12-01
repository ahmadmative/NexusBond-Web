"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    console.log('Form Data:', formData);
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login...');
      const response = await authService.login(formData.email, formData.password);
      if (response.token && response.user) {
        router.push('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry
        </p>

        <form onSubmit={handleSubmit}>
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

          <div className={styles.forgotPassword}>
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>

          <Button type="submit">Login</Button>

          {/* <div className={styles.divider}>
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
          </div> */}

          <div style={{height: "40px"}}/>

          <div className={styles.register}>
            <span>Dont have an account? </span>
            <Link href="/register">Register Now</Link>
          </div>
          {loading && <LoaderPopup />}
        </form>  
      </div>
    </div>
  );
} 