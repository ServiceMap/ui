import { ThemeMode } from "@/shared/ui/theme-provider/lib";

export const isThemeMode = (value: unknown): value is ThemeMode => {
  return !!value && Object.values(ThemeMode).includes(value as ThemeMode);
};
