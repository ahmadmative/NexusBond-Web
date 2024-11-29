import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key

export async function POST(request) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // 20.00 USD in cents
      currency: "usd",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}