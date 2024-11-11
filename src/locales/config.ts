import localeEn from './en.json';
import localeEt from './et.json';
import localeDe from './de.json';
import localeFi from './fi.json';
import localeNo from './no.json';
import localePl from './pl.json';

// TODO: manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  de: {
    translation: localeDe,
  },
  en: {
    translation: localeEn,
  },
  et: {
    translation: localeEt,
  },
  fi: {
    translation: localeFi,
  },
  no: {
    translation: localeNo,
  },
  pl: {
    translation: localePl,
  },
};
