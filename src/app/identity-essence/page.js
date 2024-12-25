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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
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
                        />

                        <Dropdown
                            placeholder="Age Range"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            icon="/assets/characterIcons/age.png"
                            options={ageOptions}
                        />

                        <Dropdown
                            placeholder="Ethnicity"
                            name="ethnicity"
                            value={formData.ethnicity}
                            onChange={handleChange}
                            icon="/assets/characterIcons/name.png"
                            options={ethnicityOptions}
                        />

                        <Dropdown
                            placeholder="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            icon="/assets/characterIcons/gender.png"
                            options={genderOptions}
                        />

                        <Dropdown
                            placeholder="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            icon="/assets/characterIcons/nationality.png"
                            options={nationalityOptions}
                        />

                        <Dropdown
                            placeholder="Pronouns"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleChange}
                            icon="/assets/characterIcons/pronouns.png"
                            options={pronounOptions}
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