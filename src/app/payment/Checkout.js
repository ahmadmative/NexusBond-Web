"use client";
import React, { Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import styles from "./payment.module.css";
import { useSearchParams } from 'next/navigation';
import LoaderPopup from "@/components/LoaderPopup";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const planId = searchParams.get('planId');
  const planName = searchParams.get('planName');
  const planPrice = Number(searchParams.get('planPrice'));
  const messages = searchParams.get('messages');
  const characters = searchParams.get('characters');
  const features = searchParams.get('features');
  const period = searchParams.get('period');

  return (
    <div className={styles.container}>
      {planPrice > 0 ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm 
            email={email} 
            name={name} 
            planId={planId} 
            planName={planName} 
            planPrice={planPrice}
            messages={messages}
            characters={characters}
            features={features}
            period={period}
          />
        </Elements>
      ) : (
        <CheckoutForm 
          email={email} 
          name={name} 
          planId={planId} 
          planName={planName} 
          planPrice={planPrice}
          messages={messages}
          characters={characters}
          features={features}
          period={period}
        />
      )}
    </div>
  );
}

const Checkout = () => {
  return (
    <Suspense fallback={<LoaderPopup />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;