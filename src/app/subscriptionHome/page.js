"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './subscriptionHome.module.css';
import LoaderPopup from '@/components/LoaderPopup';
import { authService } from '@/api/services/auth.service';
import axios from 'axios';

// Create a component for the subscription content
function SubscriptionHomeContent() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentUserPlan, setCurrentUserPlan] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setEmail(user?.email);
    setName(user?.name);
    
    // Updated plan check logic to handle active subscription
    if (!user?.subscribedTo) {
      setCurrentUserPlan(null);
    } else if (typeof user.subscribedTo === 'string' && 
              (user.subscribedTo === 'No subscription found' || 
               user.subscribedTo === 'No subscription yet')) {
      setCurrentUserPlan(null);
    } else {
      // Handle active subscription
      try {
        // If subscribedTo is a string (JSON), parse it
        const subscription = typeof user.subscribedTo === 'string' 
          ? JSON.parse(user.subscribedTo) 
          : user.subscribedTo;
        
        // Set current plan ID from the subscription
        setCurrentUserPlan(subscription.plan_id.toString());
      } catch (error) {
        setCurrentUserPlan(null);
      }
    }
    
    getPlans();
  }, []);

  const getPlans = async () => {
    setLoading(true);
    try {       
        const token = authService.getAccessToken();
        const plans = [
          {
            id: '1',
            name: 'Free Plan',
            price: 0.00,
            messages: '50',
            characters: '1',
            features: [
              '50 messages/month',
              '1 Character',
              'Messages deleted after 7 days of inactivity'
            ]
          },
          {
            id: '2',
            name: 'Standard Plan',
            price: 9.99,
            messages: '1000',
            characters: '2',
            features: [
              '1000 messages/month',
              '2 Character',
              'Dedicated chat capacity with basic priority'
            ]
          },
          {
            id: '3',
            name: 'Premium Plan',
            price: 15.99,
            messages: '4000',
            characters: '4',
            features: [
              '4000 messages/month',
              '4 Character',
              'Dedicated chat capacity with basic priority'
            ]
          },
          {
            id: '4',
            name: 'Deluxe Plan',
            price: 19.99,
            messages: 'Unlimited',
            characters: '6',
            features: [
              'Unlimited messages/month',
              '6 Character',
              'Dedicated chat capacity with basic priority'
            ]
          }
        ];
        setPlans(plans);
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const getButtonConfig = (planId) => {
    const currentPlanId = parseInt(currentUserPlan);
    const targetPlanId = parseInt(planId);

    if (currentPlanId === targetPlanId) {
      return {
        text: 'Current Plan',
        disabled: true,
        className: styles.currentPlan
      };
    } else if (currentPlanId && targetPlanId < currentPlanId) {
      return {
        text: 'Downgrade Plan',
        disabled: false,
        className: styles.downgradeButton
      };
    } else {
      return {
        text: currentPlanId ? 'Upgrade Plan' : 'Select Plan',
        disabled: false,
        className: styles.upgradeButton
      };
    }
  };

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    const queryParams = new URLSearchParams({
      email: email,
      name: name,
      planId: plan.id,
      planName: plan.name,
      planPrice: plan.price,
      messages: plan.messages,
      characters: plan.characters,
      features: JSON.stringify(plan.features), // Encoding features array as string
      period: 'Month' // Adding billing period
    }).toString();
    
    router.push(`/paymentHome?${queryParams}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <br />
        <br />
        <h1>Subscription</h1>
        <p>At NexusBond.AI, we are dedicated to providing top-notch AI chatbot services and personalized support to help you succeed. Reach out to us, and lets unlock the full potential of AI together.</p>
      </div>

      {!currentUserPlan && (
        <div className={styles.noPlanBanner}>
          <h3>No Active Subscription</h3>
          <p>Choose from our available plans below to enhance your experience!</p>
        </div>
      )}

      <div className={styles.plansContainer}>
        {plans.map((plan) => {
          const buttonConfig = getButtonConfig(plan.id);
          return (
            <div 
              key={plan.id} 
              className={`${styles.planCard} 
                ${plan.id === currentUserPlan ? styles.activePlanCard : ''}`}
            >
              {plan.id === currentUserPlan && (
                <div className={styles.activeLabel}>Current Plan</div>
              )}
              <h2>{plan.name}</h2>
              <div className={styles.price}>
                <span className={styles.dollar}>$</span>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>/Month</span>
              </div>

              <div className={styles.features}>
                <h3>You Get</h3>
                {plan.features.map((feature, index) => (
                  <div key={index} className={styles.feature}>
                    <Image 
                      src="/assets/icons/done.png" 
                      alt="Check" 
                      width={16} 
                      height={16} 
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`${styles.buyButton} ${buttonConfig.className}`}
                onClick={() => handleBuyNow(plan)}
                disabled={buttonConfig.disabled}
              >
                {buttonConfig.text}
              </button>
            </div>
          );
        })}
      </div>

      {loading && <LoaderPopup />}
    </div>
  );
}

// Main component with Suspense wrapper
export default function SubscriptionHome() {
  return (
    <Suspense fallback={<LoaderPopup />}>
      <SubscriptionHomeContent />
    </Suspense>
  );
} 