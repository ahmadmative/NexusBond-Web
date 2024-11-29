"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import { Elements } from "@stripe/react-stripe-js"; // Import Elements for Stripe context
import CheckoutForm from "./CheckoutForm"; // Payment form component
import styles from "./payment.module.css";
import { useSearchParams } from 'next/navigation';
// Initialize Stripe outside of the component render to avoid recreating the stripe object on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  
  const getPlanAmount = (planType) => {
    switch(planType) {
      case 'basic':
        return 50;
      case 'silver':
        return 100;
      case 'gold':
        return 150;
      default:
        return 50;
    }
  };

  return (
    <div className={styles.container}>
      <h2>Subscribe to Our Service</h2>
      <p>Plan: USD ${getPlanAmount(plan)} / month</p>

      {/* Wrap your form with the Elements provider */}
      <Elements stripe={stripePromise}>
        <CheckoutForm email={email} name={name} plan={plan} amount={getPlanAmount(plan)}/> {/* Your custom form component for payment */}
      </Elements>
    </div>
  );
};

export default Checkout;