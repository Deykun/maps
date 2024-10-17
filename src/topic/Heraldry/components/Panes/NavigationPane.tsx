import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from "wouter";
import clsx from 'clsx';

import { HERALDRY_COUNTRIES } from '@/constants';

import useOutsideClick from '@/hooks/useOutsideClick';

import { SUPPORTED_LANGS } from '@/i18n';

import IconGlobe from '@/components/Icons/IconGlobe';
import IconTranslation from '@/components/Icons/IconTranslation';
import IconGithub from '@/components/Icons/IconGithub';

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import './NavigationPane.scss'

const NavigationPane = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const { t, i18n } = useTranslation();
  const [path] = useLocation();

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  // Not the nicest solution, but it works
  useOutsideClick('#navigation-pane', () => {
    setActiveMenu('');
  });

  return (
    <div className="relative" id="navigation-pane">
      <Pane>
        <ButtonCircle
          onClick={toggleMenu('country')}
          isActive={activeMenu === 'country'}
          label={t('main.country')}
          labelPosition="right"
        >
          <IconGlobe />
        </ButtonCircle>
        <ButtonCircle
          onClick={toggleMenu('language')}
          isActive={activeMenu === 'language'}
          label={t('main.language')}
          labelPosition="right"
        >
          <IconTranslation />
        </ButtonCircle>
        <ButtonCircle
          href="https://github.com/Deykun/maps"
          target="_blank"
          label="Page repository"
          labelPosition="right"
        >
          <IconGithub />
        </ButtonCircle>
      </Pane>
      {activeMenu === 'country' && <SubPane order={0} className="absolute left-12 ml-3 flex-row">
        {HERALDRY_COUNTRIES.map(({ path: langPath, pathNameLink, lang }) => <ButtonCircle
          href={`/maps/${langPath}`}
          className={clsx('text-[20px]', {
            'border border-[#eac6a8]': path === `/maps/${langPath}`,
          })}
          title={t(pathNameLink)}
        >
          <img className="navigation-pane-flag sans" src={`images/flags/${lang}.svg`} alt={lang} />
        </ButtonCircle>)}
      </SubPane>}
      {activeMenu === 'language' && <SubPane order={1} className="absolute left-12 ml-3 flex-row">
        {SUPPORTED_LANGS.map((lang) => <ButtonCircle
          onClick={() => i18n.changeLanguage(lang)}
          className={clsx('text-[20px]', {
            'border border-[#eac6a8]': i18n.language === lang,
          })}
        >
          <img className="navigation-pane-flag sans" src={`images/flags/${lang}.svg`} alt={lang} />
        </ButtonCircle>)}
      </SubPane>}
    </div>
  );
}

export default memo(NavigationPane);
