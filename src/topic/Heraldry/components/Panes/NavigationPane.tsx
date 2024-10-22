import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from "wouter";
import clsx from 'clsx';

import { HERALDRY_COUNTRIES } from '@/constants';

import useOutsideClick from '@/hooks/useOutsideClick';

import { SUPPORTED_LANGS } from '@/i18n';

import IconCheck from '@/components/Icons/IconCheck';
import IconGlobe from '@/components/Icons/IconGlobe';
import IconTranslation from '@/components/Icons/IconTranslation';
import IconGithub from '@/components/Icons/IconGithub';

import Panel from '@/components/UI/Panel';
import SubPanel from '@/components/UI/SubPanel';
import ButtonIcon from '@/components/UI/ButtonIcon';

import './NavigationPane.scss'

type Props = {
  shouldHintLang?: boolean,
  setShouldHintLang?: (value: boolean) => void,
}

const NavigationPane = ({
  shouldHintLang,
  setShouldHintLang,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const { t, i18n } = useTranslation();
  const [path] = useLocation();

  useEffect(() => {
    if (shouldHintLang) {
      setActiveMenu('language');
    }
  }, [shouldHintLang])

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  // Not the nicest solution, but it works
  useOutsideClick('#navigation-pane', () => {
    setActiveMenu('');

    if (setShouldHintLang) {
      setShouldHintLang(false);
    }
  });

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);

    if (setShouldHintLang) {
      setShouldHintLang(false);
    }
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
        </ButtonIcon>
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
        {HERALDRY_COUNTRIES.map(({ path: langPath, pathNameLink, lang }) => <ButtonIcon
          href={`/maps/${langPath}`}
          title={t(pathNameLink)}
          isActive={path === `/maps/${langPath}`}
        >
          <img className="navigation-pane-flag" src={`images/flags/${lang}.svg`} alt={lang} />
          {path === `/maps/${langPath}` && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
        </ButtonIcon>)}
      </SubPanel>}
      {activeMenu === 'language' && <SubPanel order={1} className={clsx(
        'ui-slide-from-left-sidebar !z-[-1] absolute left-12 ml-3 flex-row',
        'ui-tooltip-wrapper', {
          'ui-tooltip-wrapper--active ': shouldHintLang,
        }
      )}>
        {SUPPORTED_LANGS.map((lang) => <ButtonIcon
          onClick={() => changeLanguage(lang)}
          isActive={i18n.language === lang}
        >
          <img className="navigation-pane-flag" src={`images/flags/${lang}.svg`} alt={lang} />
          {i18n.language === lang && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
        </ButtonIcon>)}
        <span className="ui-tooltip ui-tooltip--top">App language</span>
      </SubPanel>}
    </div>
  );
}

export default memo(NavigationPane);
