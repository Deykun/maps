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
