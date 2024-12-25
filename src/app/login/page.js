"use client";
import { useState, useEffect } from 'react';
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
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        router.push('/home');
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
    // Listen for auth state changes
    window.addEventListener('authStateChanged', checkAuth);
    
    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, [router]);

  // Don't render the login form while checking auth status
  if (isChecking) {
    return <LoaderPopup />;
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: '',
      general: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      if (response.token && response.user) {
        router.push('/home');
      }
    } catch (error) {
      
      // Handle different types of errors
      if (error.response?.status === 401) {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid email or password'
        }));
      } else if (error.response?.status === 403) {
        setErrors(prev => ({
          ...prev,
          general: 'Your account has been locked. Please contact support.'
        }));
      } else if (error.response?.data?.message) {
        setErrors(prev => ({
          ...prev,
          general: error.response.data.message
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'An error occurred. Please try again later.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Welcome back! Please enter your email and password to login.
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
              error={errors.email}
              required
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon="/assets/icons/lock.png"
              error={errors.password}
              required
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          {errors.general && (
            <div className={styles.generalError}>
              {errors.general}
            </div>
          )}

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