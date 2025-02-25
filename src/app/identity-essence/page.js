"use client";
import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './identityEssence.module.css';
import { useRouter } from 'next/navigation';
import { 
    ageOptions, 
    ethnicityOptions, 
    genderOptions, 
    nationalityOptions, 
    pronounOptions 
} from '@/constants/dropdownOptions';

export default function IdentityEssence() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        ethnicity: '',
        gender: '',
        nationality: '',
        pronouns: '',
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
        
        // Convert formData to URL search params
        const searchParams = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) { // Only add non-empty values
                searchParams.append(key, value);
            }
        });

        // Navigate to next page with search params
        router.push(`/visual-persona?${searchParams.toString()}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1>Identity Essence</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            icon="/assets/characterIcons/name.png"
                            error={errors.name}
                        />

                        <Dropdown
                            placeholder="Age Range"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            icon="/assets/characterIcons/age.png"
                            options={ageOptions}
                            error={errors.age}
                        />

                        <Dropdown
                            placeholder="Ethnicity"
                            name="ethnicity"
                            value={formData.ethnicity}
                            onChange={handleChange}
                            icon="/assets/characterIcons/name.png"
                            options={ethnicityOptions}
                            error={errors.ethnicity}
                        />

                        <Dropdown
                            placeholder="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            icon="/assets/characterIcons/gender.png"
                            options={genderOptions}
                            error={errors.gender}
                        />

                        <Dropdown
                            placeholder="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            icon="/assets/characterIcons/nationality.png"
                            options={nationalityOptions}
                            error={errors.nationality}
                        />

                        <Dropdown
                            placeholder="Pronouns"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleChange}
                            icon="/assets/characterIcons/pronouns.png"
                            options={pronounOptions}
                            error={errors.pronouns}
                        />
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