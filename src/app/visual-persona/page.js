"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './visualPersona.module.css';

export default function VisualPersona() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        face: '',
        hair: '',
        beard: '',
        nose: '',
        eyebrow: '',
        eyes: '',
        glasses: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/character-vibe');
    };

    // Sample options for dropdowns
    const options = {
        face: ['Round', 'Oval', 'Square', 'Heart', 'Diamond'],
        hair: ['Straight', 'Wavy', 'Curly', 'Bald', 'Short', 'Long'],
        beard: ['Clean Shaven', 'Stubble', 'Full Beard', 'Goatee', 'None'],
        nose: ['Straight', 'Roman', 'Button', 'Wide', 'Narrow'],
        eyebrow: ['Straight', 'Curved', 'Arched', 'Thick', 'Thin'],
        eyes: ['Round', 'Almond', 'Hooded', 'Wide-set', 'Close-set'],
        glasses: ['None', 'Rectangle', 'Round', 'Oval', 'Square', 'Rimless']
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
                    <h2>Visual Persona</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Dropdown
                            placeholder="Face"
                            name="face"
                            value={formData.face}
                            onChange={handleChange}
                            icon="/assets/characterIcons/face.png"
                            options={options.face}
                        />
                        <Dropdown
                            placeholder="Hair"
                            name="hair"
                            value={formData.hair}
                            onChange={handleChange}
                            icon="/assets/characterIcons/hair.png"
                            options={options.hair}
                        />
                        <Dropdown
                            placeholder="Beard"
                            name="beard"
                            value={formData.beard}
                            onChange={handleChange}
                            icon="/assets/characterIcons/beard.png"
                            options={options.beard}
                        />
                        <Dropdown
                            placeholder="Nose"
                            name="nose"
                            value={formData.nose}
                            onChange={handleChange}
                            icon="/assets/characterIcons/nose.png"
                            options={options.nose}
                        />
                        <Dropdown
                            placeholder="Eyebrow"
                            name="eyebrow"
                            value={formData.eyebrow}
                            onChange={handleChange}
                            icon="/assets/characterIcons/eyebrow.png"
                            options={options.eyebrow}
                        />
                        <Dropdown
                            placeholder="Eyes"
                            name="eyes"
                            value={formData.eyes}
                            onChange={handleChange}
                            icon="/assets/characterIcons/eyes.png"
                            options={options.eyes}
                        />
                        <div className={styles.fullWidthDropdown}>
                            <Dropdown
                                placeholder="Glasses"
                                name="glasses"
                                value={formData.glasses}
                                onChange={handleChange}
                                icon="/assets/characterIcons/glasses.png"
                                options={options.glasses}
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