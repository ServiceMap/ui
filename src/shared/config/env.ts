import { stringToBoolean } from "@/shared/lib";
import type { AppConfigType } from "@/shared/types";

const VITE_TEST_MODE_NAME = "test";

export const AppConfig: AppConfigType = (() => {
  return {
    CURRENT_ENV: import.meta.env.MODE,
    IS_TEST: import.meta.env.MODE === VITE_TEST_MODE_NAME,
    IS_DEVELOPMENT: import.meta.env.DEV,
    IS_PRODUCTION: import.meta.env.PROD,
    SHOW_UNIMPLEMENTED_FEATURES: stringToBoolean(
      import.meta.env.VITE_SHOW_UNIMPLEMENTED_FEATURES,
    ),
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || window.env.SENTRY_DSN,
    STRIPE_PUBLIC_KEY:
      import.meta.env.VITE_STRIPE_PUBLIC_KEY || window.env.STRIPE_PUBLIC_KEY,
    API_SERVER_URL:
      import.meta.env.VITE_API_SERVER_URL || window.env.API_SERVER_URL,
    KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL || window.env.KEYCLOAK_URL,
    KEYCLOAK_CLIENT_ID:
      import.meta.env.VITE_KEYCLOAK_CLIENT_ID || window.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_DEFAULT_REALM:
      import.meta.env.VITE_KEYCLOAK_DEFAULT_REALM ||
      window.env.KEYCLOAK_DEFAULT_REALM,
  };
})();
