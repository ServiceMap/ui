import React from "react";
import { Elements } from "@stripe/react-stripe-js";

import { getStripe } from "@/app/config";

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const stripePromise = getStripe();

  return <Elements stripe={stripePromise}>{children}</Elements>;
};
