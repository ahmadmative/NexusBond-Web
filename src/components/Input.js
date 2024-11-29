"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Input.module.css';

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  name,
  required = false
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? 'password' : 'text');
  };

  return (
    <div className={styles.inputContainer}>
      {icon && (
        <div className={styles.leftIcon}>
          <Image
            src={icon}
            alt="input icon"
            width={20}
            height={20} 
          />
        </div>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`${styles.input} ${icon ? styles.hasLeftIcon : ''} ${type === 'password' ? styles.hasRightIcon : ''}`}
      />
      {type === 'password' && (
        <button 
          type="button"
          className={styles.rightIcon}
          onClick={togglePasswordVisibility}
        >
          <Image
            src={showPassword ? '/assets/icons/eyeOff.png' : '/assets/icons/eyeOff.png'}
            alt="toggle password visibility"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
}