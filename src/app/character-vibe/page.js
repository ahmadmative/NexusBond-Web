"use client";
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import styles from './characterVibe.module.css';
import {
    hobbiesOptions,
    communicationStyleOptions,
    goalsOptions,
    personalValuesOptions,
    senseOfHumorOptions,
    socialBehaviorOptions,
    emotionalIntelligenceOptions,
    reactionToConflictOptions,
    prefferedTopicOptions
} from '@/constants/dropdownOptions';
import {authService} from '@/api/services/auth.service';
import LoaderPopup from '@/components/LoaderPopup';

// Calculate DOB helper function
const calculateDateOfBirth = (age) => {
    const today = new Date();
    const birthYear = today.getFullYear() - parseInt(age.split('-')[0]);
    return `${birthYear}-01-01`; // Returns approximate DOB using January 1st
};

// Create a separate component for the form content
function CharacterVibeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Get all previous data from URL params
    const previousData = {
        name: searchParams.get('name') || '',
        age: searchParams.get('age') || '',
        ethnicity: searchParams.get('ethnicity') || '',
        gender: searchParams.get('gender') || '',
        nationality: searchParams.get('nationality') || '',
        pronouns: searchParams.get('pronouns') || '',
        hairColor: searchParams.get('hairColor') || '',
        hairstyle: searchParams.get('hairstyle') || '',
        eyeColor: searchParams.get('eyeColor') || '',
        eyeShape: searchParams.get('eyeShape') || '',
        skinTone: searchParams.get('skinTone') || '',
        bodyType: searchParams.get('bodyType') || '',
        height: searchParams.get('height') || '',
        fashionStyle: searchParams.get('fashionStyle') || '',
        facialExpression: searchParams.get('facialExpression') || '',
        background: searchParams.get('background') || ''
    };

    const [formData, setFormData] = useState({
        hobbies: '',
        communicationStyle: '',
        goals: '',
        personalValues: '',
        senseOfHumor: '',
        socialBehavior: '',
        emotionalIntelligence: '',
        reactionToConflict: '',
        prefferedTopic: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Combine all data
            const allData = {
                ...previousData,
                ...formData
            };

            // Prepare data for API
            const apiData = {
                features: {
                    Name: allData.name,
                    Gender: allData.gender,
                    Ethnicity: allData.ethnicity,
                    Age: allData.age,
                    DateOfBirth: calculateDateOfBirth(allData.age),
                    Nationality: allData.nationality,
                    Pronouns: allData.pronouns,
                    HairStyle: allData.hairstyle,
                    HairColor: allData.hairColor,
                    SkinTone: allData.skinTone,
                    EyeShape: allData.eyeShape,
                    EyeColor: allData.eyeColor,
                    BodyType: allData.bodyType,
                    Height: allData.height,
                    TattoosPiercings: "none",
                    FashionStyle: allData.fashionStyle,
                    FacialExpression: allData.facialExpression,
                    BackgroundDescription: allData.background,
                    HobbiesInterests: allData.hobbies,
                    PreferredTopics: allData.prefferedTopic,
                    CommunicationStyle: allData.communicationStyle,
                    GoalsAspirations: allData.goals,
                    PersonalValues: allData.personalValues,
                    SenseOfHumor: allData.senseOfHumor,
                    EmotionalIntelligence: allData.emotionalIntelligence,
                    SocialBehavior: allData.socialBehavior,
                    ReactionToConflict: allData.reactionToConflict,
                    Provocativeness: "Decent",
                    session_id: 'xyz-001'
                }
            };

            // Get token from localStorage or wherever you store it
            const token = authService.getAccessToken();

            const response = await axios({
                method: 'post',
                url: 'https://application.nexusbond.ai/api/character/store',
                data: apiData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                // Store user data if needed
                localStorage.setItem('character', JSON.stringify(response.data));
                
                // Navigate to chat page with data
                router.push(`/your-character?character=${encodeURIComponent(JSON.stringify(response.data))}`);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1>Character Vibe</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <Dropdown
                            placeholder="Hobbies"
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                            icon="/assets/characterIcons/communicationStyle.png"
                            options={hobbiesOptions}
                        />

                        <Dropdown
                            placeholder="Communication Style"
                            name="communicationStyle"
                            value={formData.communicationStyle}
                            onChange={handleChange}
                            icon="/assets/characterIcons/communicationStyle.png"
                            options={communicationStyleOptions}
                        />

                        <Dropdown
                            placeholder="Goals"
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            icon="/assets/characterIcons/goals.png"
                            options={goalsOptions}
                        />

                        <Dropdown
                            placeholder="Personal Values"
                            name="personalValues"
                            value={formData.personalValues}
                            onChange={handleChange}
                            icon="/assets/characterIcons/personalValues.png"
                            options={personalValuesOptions}
                        />

                        <Dropdown
                            placeholder="Sense of Humor"
                            name="senseOfHumor"
                            value={formData.senseOfHumor}
                            onChange={handleChange}
                            icon="/assets/characterIcons/senseOfHumor.png"
                            options={senseOfHumorOptions}
                        />

                        <Dropdown
                            placeholder="Social Behavior"
                            name="socialBehavior"
                            value={formData.socialBehavior}
                            onChange={handleChange}
                            icon="/assets/characterIcons/socialBehavior.png"
                            options={socialBehaviorOptions}
                        />

                        <Dropdown
                            placeholder="Emotional Intelligence"
                            name="emotionalIntelligence"
                            value={formData.emotionalIntelligence}
                            onChange={handleChange}
                            icon="/assets/characterIcons/emotionalIntelligence.png"
                            options={emotionalIntelligenceOptions}
                        />

                        <Dropdown
                            placeholder="Reaction to Conflict"
                            name="reactionToConflict"
                            value={formData.reactionToConflict}
                            onChange={handleChange}
                            icon="/assets/characterIcons/communicationStyle.png"
                            options={reactionToConflictOptions}
                        />

                        <Dropdown
                            placeholder="Preferred Topics"
                            name="prefferedTopic"
                            value={formData.prefferedTopic}
                            onChange={handleChange}
                            icon="/assets/characterIcons/communicationStyle.png"
                            options={prefferedTopicOptions}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            width={300}
                            disabled={loading}
                        >
                            {loading ? 'Creating Character...' : 'Create Character'}
                        </Button>
                    </div>

                    {loading && <LoaderPopup />}
                </form>
            </div>
        </div>
    );
}

// Main component with Suspense wrapper
export default function CharacterVibe() {
    return (
        <Suspense fallback={<LoaderPopup />}>
            <CharacterVibeContent />
        </Suspense>
    );
} 