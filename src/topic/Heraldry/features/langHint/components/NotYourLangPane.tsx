import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE } from '@/constants';
import { isLanguageSupported, getLanguageSuggested } from '@/utils/lang';

import IconTranslation from '@/components/Icons/IconTranslation';

import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';

import { track } from '@/topic/Heraldry/features/tracking/stores/trackingStore';

type Props = {
  lang: string,
}

const NotYourLangPane = ({ lang }: Props) => {
  const [isOpen, setIsOpen] = useState(!localStorage.getItem(LOCAL_STORAGE.MAPS_USER_LANG) && !isLanguageSupported(lang));

  const { t, i18n } = useTranslation();

  const changeLanguage = (langToSet: string) => {
    if (langToSet !== i18n.language) {
      i18n.changeLanguage(langToSet);
      localStorage.setItem(LOCAL_STORAGE.MAPS_USER_LANG, langToSet);
      track({ name: `lang_changed_to_${langToSet}`, withCountry: true });
    }

    setIsOpen(false);
  }

  const suggestedLang = useMemo(() => {
    return getLanguageSuggested();
  }, []);

  if (!isOpen) {
    return null;
  }

  if (i18n.language !== lang) {
    return null;
  }

  return (
    <Panel className="popup-with-question">
      <div className="text-[12px] text-center">
        <p
          dangerouslySetInnerHTML={{ __html: t('settings.language.text', { lng: suggestedLang }) }}
        />
        <p
          dangerouslySetInnerHTML={{ __html: t('settings.language.text') }}
          className="mt-1 opacity-70"
        />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2">
        <ButtonText
          className="hover:!bg-[#c4ee6842]"
          onClick={() => changeLanguage(lang)}
          isActive
        >
          <span>{t('main.currentLanguage', { lng: lang })}</span>
          <IconTranslation className="size-10 !fill-[#76e827]"/>
        </ButtonText>
        <ButtonText
          className="hover:!bg-[#c4ee6842]"
          onClick={() => changeLanguage(suggestedLang)}
          isActive
        >
          <span>{t('main.currentLanguage', { lng: suggestedLang })}</span>
          <IconTranslation className="size-10 !fill-[#76e827]"/>
        </ButtonText>
      </div>
    </Panel>
  );
}

export default NotYourLangPane;
