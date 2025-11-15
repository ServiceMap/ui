import { createContext } from "react";

import type { KeycloakUser } from "@/shared/api/auth";

interface AuthContextProps {
  isLoggedIn: boolean;
  user?: KeycloakUser;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
