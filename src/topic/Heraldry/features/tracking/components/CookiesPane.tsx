import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconCookie from '@/components/Icons/IconCookie';

import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';

import useTrackingStore, { acceptAll, rejectGA } from '@/topic/Heraldry/features/tracking/stores/trackingStore';

import './CookiesPane.scss'

const CookiesPane = () => {
  const isPopupOpen = useTrackingStore(state => state.isPopupOpen);
  const wasPopupClosed = useTrackingStore(state => state.wasPopupClosed);

  const { t } = useTranslation();

  if (!isPopupOpen && wasPopupClosed) {
    return null;
  }

  return (
    <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 flex items-end pointer-events-none">
      <Panel
        className={clsx(
          'cookies-pane',
          'ui-panel--rounded-l ui-panel--rounded-r',
          'w-[calc(100vw_-24px)] sm:w-auto max-w-[600px]',
          'bg-black text-white',
          'gap-5 p-4',
          'flex-col items-end md:flex-row md:items-center',
        )}
        style={{
          animationDelay: isPopupOpen ? '0s' : undefined,
        }}
      >
        <p
            className="text-[12px]"
            dangerouslySetInnerHTML={{ __html: t('settings.cookies.text') }}
        />
        <div className="flex justify-center items-center gap-2">
          <ButtonText
            className="hover:!bg-[#ee686842]"
            onClick={rejectGA}
            isActive
          >
            <span>{t('settings.cookies.rejectGA')}</span>
          </ButtonText>
          <ButtonText
            className="hover:!bg-[#c4ee6842]"
            onClick={acceptAll}
            isActive
          >
            <span>{t('settings.cookies.acceptAll')}</span>
            <IconCookie className="size-10 !fill-[#76e827]"/>
          </ButtonText>
        </div>
      </Panel>
    </div>
  );
}

export default CookiesPane;
