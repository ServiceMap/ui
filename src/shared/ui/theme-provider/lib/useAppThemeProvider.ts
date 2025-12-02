import { useEffect, useEffectEvent, useState } from "react";

import { addCssClasses, removeCssClasses } from "@/shared/lib";
import {
  getStoredTheme,
  setStoredTheme,
  ThemeMode,
} from "@/shared/ui/theme-provider/lib";

export const useAppThemeProvider = () => {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Light);

  const applyTheme = (newTheme: ThemeMode) => {
    removeCssClasses(document.documentElement, Object.values(ThemeMode));
    addCssClasses(document.documentElement, [newTheme]);

    setTheme(newTheme);
  };

  const loadTheme = useEffectEvent(() => {
    const currentTheme = getStoredTheme();
    if (!currentTheme) return;

    applyTheme(currentTheme);
  });

  useEffect(() => {
    loadTheme();
  }, []);

  const changeTheme = (newTheme: ThemeMode) => {
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, changeTheme };
};
