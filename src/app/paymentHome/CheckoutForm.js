"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import Button from '@/components/Button';
import styles from "./payment.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
import LoaderPopup from "@/components/LoaderPopup";
import axios from "axios";
import { authService } from "@/api/services/auth.service";
import SuccessPopup from '@/components/SuccessPopup';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      lineHeight: "1.5",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

function CheckoutFormContent({ email: initialEmail, name, planId, planName, planPrice, messages, characters, features, period }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get data from URL parameters
  const [email, setEmail] = useState(initialEmail || searchParams.get('email') || "");
  const [planData, setPlanData] = useState({
    name: name || searchParams.get('name'),
    planId: planId || searchParams.get('planId'),
    planName: planName || searchParams.get('planName'),
    planPrice: planPrice || Number(searchParams.get('planPrice')),
    messages: messages || searchParams.get('messages'),
    characters: characters || searchParams.get('characters'),
    features: features || searchParams.get('features'),
    period: period || searchParams.get('period')
  });

  const [clientSecret, setClientSecret] = useState(""); // Store client secret
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      if(initialEmail === null) {
        setEmail("");
      } else {
        setEmail(initialEmail);
      }
    }
  }, [initialEmail]);
  // Only fetch client secret if it's a paid plan
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (planData.planPrice > 0) {  // Only create payment intent for paid plans
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: planData.planPrice * 100, // convert to cents
          }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      }
    };

    createPaymentIntent();
  }, [planData.planPrice]);

  const storePayment = async (paymentIntent) => {
    try {
      const formData1 = new FormData();
      formData1.append('details', JSON.stringify({ 
        email, 
        ...planData,
        paymentIntent 
      }));
      formData1.append('plan_id', planData.planId);


      const token = authService.getAccessToken();


      const response = await axios({
        method: 'post',
        url: 'https://application.nexusbond.ai/api/save-payment',
        data: formData1,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        authService.setCurrentUser(response.data.user);
        setSuccess(true);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          router.replace(`/home`);
        }, 2000);
      } else {
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to confirm payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return; // Ensure Stripe.js is loaded

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });

      if (error) {
        setError(error.message);
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        storePayment(paymentIntent)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFreePlanSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      // Create a mock payment intent for free plan
      const mockPaymentIntent = {
        id: `free_${Date.now()}`,
        status: 'succeeded',
        amount: 0,
      };

      formData.append('details', JSON.stringify({ 
        email, 
        ...planData,
        paymentIntent: mockPaymentIntent 
      }));
      formData.append('plan_id', planData.planId);

      const token = authService.getAccessToken();
      const response = await axios({
        method: 'post',
        url: 'https://application.nexusbond.ai/api/save-payment',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        authService.setCurrentUser(response.data.user);
        setSuccess(true);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          router.replace(`/home`);
        }, 2000);
      }
    } catch (error) {
      setError('Failed to activate free plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.planSummary}>
        <h2>Subscription Summary</h2>
        <div className={styles.planDetails}>
          <h3>{planData.planName}</h3>
          <p className={styles.price}>
            ${planData.planPrice} <span>/{planData.period}</span>
          </p>
          <div className={styles.features}>
            <h4>Whats Included:</h4>
            <ul>
              <li>{planData.messages} Messages per month</li>
              <li>{planData.characters} Characters</li>
              {planData.features && typeof planData.features === 'string' && 
                JSON.parse(planData.features).map((feature, index) => (
                  <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {planData.planPrice === 0 ? (
        // Free Plan Form
        <form onSubmit={handleFreePlanSubmission} className={styles.form}>
          <Button
            type="submit"
            disabled={loading}
            width="100%"
          >
            {loading ? "Processing..." : "Activate Free Plan"}
          </Button>
        </form>
      ) : (
        // Paid Plan Form with Stripe
        stripe && elements && (  // Only render if Stripe is initialized
          <form onSubmit={handleSubmit} className={`${styles.form} ${loading ? styles.loading : ''}`}>
            <div>
              <label className={styles.cardLabel}>Card Information</label>
              <div className={styles.cardElement}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </div>
              {error && <div className={styles.error}>{error}</div>}
            </div>

            <Button
              type="submit"
              disabled={loading || !stripe}
              width="100%"
            >
              {loading ? "Processing..." : `Pay $${planData.planPrice}`}
            </Button>
          </form>
        )
      )}
      
      {showSuccessPopup && (
        <SuccessPopup 
          message="Payment successful! Redirecting to your profile..."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
      {loading && <LoaderPopup />}
    </>
  );
}

// Main component with Suspense wrapper
const CheckoutForm = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutFormContent {...props} />
      </Suspense>
    </Elements>
  );
};

export default CheckoutForm;