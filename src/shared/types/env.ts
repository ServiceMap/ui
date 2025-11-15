export type WindowEnvType = {
  readonly SENTRY_DSN: string;
  readonly STRIPE_PUBLIC_KEY: string;
  readonly API_SERVER_URL: string;
  readonly KEYCLOAK_URL: string;
  readonly KEYCLOAK_CLIENT_ID: string;
  readonly KEYCLOAK_DEFAULT_REALM: string;
};

export type AppConfigType = WindowEnvType & {
  readonly CURRENT_ENV: string;
  readonly IS_TEST: boolean;
  readonly IS_DEVELOPMENT: boolean;
  readonly IS_PRODUCTION: boolean;
  readonly SHOW_UNIMPLEMENTED_FEATURES: boolean;
};
