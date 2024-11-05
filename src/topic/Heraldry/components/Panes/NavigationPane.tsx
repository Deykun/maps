import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from "wouter";
import clsx from 'clsx';

import { HERALDRY_COUNTRIES, LOCAL_STORAGE } from '@/constants';

import { isLanguageSupported } from '@/utils/lang';

import useOutsideClick from '@/hooks/useOutsideClick';

import { SUPPORTED_LANGS } from '@/i18n';

import IconCheck from '@/components/Icons/IconCheck';
import IconCookie from '@/components/Icons/IconCookie';
import IconCookies from '@/components/Icons/IconCookies';
import IconControls from '@/components/Icons/IconControls';

import IconGlobe from '@/components/Icons/IconGlobe';
import IconTranslation from '@/components/Icons/IconTranslation';
import IconGithub from '@/components/Icons/IconGithub';

import Panel from '@/components/UI/Panel';
import SubPanel from '@/components/UI/SubPanel';
import ButtonIcon from '@/components/UI/ButtonIcon';

import useTrackingStore, { track, toggleCookiesPopup } from '@/topic/Heraldry/features/tracking/stores/trackingStore';

import IconFlag from './NavigationPane/IconFlag';

import './NavigationPane.scss'

const NavigationPane = () => {
  const didAgreeToGA = useTrackingStore(state => state.didAgreeToGA);
  const isPopupOpen = useTrackingStore(state => state.isPopupOpen);
  const [wasLangChanged, setWasLangChanged] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const { t, i18n } = useTranslation();
  const [path] = useLocation();

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  // Not the nicest solution, but it works
  useOutsideClick('#navigation-pane', () => {
    setActiveMenu('');
  });

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setWasLangChanged(true);
    localStorage.setItem(LOCAL_STORAGE.MAPS_USER_LANG, lang);
    track({ name: `lang_changed_to_${lang}`, withCountry: true });
  }

  return (
    <div className="relative" id="navigation-pane">
      <Panel className="ui-panel--rounded-r">
        <ButtonIcon
          onClick={toggleMenu('country')}
          isActive={activeMenu === 'country'}
          label={t('main.country')}
          labelPosition="right"
        >
          <IconGlobe />
        </ButtonIcon>
        <ButtonIcon
          onClick={toggleMenu('language')}
          isActive={activeMenu === 'language'}
          label={t('main.language')}
          labelPosition="right"
        >
          <IconTranslation />
          {!wasLangChanged && !isLanguageSupported(i18n.language) && 
            <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">
              !
            </span>
          }
        </ButtonIcon>
        <ButtonIcon
          onClick={toggleMenu('settings')}
          isActive={activeMenu === 'settings'}
          label={t('heraldry.titleSettings')}
          labelPosition="right"
        >
          <IconControls />
        </ButtonIcon>
        <span className="border-t" />
        <ButtonIcon
          className="hover:!bg-black"
          href="https://github.com/Deykun/maps"
          target="_blank"
          label="Page repository"
          labelPosition="right"
        >
          <IconGithub />
        </ButtonIcon>
      </Panel>
      {activeMenu === 'country' && <SubPanel order={0} className="ui-slide-from-left-sidebar z-[-1] absolute left-12 ml-3 flex-row">
        {HERALDRY_COUNTRIES.map(({ path: langPath, pathNameLink, country, lang }) => <ButtonIcon
          key={langPath}
          href={`/maps/${langPath}`}
          title={t(pathNameLink)}
          isActive={path === `/maps/${langPath}`}
          label={t(`heraldry.${country}.mapTitle`)}
          labelPosition="bottomRight"
        >
          <IconFlag className="navigation-pane-flag" code={country || lang} />
          {path === `/maps/${langPath}` && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
        </ButtonIcon>)}
      </SubPanel>}
      {activeMenu === 'language' && <SubPanel order={1} className={clsx(
        'ui-slide-from-left-sidebar !z-[-1] absolute left-12 ml-3 flex-row',
      )}>
        {SUPPORTED_LANGS.map((lang) => <ButtonIcon
          key={lang}
          onClick={() => changeLanguage(lang)}
          isActive={i18n.language === lang}
          label={t('main.currentLanguage', { lng: lang })}
          labelPosition="bottomRight"
        >
          <IconFlag className="navigation-pane-flag" code={lang} />
          {i18n.language === lang && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
        </ButtonIcon>)}
      </SubPanel>}
      {activeMenu === 'settings' && <SubPanel order={2} className="ui-slide-from-left-sidebar z-[-1] absolute left-12 ml-3 flex-row">
        <ButtonIcon
          onClick={toggleCookiesPopup}
          isActive={isPopupOpen}
          label="Cookies"
          labelPosition="bottomRight"
        >
          {didAgreeToGA ? <IconCookies /> : <IconCookie />}
        </ButtonIcon>
      </SubPanel>}
    </div>
  );
}

export default memo(NavigationPane);
