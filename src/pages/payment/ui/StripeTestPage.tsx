import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

export const StripeTestPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("Ready");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setStatus("Stripe.js has not loaded yet!");
      return;
    }

    setLoading(true);
    setStatus("Creating PaymentIntent...");

    try {
      const res = await axios.post<{
        clientSecret: string;
      }>("http://localhost:4242/create-payment-intent");

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setStatus(`❌ Error: ${result.error.message}`);
      } else if (result.paymentIntent?.status === "succeeded") {
        setStatus("✅ Payment succeeded!");
      } else {
        setStatus(`Status: ${result.paymentIntent?.status}`);
      }
    } catch (error) {
      setStatus(`⚠️ Unexpected error during confirmation`);
      console.error("Unexpected error during confirmation", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Stripe Sandbox Test</h2>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#635bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          {loading ? "Processing..." : "Pay Test $10"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>Status: {status}</p>
    </div>
  );
};
