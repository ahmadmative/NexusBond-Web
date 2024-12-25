import styles from './successModal.module.css';
import Image from 'next/image';

export default function SuccessModal({ isOpen, onClose, onAction, actionText, title, message }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                
                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/assets/icons/success.png" 
                            alt="Success" 
                            width={40} 
                            height={40}
                        />
                    </div>
                    
                    <h2>{title}</h2>
                    <p>{message}</p>
                    
                    <button className={styles.actionButton} onClick={onAction}>
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
} 