import IconGlobe from '@/components/Icons/IconGlobe';
import IconLoader from '@/components/Icons/IconLoader';

import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  text: string,
  isLoading?: boolean,
}

const HeraldryMapContainerWithUIStatus = ({ text, isLoading = false }: Props) => {
  return (
    <div id="map-status" className="flex flex-col justify-center items-center h-[100vh] p-4">
      <ButtonCircle tagName="span" size="large">
        {isLoading ? <IconLoader /> : <IconGlobe />}
      </ButtonCircle>
      <p className="mt-5 text-[18px] text-[#d2543a]">{text}</p>
    </div>
  );
}

export default HeraldryMapContainerWithUIStatus;
