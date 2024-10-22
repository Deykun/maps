import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useOutsideClick from '@/hooks/useOutsideClick';

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconControls from '@/components/Icons/IconControls';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';
import IconSquareRounded from '@/components/Icons/IconSquareRounded';


import Panel from '@/components/UI/Panel';
import SubPanel from '@/components/UI/SubPanel';

import ButtonIcon from '@/components/UI/ButtonIcon';

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

  const { t } = useTranslation();

  useOutsideClick('#zoom-pane', () => {
    setIsOpen(false);
  });

  return (
    <div className="relative pointer-events-auto" id="zoom-pane">
      <Panel className="ui-panel--rounded-l">
        <ButtonIcon onClick={() => setZoomLevel(zoomLevel + 1)} isDisabled={zoomLevel === zoomMax}>
          <IconPlus />
        </ButtonIcon>
        <ButtonIcon onClick={() => setZoomLevel(zoomLevel - 1)} isDisabled={zoomLevel === zoomMin}>
          <IconMinus />
        </ButtonIcon>
        <ButtonIcon onClick={() => setIsOpen(!isOpen)} isActive={isOpen} label={t('heraldry.titleSettings')}>
          <IconControls />
          {coatSize < 0 && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
        </ButtonIcon>
      </Panel>
      {isOpen && <SubPanel
        order={2}
        className="ui-slide-from-right-sidebar no-scrollbar z-[-1] absolute top-0 right-12 mr-2 flex-row items-center"
      >
        <ButtonIcon onClick={() => setCoatSize(coatSize - 1)} isDisabled={coatSize === coatMin}>
          <IconMinus />
        </ButtonIcon>
        <span style={{ transform: `scale(${((coatSize + 5) / (coatMax + 5)).toFixed(1)})`}} >
          {coatSize === -1 ? <IconSquareRounded className="size-5" /> : <IconShieldCheckers className="size-5" />}
        </span>
        <ButtonIcon onClick={() => setCoatSize(coatSize + 1)} isDisabled={coatSize === coatMax}>
          <IconPlus />
        </ButtonIcon>
      </SubPanel>}
    </div>
  );
}

export default ZoomPane;
