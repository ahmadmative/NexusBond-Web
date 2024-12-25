"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './visualPersona.module.css';
import {
    hairColorOptions,
    hairstyleOptions,
    eyeColorOptions,
    eyeShapeOptions,
    skinToneOptions,
    bodyTypeOptions,
    heightOptions,
    fashionStyleOptions,
    facialExpressionOptions,
    backgroundOptions
} from '@/constants/dropdownOptions';

// Create a component for the form content
function VisualPersonaContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get identity data from URL params
    const identityData = {
        name: searchParams.get('name') || '',
        age: searchParams.get('age') || '',
        ethnicity: searchParams.get('ethnicity') || '',
        gender: searchParams.get('gender') || '',
        nationality: searchParams.get('nationality') || '',
        pronouns: searchParams.get('pronouns') || '',
    };

    const [formData, setFormData] = useState({
        hairColor: '',
        hairstyle: '',
        eyeColor: '',
        eyeShape: '',
        skinTone: '',
        bodyType: '',
        height: '',
        fashionStyle: '',
        facialExpression: '',
        background: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Combine both identity and visual data
        const combinedData = {
            ...identityData,
            ...formData
        };


        // Convert combined data to URL params
        const newSearchParams = new URLSearchParams();
        Object.entries(combinedData).forEach(([key, value]) => {
            if (value) {
                newSearchParams.append(key, value);
            }
        });

        // Navigate to next page with all data
        router.push(`/character-vibe?${newSearchParams.toString()}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1>Visual Persona</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Dropdown
                            placeholder="Hair Color"
                            name="hairColor"
                            value={formData.hairColor}
                            onChange={handleChange}
                            icon="/assets/characterIcons/hair.png"
                            options={hairColorOptions}
                            error={errors.hairColor}
                        />

                        <Dropdown
                            placeholder="Hairstyle"
                            name="hairstyle"
                            value={formData.hairstyle}
                            onChange={handleChange}
                            icon="/assets/characterIcons/hair.png"
                            options={hairstyleOptions}
                            error={errors.hairstyle}
                        />

                        <Dropdown
                            placeholder="Eye Color"
                            name="eyeColor"
                            value={formData.eyeColor}
                            onChange={handleChange}
                            icon="/assets/characterIcons/eyes.png"
                            options={eyeColorOptions}
                            error={errors.eyeColor}
                        />

                        <Dropdown
                            placeholder="Eye Shape"
                            name="eyeShape"
                            value={formData.eyeShape}
                            onChange={handleChange}
                            icon="/assets/characterIcons/eyes.png"
                            options={eyeShapeOptions}
                            error={errors.eyeShape}
                        />

                        <Dropdown
                            placeholder="Skin Tone"
                            name="skinTone"
                            value={formData.skinTone}
                            onChange={handleChange}
                            icon="/assets/characterIcons/face.png"
                            options={skinToneOptions}
                            error={errors.skinTone}
                        />

                        <Dropdown
                            placeholder="Body Type"
                            name="bodyType"
                            value={formData.bodyType}
                            onChange={handleChange}
                            icon="/assets/characterIcons/face.png"
                            options={bodyTypeOptions}
                            error={errors.bodyType}
                        />

                        <Dropdown
                            placeholder="Height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            icon="/assets/characterIcons/face.png"
                            options={heightOptions}
                            error={errors.height}
                        />

                        <Dropdown
                            placeholder="Fashion Style"
                            name="fashionStyle"
                            value={formData.fashionStyle}
                            onChange={handleChange}
                            icon="/assets/characterIcons/hobbies.png"
                            options={fashionStyleOptions}
                            error={errors.fashionStyle}
                        />

                        <Dropdown
                            placeholder="Facial Expression"
                            name="facialExpression"
                            value={formData.facialExpression}
                            onChange={handleChange}
                            icon="/assets/characterIcons/face.png"
                            options={facialExpressionOptions}
                            error={errors.facialExpression}
                        />

                        <Dropdown
                            placeholder="Background"
                            name="background"
                            value={formData.background}
                            onChange={handleChange}
                            icon="/assets/characterIcons/nationality.png"
                            options={backgroundOptions}
                            error={errors.background}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
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

// Main component with Suspense wrapper
export default function VisualPersona() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VisualPersonaContent />
        </Suspense>
    );
} 