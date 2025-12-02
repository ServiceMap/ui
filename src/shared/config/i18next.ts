export const i18Config = {
  defaultLocale: "en",
  locales: ["en", "uk"] as const,
  localeDetection: true,
} as const;

export type Locale = (typeof i18Config.locales)[number];

export const LocaleNames: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
} as const;
