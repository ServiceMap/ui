import { useContext } from "react";

import { AuthContext } from "@/shared/ui/auth-provider/lib/AuthContext.ts";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context) return context;

  throw new Error("useAuth must be used within the AuthProvider");
};
