"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Dropdown.module.css';

export default function Dropdown({
  placeholder,
  value,
  onChange,
  icon,
  name,
  options = [],
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div 
        className={`${styles.dropdownTrigger} ${icon ? styles.hasLeftIcon : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && (
          <div className={styles.leftIcon}>
            <Image
              src={icon}
              alt="dropdown icon"
              width={20}
              height={20}
            />
          </div>
        )}
        <div className={styles.selectedValue}>
          {value || placeholder}
        </div>
        <div className={styles.rightIcon}>
          <Image
            src="/assets/icons/arrowDown.png"
            alt="dropdown"
            width={20}
            height={20}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </div>
      </div>
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                onChange({ target: { name, value: option } });
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 