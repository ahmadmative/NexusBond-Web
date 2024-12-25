"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { parse, isValid, format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import LoaderPopup from '@/components/LoaderPopup';
import { genderOptions } from '@/constants/dropdownOptions';
import { authService } from '@/api/services/auth.service';
import styles from './editProfile.module.css';

export default function EditProfile() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
        image: '',
    });

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setErrors(prev => ({...prev, image: 'Image size should not exceed 2MB'}));
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({...prev, image: ''}));
        }
    };

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
                });
                
                // Check if about field contains an image URL
                if (userData.about && (userData.about.startsWith('http') || userData.about.startsWith('/'))) {
                    setImagePreview(userData.about);
                } else {
                    setImagePreview('/assets/images/avatarHeader.png');
                }
            }
        } catch (error) {
            toast.error('Error loading profile data');
            setImagePreview('/assets/images/avatarHeader.png');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const formData1 = new FormData();
            formData1.append('email', formData.email);
            formData1.append('name', formData.name || "");
            formData1.append('gender', formData.gender || "");
            formData1.append('dob', formData.dob || "");
            
            if (selectedFile) {
                formData1.append('image', selectedFile);
            }

            const token = authService.getAccessToken();
            const response = await axios({
                method: 'post',
                url: 'https://application.nexusbond.ai/api/edit-profile',
                data: formData1,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const updatedUser = response.data.user;
                
                const currentUser = authService.getCurrentUser();
                const mergedUser = {
                    ...currentUser,
                    ...updatedUser,
                };
                
                authService.setCurrentUser(mergedUser);
                
                toast.success(response.data.message || 'Profile updated successfully');
                router.back();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
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
                        style={{ cursor: 'pointer' }}
                    />
                    <h1>Edit Profile</h1>
                </div>

                <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper} onClick={handleImageClick}>
                        <Image
                            src={imagePreview || '/assets/images/avatarHeader.png'}
                            alt="Profile"
                            width={120}
                            height={120}
                            className={styles.avatarImage}
                            onError={() => setImagePreview('/assets/images/avatarHeader.png')}
                        />
                        <div className={styles.avatarOverlay}>
                            <Image
                                src="/assets/icons/editButton.png"
                                alt="Change"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {errors.image && <span className={styles.errorText}>{errors.image}</span>}
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
                            disabled={true}
                            readOnly={true}
                        />
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