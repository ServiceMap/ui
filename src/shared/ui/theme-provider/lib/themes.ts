import type { ValueOf } from "@/shared/types";

export const ThemeMode = {
  Dark: "dark",
  Light: "light",
  Orange: "orange",
} as const;

export type ThemeMode = ValueOf<typeof ThemeMode>;
