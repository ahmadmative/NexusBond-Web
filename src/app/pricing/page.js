'use client';

import React from 'react';
import Link from 'next/link';
import styles from './pricing.module.css';
import { FaCheck } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '0.00',
      features: [
        '50 messages/month',
        '1 Character',
        'Messages deleted after 7 days of inactivity'
      ]
    },
    {
      name: 'Standard Plan',
      price: '9.99',
      features: [
        '1000 messages/month',
        '2 Character',
        'Dedicated chat capacity with basic priority'
      ]
    },
    {
      name: 'Premium Plan',
      price: '15.99',
      features: [
        '4000 messages/month',
        '4 Character',
        'Dedicated chat capacity with basic priority'
      ]
    },
    {
      name: 'Deluxe Plan',
      price: '19.99',
      features: [
        'Unlimited messages/month',
        '6 Character',
        'Dedicated chat capacity with basic priority'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Subscription</h1>
        <p className={styles.subtitle}>
          Choose the perfect plan that suits your needs. Experience the power of AI companionship 
          with our flexible subscription options designed to enhance your interaction experience.
        </p>

        <div className={styles.plansContainer}>
          {plans.map((plan, index) => (
            <div key={index} className={styles.planCard}>
              <h2 className={styles.planName}>{plan.name}</h2>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>/ Month</span>
              </div>
              
              <div className={styles.featuresContainer}>
                <h3 className={styles.featuresTitle}>You Get</h3>
                <ul className={styles.featuresList}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <FaCheck className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/register" className={styles.selectButton}>
                Select Plan
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pricing;
