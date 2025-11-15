import { getLocalStorageItem, setLocalStorageItem } from "@/shared/lib";
import { THEME_LOCAL_STORAGE_KEY } from "@/shared/ui/theme-provider/config";
import { isThemeMode, type ThemeMode } from "@/shared/ui/theme-provider/lib";

export const getStoredTheme = (): ThemeMode | null => {
  const stored = getLocalStorageItem<ThemeMode>(THEME_LOCAL_STORAGE_KEY);
  return isThemeMode(stored) ? stored : null;
};

export const setStoredTheme = (theme: ThemeMode) => {
  setLocalStorageItem(THEME_LOCAL_STORAGE_KEY, theme);
};
