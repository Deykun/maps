import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useOutsideClick from '@/hooks/useOutsideClick';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import IconMapMagnifyingGlass from '@/components/Icons/IconMapMagnifyingGlass';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconColor from '@/components/Icons/IconColor';
import IconControls from '@/components/Icons/IconControls';
import IconFlask from '@/components/Icons/IconFlask';
import IconPacakgeChecked from '@/components/Icons/IconPacakgeChecked';
import IconPackageMagnifyingGlass from '@/components/Icons/IconPackageMagnifyingGlass';
import IconEraser from '@/components/Icons/IconEraser';
import IconCubeAnd from '@/components/Icons/IconCubeAnd';
import IconCubeOr from '@/components/Icons/IconCubeOr';
import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';

import Pane from '@/components/UI/Pane';
import SubPane from '@/components/UI/SubPane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

type Props = {
  lang: string,
};

const DevelopmentPane = ({
  lang,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name); 

  return (
    <div className="relative pointer-events-auto" id="development-pane">
      <Pane>
        <ButtonCircle onClick={() => setIsOpen(!isOpen)} isActive={isOpen} title={t('heraldry.titleFilters')}>
          <IconFlask />
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle onClick={toggleMenu('type')} isActive={activeMenu === 'type'} title={t('heraldry.unit.filterTitle')}>
            <IconPacakgeChecked />
          </ButtonCircle>
          <ButtonCircle onClick={toggleMenu('type')} isActive={activeMenu === 'type'} title={t('heraldry.unit.filterTitle')}>
            <IconPackageMagnifyingGlass />
          </ButtonCircle>
        </>}
      </Pane>
    </div>
  );
}

export default DevelopmentPane;
