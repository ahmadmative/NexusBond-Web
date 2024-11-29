import React from 'react';
import styles from './LoaderPopup.module.css';
// import checkIcon from '../../public/assets/icons/checkIconWhite.png';
import Image from 'next/image';

const LoaderPopup = ({ onCompleteLater, onCompleteNow }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className="loader"></div>
                <style jsx>{`
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .loader {
                    border: 4px solid #f3f3f3;
                    border-radius: 50%;
                    border-top: 4px solid #3498db;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            </div>
        </div>
    );
};

export default LoaderPopup;
