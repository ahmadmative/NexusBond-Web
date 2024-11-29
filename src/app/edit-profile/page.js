"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { parse, isValid, format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast'; // Install this package for toast notifications
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import Loader from '@/components/Loader'; // Create this component for loading state
import styles from './editProfile.module.css';
import LoaderPopup from '@/components/LoaderPopup';
import {
    genderOptions,
} from '@/constants/dropdownOptions';
import { authService } from '@/api/services/auth.service';

export default function EditProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
        about: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        dob: '',
        about: '',
        email: '',
    });

    const setErrorWithTimeout = (fieldName, errorMessage) => {
        setErrors(prev => ({...prev, [fieldName]: errorMessage}));
        setTimeout(() => {
            setErrors(prev => ({...prev, [fieldName]: ''}));
        }, 3000);
    };

    const validateDOB = (date) => {
        if (!date) return true;
        
        const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate)) {
            setErrorWithTimeout('dob', 'Please enter a valid date');
            return false;
        }

        if (parsedDate > new Date()) {
            setErrorWithTimeout('dob', 'Date cannot be in the future');
            return false;
        }

        return true;
    };

    const validateForm = () => {
        let isValid = true;
        
        if (formData.name && formData.name.length < 3) {
            setErrorWithTimeout('name', 'Name must be at least 3 characters long');
            isValid = false;
        }

        if (!validateDOB(formData.dob)) {
            isValid = false;
        }
        
        return isValid;
    };

    const loadUserData = async () => {
        try {
            const userData = authService.getCurrentUser();
            
            if (userData) {
                setFormData({
                    name: userData.name || '',
                    gender: userData.gender || '',
                    dob: userData.dob ? format(new Date(userData.dob), 'yyyy-MM-dd') : '',
                    email: userData.email || '',
                    about: userData.about || '',
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            toast.error('Error loading profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) {
            return;
        }
        try {
            const formData1 = new FormData();
            formData1.append('email', formData.email);
            formData1.append('name', formData.name || "");
            formData1.append('gender', formData.gender || "");
            formData1.append('dob', formData.dob || "");
            formData1.append('about', formData.about || "");


            // const response = await axiosAuthInstance.post('/api/edit-profile', formData);
           
            const token = authService.getAccessToken();
            const response = await axios({
                method: 'post',
                url: 'https://application.nexusbond.ai/api/edit-profile',
                data: formData1,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

                if (response.status === 200) {
                    toast.success('Profile updated successfully');
                    authService.setCurrentUser(response.data.user);
                }
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        loadUserData();
    }, []);

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <Image
                        src="/assets/icons/arrowBack.png"
                        alt="back"
                        width={30}
                        height={30}
                        onClick={() => router.back()}
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                    <h1>Edit Profile</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            icon="/assets/editProfile/profile1.png"
                            error={errors.name}
                        />

                        <Dropdown
                            placeholder="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            icon="/assets/editProfile/gender.png"
                            options={genderOptions}
                            error={errors.gender}
                        />

                        <Input
                            type="date"
                            placeholder="Date of Birth"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            icon="/assets/editProfile/dob.png"
                            error={errors.dob}
                        />

                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            icon="/assets/editProfile/email.png"
                            error={errors.email}
                            disabled
                        />
                    </div>

                    <div className={styles.aboutSection}>
                        <div className={styles.inputWrapper}>
                            <div className={styles.iconContainer}>
                                <Image
                                    src="/assets/editProfile/profile1.png"
                                    alt="About"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <textarea
                                placeholder="Write about yourself...."
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                className={`${styles.aboutTextarea} ${errors.about ? styles.error : ''}`}
                                rows={4}
                            />
                        </div>
                        {errors.about && <span className={styles.errorText}>{errors.about}</span>}
                    </div>

                    <div style={{ height: '20px' }} />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            width={300}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
                {loading && <LoaderPopup />}
            </div>
        </div>
    );
} 