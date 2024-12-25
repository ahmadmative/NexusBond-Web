"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './register.module.css';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    general: ''
  });

  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        router.push('/home');
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
    window.addEventListener('authStateChanged', checkAuth);
    
    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, [router]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      general: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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
    setErrors({ name: '', email: '', password: '', general: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.token && response.user) {
        router.push('/subscription');
      }
    } catch (error) {
      
      // Handle validation errors from API (422 status)
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors;
        setErrors(prev => ({
          ...prev,
          name: apiErrors.name?.[0] || '',
          email: apiErrors.email?.[0]?.includes('has already been taken') || 
                apiErrors.email?.[0]?.includes('valid') ? 
                'The email already registered or is invalid' : 
                apiErrors.email?.[0] || '',
          password: apiErrors.password?.[0] || '',
          general: ''
        }));
      } else if (error.response?.data?.message) {
        setErrors(prev => ({
          ...prev,
          general: error.response.data.message
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'An error occurred during registration. Please try again later.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  if (isChecking) {
    return <LoaderPopup />;
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>
          Please fill in the details below to create your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon="/assets/icons/user.png"
              error={errors.name}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon="/assets/icons/email.png"
              error={errors.email}
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
              error={errors.password}
              required
            />
          </div>

          {errors.general && (
            <div className={styles.generalError}>
              {errors.general}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            Create Account
          </Button>

          <div className={styles.login}>
            <span>Already have an account? </span>
            <Link href="/login">Login</Link>
          </div>

          {loading && <LoaderPopup />}
        </form>
      </div>
    </div>
  );
}