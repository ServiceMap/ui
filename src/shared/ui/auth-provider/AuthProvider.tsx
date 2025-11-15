import React from "react";

import { AuthContext } from "@/shared/ui/auth-provider/lib/AuthContext.ts";
import { useAuthProvider } from "@/shared/ui/auth-provider/lib/useAuthProvider.ts";
import { Loader } from "@/shared/ui/loader";

interface AuthProviderProps {
  children: React.ReactNode;
  initErrorCallback?: () => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initErrorCallback,
}) => {
  const { isInitiated, ...value } = useAuthProvider(initErrorCallback);

  if (!isInitiated) return <Loader fullscreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
