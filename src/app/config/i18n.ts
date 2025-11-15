import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

import { AppConfig, i18Config, type Locale } from "@/shared/config";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: i18Config.defaultLocale,
    keySeparator: false,
    debug: AppConfig.IS_DEVELOPMENT && !AppConfig.IS_TEST,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  const locale = i18Config.locales.includes(lng as Locale)
    ? lng
    : i18Config.defaultLocale;

  if (lng !== locale) {
    i18n.changeLanguage(locale);
    return;
  }

  dayjs.locale(locale);
});

export { i18n };
