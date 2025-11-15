import { loadStripe, type Stripe } from "@stripe/stripe-js";

import { AppConfig } from "@/shared/config";

let stripePromise: Promise<Stripe | null> | undefined;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const key = AppConfig.STRIPE_PUBLIC_KEY;
    if (!key) {
      console.error("Stripe public key missing!");
    }

    stripePromise = loadStripe(key);
  }

  return stripePromise;
};
