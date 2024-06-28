// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './assets/locales/en/translation.json';
import teTranslation from './assets/locales/te/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detect language
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      te: {
        translation: teTranslation
      }
    },
    fallbackLng: 'te',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    react: {
      useSuspense: false
    },
  });

export default i18n;
