import React from 'react';
import styles from './SuccessPopup.module.css';
import Image from 'next/image';

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Image
              src="/assets/icons/success.png"
              alt="Success"
              width={50}
              height={50}
            />
          </div>
          <h3>Success!</h3>
          <p>{message}</p>
          <button className={styles.closeButton} onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup; 