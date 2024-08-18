import { useState } from 'react';

import useEffectChange from '@/hooks/useEffectChange';

import {
  useSettingStore,
  zoomIn,
  zoomOut,
  zoomMin,
  zoomMax,
  setCoatSize,
} from '@/topic/Heraldry/stores/settingsStore';

// setCoatSize

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconControls from '@/components/Icons/IconControls';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import UiButton from '../UiButton';


const UiZoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const zoomLevel = useSettingStore(state => state.zoomLevel);
  const coatSize = useSettingStore(state => state.coatSize);
  // const { t } = useTranslation();

  return (
    <div className="heraldry-ui-pane pointer-events-auto">
      <UiButton onClick={zoomIn} isDisabled={zoomMax === zoomLevel}>
        <IconPlus />
      </UiButton>
      <UiButton onClick={zoomOut} isDisabled={zoomMin === zoomLevel}>
        <IconMinus />
      </UiButton>
      <UiButton onClick={() => setIsOpen(!isOpen)} isActive={isOpen}>
        <IconControls />
      </UiButton>
      {isOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
        <div className="flex items-center gap-2">
          <IconShieldCheckers className="size-4"/>
          <h3>Size of the coat of arms</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCoatSize(10)}>10px</button>
          <button onClick={() => setCoatSize(20)}>20px</button>
          <button onClick={() => setCoatSize(40)}>40px</button>
          <button onClick={() => setCoatSize(80)}>80px</button>
        </div>
      </div>}
    </div>
  );
}

export default UiZoom;
