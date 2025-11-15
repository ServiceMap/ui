import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import { Button } from "@/shared/ui";

export const StripeSandboxButton = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleClick = () => {
    setLoading(true);
    setStatus("");

    const stripeLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

    if (!stripeLink) {
      setStatus("Error: Missing VITE_STRIPE_PAYMENT_LINK in environment!");
      setLoading(false);
      return;
    }

    window.location.href = stripeLink;
  };

  if (status) return <p className="tw:text-red-600">{status}</p>;

  return (
    <Button onClick={handleClick} disabled={loading || !stripe}>
      {loading ? "Redirecting..." : "💳 Pay $5 with Stripe"}
    </Button>
  );
};
