import localeEn from './en.json';
import localeEt from './et.json';
import localeDe from './de.json';
import localeFi from './fi.json';
import localePl from './pl.json';

// TODO: manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
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
