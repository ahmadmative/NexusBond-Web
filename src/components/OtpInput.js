"use client";
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/OtpInput.module.css';

export default function OtpInput({ length = 4, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last entered digit
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Check if all digits are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current input is empty
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (isNaN(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < length) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or first empty input
    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex].focus();
  };

  return (
    <div className={styles.otpContainer}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={styles.otpInput}
        />
      ))}
    </div>
  );
} 