import { useTranslation } from 'react-i18next';

import IconGithub from '@/components/Icons/IconGithub';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import HeraldryProgressbar from './HeraldryProgressbar';
import HeraldryProgressStatusList from './HeraldryProgressStatusList';

type Props = {
  country: string,
  message?: string,
}

const HeraldryProgressStatus = ({ country, message }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div id="map-status" className="flex flex-col justify-center items-center h-[100lvh] p-4">
        <IconShieldCheckers className="size-8 mb-2 fill-ui" />
        <h1 className="heading text-[24px] md:text-[28px] lg:text-[36px] text-center text-ui-dark mb-4">
          {t(`heraldry.${country}.mapTitle`)}
        </h1>
        <HeraldryProgressStatusList />
        {message && <p className="mt-5 text-[12px] text-marker">{t(message)}</p>}
      </div>
      <footer className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <a
          href="https://github.com/Deykun/maps/"
          target="_blank"
          className="ui-slide-from-bottom text-[12px] text-black font-[500] flex gap-3"
        >
          <IconGithub className="size-5 ml-2" />
          <span>
            github.com/Deykun/maps
          </span>
        </a>
      </footer>
    </>
  );
}

export default HeraldryProgressStatus;
