"use client";
import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from '@/components/Button';
import styles from "./payment.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
import LoaderPopup from "@/components/LoaderPopup";
import axios from "axios";
import { authService } from "@/api/services/auth.service";

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

const CheckoutForm = ({ email: initialEmail, name, plan, amount }) => {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail || ""); // Store the email input
  const [clientSecret, setClientSecret] = useState(""); // Store client secret
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);
  // Fetch the client secret from your backend when the component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data.clientSecret)
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  const storePayment = async (paymentIntent) => {
       setSuccess(true);
        alert("Payment Successful!");
        setTimeout(() => {
          router.replace(`/profile`);
        }, 1500);
    // try {
    //   const formData1 = new FormData();
    //   formData1.append('details', JSON.stringify({ email, name, plan, amount, paymentIntent }));
    //   formData1.append('plan_id', 1);

    //   console.log(email, name, plan, amount, paymentIntent)

    //   const token = authService.getAccessToken();

    //   console.log(token)

    //   const response = await axios({
    //     method: 'post',
    //     url: 'https://application.nexusbond.ai/api/save-payment',
    //     data: formData1,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     },
    //   });
    //   console.log(response)

    //   if (response.status === 200 || response.status === 201) {
    //     console.log(response.data)
     
    //   }
    //   else {
    //     console.log(response.data)
    //   }
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  }

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
        console.log(error.message);
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        storePayment(paymentIntent)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {loading ? "Processing..." : `Pay $${amount}`}
      </Button>

      {success && (
        <div className={styles.success}>
          Payment successful!
        </div>
      )}
      {loading && <LoaderPopup />}
    </form>
  );
};

export default CheckoutForm;