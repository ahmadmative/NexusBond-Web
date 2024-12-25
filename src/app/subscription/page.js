"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './subscription.module.css';
import LoaderPopup from '@/components/LoaderPopup';
import { authService } from '@/api/services/auth.service';

function SubscriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  // Get registration data from URL params
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = async () => {
    setLoading(true);
    try {       
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

  const handleBuyNow = (plan) => {
    const queryParams = new URLSearchParams({
      email: email,
      name: name,
      planId: plan.id,
      planName: plan.name,
      planPrice: plan.price,
      messages: plan.messages,
      characters: plan.characters,
      features: JSON.stringify(plan.features),
      period: 'Month'
    }).toString();
    
    router.push(`/payment?${queryParams}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <br />
        <br />
        <h1>Subscription Plans</h1>
        <p>At NexusBond.AI, we are dedicated to providing top-notch AI chatbot services and personalized support to help you succeed. Reach out to us, and lets unlock the full potential of AI together.</p>
      </div>

      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={styles.planCard}
          >
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
              className={styles.buyButton}
              onClick={() => handleBuyNow(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {loading && <LoaderPopup />}
    </div>
  );
}

export default function Subscription() {
  return (
    <Suspense fallback={<LoaderPopup />}>
      <SubscriptionContent />
    </Suspense>
  );
} 