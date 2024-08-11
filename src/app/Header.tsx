import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "wouter";

const Header = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = useCallback(() => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
}, [i18n]);

  return (
    <header className="flex justify-between p-5">
      <button className="mr-auto" onClick={handleLanguageChange}>{t('main.currentLanguage')}</button>
      <Link to="/maps/">Home</Link>
      <a className="ml-5" href="https://github.com/Deykun/maps" target="_blank">GitHub</a>
    </header>
  );
}

export default Header
