"use client";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import styles from "./payment.module.css";
import { useSearchParams } from 'next/navigation';
import LoaderPopup from "@/components/LoaderPopup";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Separate component for content that uses useSearchParams
function CheckoutContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const planId = searchParams.get('planId');
  const planName = searchParams.get('planName');
  const planPrice = searchParams.get('planPrice');

  return (
    <div className={styles.container}>
      <h2>Subscribe to Our Service</h2>
      <p>Plan: USD ${planPrice} / month</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm 
          email={email} 
          name={name} 
          planId={planId} 
          planName={planName} 
          planPrice={planPrice}
        /> 
      </Elements>
    </div>
  );
}

// Main component with Suspense wrapper
const Checkout = () => {
  return (
    <Suspense fallback={<LoaderPopup />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;