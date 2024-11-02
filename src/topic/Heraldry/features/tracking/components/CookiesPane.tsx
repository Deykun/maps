import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconCookie from '@/components/Icons/IconCookie';

import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';

import useTrackingStore, { acceptAll, rejectGA } from '@/topic/Heraldry/features/tracking/stores/trackingStore';

const CookiesPane = () => {
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const isPopupOpen = useTrackingStore(state => state.isPopupOpen);
  const wasPopupClosed = useTrackingStore(state => state.wasPopupClosed);

  const { t } = useTranslation();

  if (!isPopupOpen && wasPopupClosed) {
    return null;
  }

  return (
    <Panel
      className="popup-with-question !gap-5 text-justify"
      style={{
        animationDelay: isPopupOpen ? '0s' : undefined,
      }}
    >
      <p
        className="text-[12px]"
        dangerouslySetInnerHTML={{ __html: t('settings.cookies.text') }}
      />
      <div className="flex flex-row-reverse sm:flex-col justify-center items-center gap-2">      
        <ButtonText
          className="hover:!bg-[#c4ee6842]"
          onClick={acceptAll}
          isActive
        >
          <span className="whitespace-nowrap">{t('settings.cookies.acceptAll')}</span>
          <IconCookie className="size-10 !fill-[#76e827]"/>
        </ButtonText>
        {areSettingsOpen ? <ButtonText
          size="small"
          onClick={rejectGA}
          isActive
        >
          <span>{t('settings.cookies.acceptRequired')}</span>
        </ButtonText> : 
        <ButtonText
          size="small"
          onClick={() => setAreSettingsOpen(!areSettingsOpen)}
          isActive
        >
          <span>{t('heraldry.titleSettings')}</span>
        </ButtonText>}
      </div>

    </Panel>
  );
}

export default CookiesPane;
