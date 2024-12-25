import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    let amount = 1000; // default amount

    // Get amount from request body if it exists
    try {
      const body = await request.json();
      if (body.amount) {
        amount = body.amount;
      }
    } catch (e) {
      // If no body is sent, use default amount
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}