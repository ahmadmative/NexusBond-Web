"use client";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import Button from '@/components/Button';
import styles from './yourCharacter.module.css';
import { useRouter } from 'next/navigation';

// Create a component for the character content
function YourCharacterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        try {
            // Get character data from URL params and parse it
            const characterParam = searchParams.get('character');
            if (characterParam) {
                const decodedCharacter = JSON.parse(decodeURIComponent(characterParam));
                setCharacter(decodedCharacter);
            }
        } catch (error) {
            console.error('Error parsing character data:', error);
        }
    }, [searchParams]);

    const handleStartChat = () => {
        // Navigate to chat page with character data
        router.push(`/home`);
    };

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.characterCard}>
                <h1>Your Character is Ready!</h1>
                
                <div className={styles.profileSection}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={character.profile_picture}
                            alt={character.name}
                            width={350}
                            height={350}
                            className={styles.profileImage}
                        />
                    </div>
                    
                    <h2 className={styles.characterName}>{character.name}</h2>
                </div>

                <div className={styles.actionButtons}>
                    <Button
                        onClick={handleStartChat}
                        width={300}
                    >
                        Start Chat
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Main component with Suspense wrapper
export default function YourCharacter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <YourCharacterContent />
        </Suspense>
    );
} 