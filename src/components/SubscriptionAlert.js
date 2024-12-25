import Image from 'next/image';
import styles from './SubscriptionAlert.module.css';

export default function SubscriptionAlert({ message, onClose, onUpgrade }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.alertContainer}>
                <Image 
                    src="/assets/icons/subscription.png"
                    alt="Subscription"
                    width={64}
                    height={64}
                />
                <h3>Subscription Required</h3>
                <p>{message}</p>
                <div className={styles.buttonGroup}>
                    <button className={styles.upgradeButton} onClick={onUpgrade}>
                        Upgrade Plan
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
} 