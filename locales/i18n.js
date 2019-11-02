import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from './locale.ko.json';
import en from './locale.en.json';

const resources = { ko, en };

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
