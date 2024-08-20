import { useState } from 'react';

// import IconPlus from

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconControls from '@/components/Icons/IconControls';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  zoomIn: () => void,
  zoomOut: () => void,
  zoomLevel: number,
  zoomMin: number,
  zoomMax: number,
  // setCoatSize: (size: number) => void,
  // coatSize: 40,
};

const ZoomPane = ({
  zoomIn,
  zoomOut,
  zoomLevel,
  zoomMin,
  zoomMax,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const zoomLevel = useSettingStore(state => state.zoomLevel);
  // const coatSize = useSettingStore(state => state.coatSize);
  // const { t } = useTranslation();

  return (
    <>
      <Pane>
        <ButtonCircle onClick={zoomIn} isDisabled={zoomLevel === zoomMax}>
          <IconPlus />
        </ButtonCircle>
        <ButtonCircle onClick={zoomOut} isDisabled={zoomLevel === zoomMin}>
          <IconMinus />
        </ButtonCircle>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} isActive={isOpen}>
          <IconControls />
        </ButtonCircle>
      </Pane>
      {/* {isOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
        <div className="flex items-center gap-2">
          <IconShieldCheckers className="size-4"/>
          <h3>Size of the coat of arms</h3>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </div>} */}
    </>
  );
}

export default ZoomPane;
