import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import hrHR from "../i18n/hr-HR";
import enUS from "../i18n/en-US";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "hr", // change after to "en"
    interpolation: {
      escapeValue: false,
    },
    resources: {
      hr: {
        translation: hrHR,
      },
      en: {
        translation: enUS,
      },
    },
  });

export default i18n;
