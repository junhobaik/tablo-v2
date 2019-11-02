import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ko: {
    translation: {
      test: '테스트',
    },
  },
  en: {
    translation: {
      test: 'TEST',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, //

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
