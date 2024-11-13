"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './characterVibe.module.css';

export default function CharacterVibe() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        hobbies: '',
        communication: '',
        goals: '',
        values: '',
        humor: '',
        social: '',
        emotional: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/your-character');
    };

    // Sample options for dropdowns
    const options = {
        hobbies: ['Sports & Fitness', 'Arts & Creativity', 'Technology', 'Reading', 'Travel', 'Music', 'Gaming', 'Cooking'],
        communication: ['Direct & Clear', 'Diplomatic & Tactful', 'Casual & Friendly', 'Formal & Professional', 'Expressive & Animated'],
        goals: ['Career Success', 'Personal Growth', 'Financial Security', 'Work-Life Balance', 'Social Impact', 'Learning & Development'],
        values: ['Integrity', 'Innovation', 'Compassion', 'Achievement', 'Independence', 'Collaboration', 'Adventure'],
        humor: ['Witty & Clever', 'Sarcastic', 'Playful & Silly', 'Dry & Subtle', 'Self-deprecating', 'Observational'],
        social: ['Outgoing & Social', 'Reserved & Selective', 'Adaptable', 'Independent', 'Team-oriented', 'Leadership-focused'],
        emotional: ['Highly Aware', 'Balanced & Stable', 'Empathetic', 'Logical & Rational', 'Growth-oriented', 'Resilient']
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
                    <h2>Character Vibe</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Dropdown
                            placeholder="Hobbies and Interests"
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                            icon="/assets/characterIcons/hobbies.png"
                            options={options.hobbies}
                        />

                        <Dropdown
                            placeholder="Communication Style"
                            name="communication"
                            value={formData.communication}
                            onChange={handleChange}
                            icon="/assets/characterIcons/communicationStyle.png"
                            options={options.communication}
                        />

                        <Dropdown
                            placeholder="Goals"
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            icon="/assets/characterIcons/goals.png"
                            options={options.goals}
                        />

                        <Dropdown
                            placeholder="Personal Values"
                            name="values"
                            value={formData.values}
                            onChange={handleChange}
                            icon="/assets/characterIcons/values.png"
                            options={options.values}
                        />

                        <Dropdown
                            placeholder="Sense of Humor"
                            name="humor"
                            value={formData.humor}
                            onChange={handleChange}
                            icon="/assets/characterIcons/senseOfHumor.png"
                            options={options.humor}
                        />

                        <Dropdown
                            placeholder="Social Behavior"
                            name="social"
                            value={formData.social}
                            onChange={handleChange}
                            icon="/assets/characterIcons/socialBehavior.png"
                            options={options.social}
                        />

                        <div className={styles.fullWidthDropdown}>
                            <Dropdown
                                placeholder="Emotional Intelligence"
                                name="emotional"
                                value={formData.emotional}
                                onChange={handleChange}
                                icon="/assets/characterIcons/emotionalIntelligence.png"
                                options={options.emotional}
                            />
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <Button
                            type="submit"
                            width={300}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 