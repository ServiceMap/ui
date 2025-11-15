import * as Sentry from "@sentry/react";

import { AppConfig } from "@/shared/config";

export const initSentry = () => {
  if (!AppConfig.IS_PRODUCTION || !AppConfig.SENTRY_DSN) return;

  Sentry.init({
    dsn: AppConfig.SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: AppConfig.IS_DEVELOPMENT && !AppConfig.IS_TEST,
    environment: AppConfig.CURRENT_ENV,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};

export { Sentry };
