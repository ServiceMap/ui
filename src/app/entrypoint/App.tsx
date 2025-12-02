import { StrictMode } from "react";

import { StripeProvider } from "@/app/providers";
import { AppRouter } from "@/app/routes";
import { AuthProvider, ThemeProvider } from "@/shared/ui";

export const App = () => {
  return (
    <AuthProvider>
      <StrictMode>
        <StripeProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </StripeProvider>
      </StrictMode>
    </AuthProvider>
  );
};
