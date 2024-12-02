"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './subscription.module.css';
import LoaderPopup from '@/components/LoaderPopup';
import { authService } from '@/api/services/auth.service';
import axios from 'axios';

export default function Subscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [currentUserPlan, setCurrentUserPlan] = useState(null);

  // Get registration data from URL params
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log("user", user);
    if(user?.subscribedTo === 'No subscription found'){
      setCurrentUserPlan('basic');
    }else{
      setCurrentUserPlan(user?.subscribedTo?.plan?.name?.toLowerCase());
    }
    getPlans();
  }, []);

  const getPlans = async () => {
    setLoading(true);
    try {       
        const token = authService.getAccessToken();
        const response = await axios({
            method: 'get',
            url: 'https://application.nexusbond.ai/api/get-plans',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
          console.log('plans', response.data.plans);
            const transformedPlans = response.data.plans.map(plan => ({
                id: plan.id,
                name: `${plan.name} Plan`,
                price: parseInt(plan.price),
                type: plan.name === 'Gold' ? 'Most Popular' : 
                      plan.name === 'Silver' ? 'Medium' : 'Normal',
                features: [
                    `${plan.no_of_chats} Chat`,
                ]
            }));
            setPlans(transformedPlans);
        }
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
  };

  const handleBuyNow = (plan) => {
    console.log(plan);
    setSelectedPlan(plan);
    router.push(`/payment?email=${email}&name=${name}&planId=${plan.id}&planName=${plan.name}&planPrice=${plan.price}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Subscription</h1>
      </div>

      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`${styles.planCard} 
              ${plan.id === 'gold' ? styles.popular : ''} 
              ${(plan.id === currentUserPlan || 
                (currentUserPlan === 'basic' && plan.name.toLowerCase().includes('basic'))) 
                ? styles.activePlan : ''}`}
          >
            {(plan.id === currentUserPlan || 
              (currentUserPlan === 'basic' && plan.name.toLowerCase().includes('basic'))) && (
              <div className={styles.activeLabel}>
                {currentUserPlan === 'basic' && plan.name.toLowerCase().includes('basic') 
                  ? 'Recommended Plan' 
                  : 'Active Plan'}
              </div>
            )}
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

      {loading && <LoaderPopup />}
    </div>
  );
} 