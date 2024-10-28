import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { CoatOfArmsMapData, MarkerType } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';

import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';
import IconFire from '@/components/Icons/IconFire';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

import AddOrRemoveMarkersAddPicker from './AddOrRemoveMarkersAddPicker';
import AddOrRemoveMarkersAddRemoveShortcuts from './AddOrRemoveMarkersAddShortcuts';

type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkers = ({ unit }: Props) => {
  const [activeMenu, setActiveMenu] = useState<'' | MarkerType>('');

  const { t } = useTranslation();

  const toggleMenu = (name: MarkerType) => () => setActiveMenu((v) => v === name ? '' : name);

  return (
    <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
      <div className="flex gap-2 items-center">
        <IconMarkerPlus className="size-5 fill-white mr-auto" />
        <ButtonText
          size="small"
          onClick={() => setActiveMenu('')}
          isActive={activeMenu === ''}
        >
          <IconFire />
        </ButtonText>
        <ButtonText
          size="small"
          onClick={toggleMenu('animal')}
          isActive={activeMenu === 'animal'}
        >
          <IconAnimal />
          <span className="lowercase">+ {t(`heraldry.animal.filterTitle`)}</span>
        </ButtonText>
        <ButtonText
          size="small"
          onClick={toggleMenu('item')}
          isActive={activeMenu === 'item'}
        >
          <IconCrown />
          <span className="lowercase">+ {t(`heraldry.item.filterTitle`)}</span>
        </ButtonText>
      </div>
      <div className={clsx(
        'flex gap-2 items-center justify-end min-h-[36px]',
        'border-t mt-1 pt-2 empty:hidden flex-wrap'
      )}>
        {activeMenu ? <AddOrRemoveMarkersAddPicker key={activeMenu} unit={unit} markerType={activeMenu} /> : <AddOrRemoveMarkersAddRemoveShortcuts unit={unit} />}
      </div>
    </Panel>
  );
};

export default AddOrRemoveMarkers;
