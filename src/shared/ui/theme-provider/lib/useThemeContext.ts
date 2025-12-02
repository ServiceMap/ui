import { useContext } from "react";

import { ThemeContext } from "@/shared/ui/theme-provider/lib/ThemeContext.ts";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context) return context;

  throw new Error("useTheme must be used within the ThemeProvider");
};
