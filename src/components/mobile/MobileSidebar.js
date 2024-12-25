"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './MobileSidebar.module.css';
import { useRouter } from 'next/navigation';
import { authService } from '@/api/services/auth.service';
import SubscriptionAlert from '@/components/SubscriptionAlert';

export default function MobileSidebar({ onBotSelect, user }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        try {
            setIsLoading(true);
            
            // Get user from localStorage
            const storedUser = JSON.parse(localStorage.getItem('USER'));

            if (!storedUser) {
                router.push('/login');
                return;
            }

            // Fetch chats
            const response = await authService.makeRequest('GET', '/chats');

            if (response.data) {
                setChats(response.data);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                router.push('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const checkBotAccess = async (bot, index) => {
        const storedUser = JSON.parse(localStorage.getItem('USER'));
        
        try {
            // Fetch plans to check limits
            const plansResponse = await authService.makeRequest('GET', '/get-plans');

            if (!plansResponse?.data?.plans || !Array.isArray(plansResponse.data.plans)) {
                return true; // Allow access if can't verify plan
            }

            // Find current plan
            const userPlanId = storedUser.subscribedTo?.plan_id;
            const currentPlan = plansResponse.data.plans.find(
                plan => Number(plan.id) === Number(userPlanId)
            );

            // Check if this bot's index exceeds the plan limit
            if (currentPlan && index >= currentPlan.no_of_chats) {
                setAlertMessage(
                    `Your current plan allows ${currentPlan.no_of_chats} characters. ` +
                    'Please upgrade your plan to chat with more characters.'
                );
                setShowSubscriptionAlert(true);
                return false;
            }

            return true;
        } catch (error) {
            return true; // Allow access if check fails
        }
    };

    const handleCreateBot = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        
        // Get user from localStorage
        const storedUser = JSON.parse(localStorage.getItem('USER'));

        // Check user authentication
        if (!storedUser) {
            router.push('/login');
            return;
        }

        try {
            // Log subscription details

            // Check subscription status
            if (!storedUser.subscribedTo || storedUser.subscribedTo === '(No subscription plan)') {
                setAlertMessage('You need an active subscription to create characters.');
                setShowSubscriptionAlert(true);
                return;
            }

            // Fetch and validate plans
            const plansResponse = await authService.makeRequest('GET', '/get-plans');

            // Validate plans data structure
            if (!plansResponse?.data?.plans || !Array.isArray(plansResponse.data.plans)) {
                throw new Error('Invalid plans data received');
            }

            // Find current plan
            const userPlanId = storedUser.subscribedTo.plan_id;

            const currentPlan = plansResponse.data.plans.find(
                plan => Number(plan.id) === Number(userPlanId)
            );

            if (!currentPlan) {
                setAlertMessage('Unable to verify subscription plan. Please try again.');
                setShowSubscriptionAlert(true);
                return;
            }

            // Check character limits
            if (chats.length >= currentPlan.no_of_chats) {
                setAlertMessage(`Your current plan allows ${currentPlan.no_of_chats} characters. Please upgrade your plan to create more characters.`);
                setShowSubscriptionAlert(true);
                return;
            }

            // All checks passed, proceed with navigation
            router.push('/identity-essence');

        } catch (error) {
            setAlertMessage('Unable to verify subscription status. Please try again.');
            setShowSubscriptionAlert(true);
        } finally {
            setIsCreating(false);
        }
    };

    const filteredChats = chats?.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.sidebar}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <Image 
                        src="/assets/icons/search.png" 
                        alt="Search" 
                        width={20} 
                        height={20} 
                    />
                    <input
                        type="text"
                        placeholder="Search characters"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    className={styles.addButton} 
                    onClick={handleCreateBot}
                    disabled={isCreating}
                    type="button"
                >
                    {isCreating ? (
                        <span></span>
                    ) : (
                        <Image 
                            src="/assets/icons/add.png" 
                            alt="Add" 
                            width={24} 
                            height={24} 
                        />
                    )}
                </button>
            </div>

            <div className={styles.botList}>
                {isLoading ? (
                    <div className={styles.loading}></div>
                ) : (
                    filteredChats?.map((bot, index) => (
                        <div 
                            key={bot.id} 
                            className={`${styles.botItem}`}
                            onClick={async () => {
                                const hasAccess = await checkBotAccess(bot, index);
                                if (hasAccess) {
                                    onBotSelect(bot);
                                }
                            }}
                        >
                            <div className={styles.avatarContainer}>
                                <Image
                                    src={bot.profile_picture || '/default-avatar.png'}
                                    alt={bot.name}
                                    width={48}
                                    height={48}
                                    className={styles.avatar}
                                />
                                <div className={styles.onlineIndicator} />
                            </div>
                            <div className={styles.botInfo}>
                                <div className={styles.nameRow}>
                                    <h3>{bot.name}</h3>
                                    <span className={styles.timestamp}>
                                        {new Date(bot.updated_at).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <p className={styles.lastMessage}>
                                    {bot.messages && bot.messages.length > 0 
                                        ? bot.messages[0].response 
                                        : 'Start chatting!'}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showSubscriptionAlert && (
                <SubscriptionAlert 
                    message={alertMessage}
                    onClose={() => setShowSubscriptionAlert(false)}
                    onUpgrade={() => router.push('/subscriptionHome')}
                />
            )}
        </div>
    );
}