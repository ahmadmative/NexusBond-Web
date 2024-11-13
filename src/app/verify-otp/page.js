"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OtpInput from '@/components/OtpInput';
import Button from '@/components/Button';
import styles from './verifyOtp.module.css';

export default function VerifyOtp() {
  const router = useRouter();

  const handleVerify = (otp) => {
    // Handle OTP verification logic here
    console.log('OTP:', otp);
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
          <h1>Enter OTP</h1>
          <p className={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>

          <div className={styles.otpSection}>
            <OtpInput 
              length={4} 
              onComplete={handleVerify}
            />
          </div>

          <Button type="submit">Verify</Button>
        </div>
      </div>
    </div>
  );
} 