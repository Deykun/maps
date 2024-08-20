import { useState } from 'react';

// import IconPlus from

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconControls from '@/components/Icons/IconControls';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';

import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  setZoomLevel: (level: number) => void,
  zoomLevel: number,
  zoomMin: number,
  zoomMax: number,
  coatSize: number,
  setCoatSize: (size: number) => void,
  coatMin: number,
  coatMax: number,
};

const ZoomPane = ({
  zoomLevel,
  setZoomLevel,
  zoomMin,
  zoomMax,
  coatSize,
  setCoatSize,
  coatMin,
  coatMax,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const zoomLevel = useSettingStore(state => state.zoomLevel);
  // const coatSize = useSettingStore(state => state.coatSize);
  // const { t } = useTranslation();

  return (
    <div className="relative">
      <Pane>
        <ButtonCircle onClick={() => setZoomLevel(zoomLevel + 1)} isDisabled={zoomLevel === zoomMax}>
          <IconPlus />
        </ButtonCircle>
        <ButtonCircle onClick={() => setZoomLevel(zoomLevel - 1)} isDisabled={zoomLevel === zoomMin}>
          <IconMinus />
        </ButtonCircle>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} isActive={isOpen}>
          <IconControls />
        </ButtonCircle>
      </Pane>
      {isOpen && <SubPane order={2} className="absolute right-12 mr-3 flex-row items-center">
        <ButtonCircle onClick={() => setCoatSize(coatSize + 1)} isDisabled={coatSize === coatMax}>
          <IconPlus />
        </ButtonCircle>
        <span style={{ transform: `scale(${((coatSize + 5) / (zoomMax + 5)).toFixed(1)})`}}>
          <IconShieldCheckers className="size-5" />
        </span>
        <ButtonCircle onClick={() => setCoatSize(coatSize - 1)} isDisabled={coatSize === coatMin}>
          <IconMinus />
        </ButtonCircle>
      </SubPane>}
      {/* {isOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
        <div className="flex items-center gap-2">
          <IconShieldCheckers className="size-4"/>
          <h3>Size of the coat of arms</h3>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </div>} */}
    </div>
  );
}

export default ZoomPane;
