import { SUPPORTED_LANGS } from '@/i18n';

export const isLanguageSupported = (lang: string) => {
  const { language: browserLanguage, languages: browserLanguages } = navigator;

  if (browserLanguage === lang || browserLanguage.startsWith(lang)) {
    return true;
  }

   return browserLanguages.some(
      oneOfBrowserLanguages => oneOfBrowserLanguages === lang
        || oneOfBrowserLanguages.startsWith(`${lang}-`)
        || oneOfBrowserLanguages.startsWith(`${lang}_`)
  );
};

export const getLanguageSuggested = () => {
  const matchedLang = SUPPORTED_LANGS.find((lang) => lang !== 'en' && isLanguageSupported(lang));

  if (matchedLang) {
    return matchedLang;
  }

  return 'en';
}
