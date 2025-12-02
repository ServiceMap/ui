import { createContext } from "react";

import type { ThemeMode } from "@/shared/ui/theme-provider/lib";

interface ThemeContextProps {
  theme: ThemeMode;
  changeTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);
