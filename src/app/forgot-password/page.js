"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './forgotPassword.module.css';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.sendOTP(email);
            sessionStorage.setItem('resetEmail', email);
            sessionStorage.setItem('serverOTP', response.otp);
            router.push('/verify-otp');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.header}>
                    <button 
                        onClick={() => router.back()} 
                        className={styles.backButton}
                    >
                        ‹
                    </button>
                    <h2>Forgot Password</h2>
                </div>

                <div className={styles.content}>
                    <h1>Enter your email</h1>
                    <p className={styles.subtitle}>
                        Please enter your registered email address to receive the verification code
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <Input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon="/assets/icons/email.png"
                                error={error}
                                required
                            />
                            {error && <span className={styles.errorText}>{error}</span>}
                        </div>

                        <Button type="submit" disabled={loading}>
                            Send Code
                        </Button>
                    </form>
                </div>

                {loading && <LoaderPopup />}
            </div>
        </div>
    );
}