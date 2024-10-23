import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import { LOCAL_STORAGE } from './constants';

import localeEn from './locales/en.json';
import localeEt from './locales/et.json';
import localeDe from './locales/de.json';
import localeFi from './locales/fi.json';
import localePl from './locales/pl.json';

// TODO: manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: localeEn,
  },
  et: {
    translation: localeEt,
  },
  de: {
    translation: localeDe,
  },
  pl: {
    translation: localePl,
  },
  fi: {
    translation: localeFi,
  }
};

export const SUPPORTED_LANGS = Object.keys(resources).sort((a, b) => a.localeCompare(b))

let defaultLanguage = 'en';

if (SUPPORTED_LANGS.includes(document?.documentElement?.lang)) {
  defaultLanguage = document?.documentElement?.lang;
}

const langFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.MAPS_USER_LANG) || '';

if (SUPPORTED_LANGS.includes(langFromLocalStorage)) {
  defaultLanguage = langFromLocalStorage;
}

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    resources,
    lng: defaultLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;