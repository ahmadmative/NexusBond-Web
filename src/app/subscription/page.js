"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './subscription.module.css';

export default function Subscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Get registration data from URL params
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 50,
      type: 'Normal',
      features: [
        '1000 Chat',
        '06 hours a day'
      ]
    },
    {
      id: 'silver',
      name: 'Silver Plan',
      price: 100,
      type: 'Medium',
      features: [
        '5000 Chat',
        '12 hours a day'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      price: 150,
      type: 'Most Popular',
      features: [
        '10000 Chat',
        '24/7'
      ]
    }
  ];

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    // Navigate to identity-essence with all params
    router.push(`/payment?email=${email}&name=${name}&plan=${plan.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <button 
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <Image 
            src="/assets/icons/back.png" 
            alt="Back" 
            width={24} 
            height={24} 
          />
        </button> */}
        <h1>Subscription</h1>
      </div>

      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`${styles.planCard} ${plan.id === 'gold' ? styles.popular : ''}`}
          >
            <h2>{plan.name}</h2>
            <div className={styles.price}>
              <span className={styles.dollar}>$</span>
              <span className={styles.amount}>{plan.price}</span>
              <span className={styles.period}>/Month</span>
            </div>
            <span className={styles.type}>{plan.type}</span>

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
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 