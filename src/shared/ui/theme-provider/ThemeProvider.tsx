import React from "react";

import { ThemeContext } from "@/shared/ui/theme-provider/lib/ThemeContext.ts";
import { useAppThemeProvider } from "@/shared/ui/theme-provider/lib/useAppThemeProvider.ts";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value = useAppThemeProvider();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
