import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import hrHR from "../i18n/hr-HR";
import enUS from "../i18n/en-US";
import axiosClient from "../auth/apiClient";

const currentLanguage = await axiosClient
  .get("/api/settings/language")
  .then((res) => res.data[0].value);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "hr", // change after to "en"
    lng: currentLanguage ?? "hr",
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
