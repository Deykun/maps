import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useOutsideClick from '@/hooks/useOutsideClick';

import IconPlus from '@/components/Icons/IconPlus';
import IconMinus from '@/components/Icons/IconMinus';
import IconControls from '@/components/Icons/IconControls';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import Pane from '@/components/UI/Pane';
import Panel from '@/components/NewUI/Panel';
import SubPane from '@/components/UI/SubPane';

import ButtonIcon from '@/components/NewUI/ButtonIcon';
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
        </ButtonIcon>
      </Panel>
      {isOpen && <SubPane order={2} className="ui-slide-from-top absolute top-0 right-12 z-[100] mr-2 flex-row items-center">
        <ButtonCircle onClick={() => setCoatSize(coatSize - 1)} isDisabled={coatSize === coatMin}>
          <IconMinus />
        </ButtonCircle>
        <span style={{ transform: `scale(${((coatSize + 5) / (coatMax + 5)).toFixed(1)})`}} className="drop-shadow-[0_0_4px_rgba(255,255,255,0.95)]">
          <IconShieldCheckers className="size-5" />
        </span>
        <ButtonCircle onClick={() => setCoatSize(coatSize + 1)} isDisabled={coatSize === coatMax}>
          <IconPlus />
        </ButtonCircle>
      </SubPane>}
    </div>
  );
}

export default ZoomPane;
