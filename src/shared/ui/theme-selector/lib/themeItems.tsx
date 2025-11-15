import { Apple, Moon, Sun } from "lucide-react";

import { cn } from "@/shared/lib";
import { ThemeMode } from "@/shared/ui/theme-provider";

const themeIcons = {
  [ThemeMode.Light]: Sun,
  [ThemeMode.Dark]: Moon,
  [ThemeMode.Orange]: Apple,
} as const;

export const ThemeItems = Object.entries(themeIcons).map(([value, Icon]) => ({
  tKey: `${value}_theme_name`,
  value: value as ThemeMode,
  getIcon: (isSelected: boolean) => (
    <Icon className={cn({ "tw:fill-primary": isSelected })} size={16} />
  ),
}));
