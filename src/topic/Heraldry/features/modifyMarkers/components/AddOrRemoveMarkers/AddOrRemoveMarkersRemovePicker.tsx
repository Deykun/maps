import { useTranslation } from 'react-i18next';
// import {
//   toggleAsCustomFilterExclude,
//   toggleAsCustomFilterInclude,
//   useFiltersDevelopmentStore,
//   getIsMatchingManualMarker,
// } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';


import ButtonText from '@/components/UI/ButtonText';

import useGetUnitMarkersFromCache from '@/topic/Heraldry/features/modify/hooks/useGetUnitMarkersFromCache';


type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkersRemovePicker = ({ unit }: Props) => {
  const { t } = useTranslation();

  const {
    animals,
    items,
  } = useGetUnitMarkersFromCache(unit)

  if (items.length === 0 && animals.length === 0) {
    return null;
  }

  return (
    <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
      <div className="flex gap-2 items-center justify-end flex-wrap">
        <IconEraser className="size-5 fill-white mr-auto" />
        {animals.map((animal) => 
          <ButtonText
            className="!bg-[#601212]"
            size="small"
          >
            <IconAnimal animals={[animal]} />
            <span>- {t(`heraldry.animal.${animal}`)}</span>
          </ButtonText>
        )}
        {items.map((item) => 
          <ButtonText
            className="!bg-[#601212]"
            size="small"
          >
            <IconCrown />
            <span>- {t(`heraldry.item.${item}`)}</span>
          </ButtonText>
        )}
      </div>
    </Panel>
  );
};

export default AddOrRemoveMarkersRemovePicker;
