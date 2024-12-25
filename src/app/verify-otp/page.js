"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './verifyOtp.module.css';
import { authService } from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';
import SuccessModal from '@/components/SuccessModal';

export default function VerifyOTP() {
    const router = useRouter();
    const [step, setStep] = useState('otp');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Check if we have the necessary data
        const email = sessionStorage.getItem('resetEmail');
        const serverOTP = sessionStorage.getItem('serverOTP');
        if (!email || !serverOTP) {
            router.push('/forgot-password');
        }
    }, [router]);

    const validateOTP = () => {
        const serverOTP = sessionStorage.getItem('serverOTP');
        return otp === serverOTP;
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateOTP()) {
            setError('Invalid OTP. Please try again.');
            return;
        }

        setStep('password');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            const email = sessionStorage.getItem('resetEmail');
            await authService.changePassword(email, password);
            setShowSuccess(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent more than 1 character
        
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        setOtp(newOtpValues.join('')); // Update the main OTP state

        // Auto-focus next input
        if (value !== '' && index < 3) {
            const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            const prevInput = document.querySelector(`input[name='otp-${index - 1}']`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('serverOTP');
        router.push('/login');
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
                    <h2>Change Password</h2>
                </div>

                <div className={styles.content}>
                    <h1>Enter your new Password</h1>
                    <p className={styles.subtitle}>
                        Please enter a strong password for your account
                    </p>

                    {step === 'otp' ? (
                        <form onSubmit={handleOTPSubmit}>
                            <div className={styles.otpSection}>
                                <div className={styles.otpContainer}>
                                    {[0, 1, 2, 3].map((index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name={`otp-${index}`}
                                            className={styles.otpInput}
                                            value={otpValues[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            maxLength={1}
                                            required
                                        />
                                    ))}
                                </div>
                                {error && <span className={styles.errorText}>{error}</span>}
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={loading}>
                                Verify
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit}>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="password"
                                    placeholder="Enter Your New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={loading}>
                                Change Password
                            </button>
                        </form>
                    )}
                </div>

                {loading && <LoaderPopup />}
            </div>

            <SuccessModal
                isOpen={showSuccess}
                onClose={handleSuccessClose}
                onAction={handleSuccessClose}
                actionText="Login"
                title="Your password has been changed successfully"
                message="You can now use your new password to login to your account"
            />
        </div>
    );
} 