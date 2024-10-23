import { useTranslation } from 'react-i18next';

import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import HeraldryProgressbar from '@/topic/Heraldry/components/HeraldryProgressbar/HeraldryProgressbar';

import HeraldryProgressStatusList from './HeraldryProgressStatusList';

type Props = {
  country: string,
  message: string,
}

const HeraldryProgressStatus = ({ country, message }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div id="map-status" className="flex flex-col justify-center items-center h-[100lvh] p-4">
        <IconShieldCheckers className="size-8 mb-2 fill-ui" />
        <h1 className="heading text-[20px] md:text-[28px] lg:text-[36px] text-center text-ui-dark mb-4">
          {t(`heraldry.${country}.mapTitle`)}
        </h1>
        <HeraldryProgressStatusList />
        {/* <Panel className="rounded-full">
          <ButtonIcon tagName="span" size="large">
            {isLoading ? <IconLoader /> : <IconGlobe />}
          </ButtonIcon>
        </Panel> */}
        {/* <p className="mt-5 text-[18px] text-[#d2543a]">{t(message)}</p> */}
      </div>
    </>
  );
}

export default HeraldryProgressStatus;
