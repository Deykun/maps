import { useTranslation } from 'react-i18next';

import IconGlobe from '@/components/Icons/IconGlobe';
import IconLoader from '@/components/Icons/IconLoader';

import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  message: string,
  isLoading?: boolean,
}

const HeraldryMapContainerWithUIStatus = ({ message, isLoading = false }: Props) => {
  const { t } = useTranslation();

  return (
    <div id="map-status" className="flex flex-col justify-center items-center h-[100vh] p-4">
      <ButtonCircle tagName="span" size="large">
        {isLoading ? <IconLoader /> : <IconGlobe />}
      </ButtonCircle>
      <p className="mt-5 text-[18px] text-[#d2543a]">{t(message)}</p>
    </div>
  );
}

export default HeraldryMapContainerWithUIStatus;
