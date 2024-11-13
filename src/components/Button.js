"use client";
import styles from '../styles/Button.module.css';

export default function Button({ 
  children, 
  type = 'button', 
  onClick, 
  fullWidth = true,
  width
}) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}`}
      style={width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined}
    >
      {children}
    </button>
  );
} 