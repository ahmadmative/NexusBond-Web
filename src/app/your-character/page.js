"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import styles from './yourCharacter.module.css';

export default function YourCharacter() {
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/home');
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
                    <h2 className={styles.headerText}>Here is your character</h2>
                </div>


                <div className={styles.characterContainer}>
                    <div className={styles.characterImage}>
                        <Image
                            src="/assets/images/avatar3.png"
                            alt="Avatar"
                            width={250}
                            height={250}
                        />
                    </div>
                    <h1 className={styles.characterName}>Clark Smith</h1>
                    <p className={styles.characterDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        width={300}
                    >
                        Start Chat
                    </Button>
                </div>
            </div>
        </div>
    );
} 