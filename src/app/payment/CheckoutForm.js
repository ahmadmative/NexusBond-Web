"use client";
import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from '@/components/Button';
import styles from "./payment.module.css";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { authService } from "@/api/services/auth.service";
import SuccessPopup from '@/components/SuccessPopup';

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

const CheckoutForm = ({ email: initialEmail, name, planId, planName, planPrice }) => {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail || "");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: planPrice * 100, // convert to cents
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [planPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

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
        setSuccess(true);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          router.push(`/identity-essence?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&planId=${encodeURIComponent(planId)}&planName=${encodeURIComponent(planName)}&planPrice=${encodeURIComponent(planPrice)}`);
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.form} ${loading ? styles.loading : ''}`}>
        <div>
          <label className={styles.cardLabel}>Email Address</label>
          <input
            className={styles.emailInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

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
          {loading ? "Processing..." : `Pay $${planPrice}`}
        </Button>

        {success && (
          <div className={styles.success}>
            Payment successful! Thank you for your subscription.
          </div>
        )}
      </form>
      
      {showSuccessPopup && (
        <SuccessPopup 
          message="Payment successful! Thank you for your subscription."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </>
  );
};

export default CheckoutForm;