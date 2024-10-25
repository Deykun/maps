import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import {
  toggleAsCustomFilterExclude,
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { mergeMarkersForUnit } from '@/topic/Heraldry/utils/markers/mergeMarkersForUnit';

import { CoatOfArmsMapData, MarkerType } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';

import IconFlask from '@/components/Icons/IconFlask';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import ButtonText from '@/components/UI/ButtonText';

import AddOrRemoveMarkersAddPicker from './AddOrRemoveMarkersAddPicker';
import AddOrRemoveMarkersAddRemoveShortcuts from './AddOrRemoveMarkersAddShortcuts';
import AddOrRemoveMarkersRemovePicker from './AddOrRemoveMarkersRemovePicker';


type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkers = ({ unit }: Props) => {
  const [activeMenu, setActiveMenu] = useState<'' | MarkerType>('');
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  // const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  // const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  const { t } = useTranslation();

  const toggleMenu = (name: MarkerType) => () => setActiveMenu((v) => v === name ? '' : name);

  // if (!isFiltersDevModeActive) {
  //   return null;
  // }
  if (!isFiltersDevModeActive) {
    return null;
  }

  // const items = mergeMarkersForUnit(unit, )

  return (
    <>
      <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
        <div className="flex gap-2 items-center">
          <IconFlask className="size-5 fill-white mr-auto" />
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
          'border-t mt-1 pt-2 empty:hidden', {
            'flex-wrap': !activeMenu
        })}>
          {activeMenu ? <AddOrRemoveMarkersAddPicker key={activeMenu} country={unit.lang} markerType={activeMenu} /> : <AddOrRemoveMarkersAddRemoveShortcuts />}
        </div>
      </Panel>
      <AddOrRemoveMarkersRemovePicker unit={unit} />
    </>
  );
};

export default AddOrRemoveMarkers;
