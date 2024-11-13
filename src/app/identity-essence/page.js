"use client";
import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './identityEssence.module.css';
import { useRouter } from 'next/navigation';

export default function IdentityEssence() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: '',
        dateOfBirth: '',
        nationality: '',
        pronouns: '',
        religion: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/visual-persona');
    };

    const genderOptions = ['Male', 'Female', 'Non-binary', 'Other'];
    const religionOptions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Other'];

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
                            placeholder="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            icon="/assets/characterIcons/gender.png"
                            options={genderOptions}
                        />

                        <Input
                            type="number"
                            placeholder="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            icon="/assets/characterIcons/age.png"
                        />

                        <Input
                            type="date"
                            placeholder="Date of Birth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            icon="/assets/characterIcons/dob.png"
                        />

                        <Input
                            type="text"
                            placeholder="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            icon="/assets/characterIcons/nationality.png"
                        />

                        <Input
                            type="text"
                            placeholder="Pronouns"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleChange}
                            icon="/assets/characterIcons/pronouns.png"
                        />

                        <div className={styles.fullWidthDropdown}>
                            <Dropdown
                                placeholder="Religion"
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                                icon="/assets/characterIcons/religion.png"
                                options={religionOptions}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <Button
                            // onClick={handleSubmit}
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