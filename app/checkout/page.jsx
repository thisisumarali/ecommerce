"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
function Checkout() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("amount"));
  const options = {
    mode: "payment",
    currency: "usd",
    amount: searchParams.get("amount") * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={searchParams.get("amount")} />
    </Elements>
  );
}

export default Checkout;
