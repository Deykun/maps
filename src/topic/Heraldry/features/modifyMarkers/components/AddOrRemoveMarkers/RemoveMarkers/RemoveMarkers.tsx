import { useTranslation } from 'react-i18next';


import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';

import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';


import { useFilterModificationStore, excludeUnitFromMarker, selectUnitExcludeModifictions } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

import useGetUnitMarkersFromCache from '@/topic/Heraldry/features/modify/hooks/useGetUnitMarkersFromCache';


type Props = {
  unit: CoatOfArmsMapData,
}

const RemoveMarkers = ({ unit }: Props) => {
  const excludedAnimal = useFilterModificationStore(selectUnitExcludeModifictions(unit, 'animal'));
  const excludeItem = useFilterModificationStore(selectUnitExcludeModifictions(unit, 'item'));

  const { t } = useTranslation();

  const {
    animals,
    items,
  } = useGetUnitMarkersFromCache(unit, unit.country);

  if (items.length === 0 && animals.length === 0) {
    return null;
  }

  return (
    <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
      <div className="flex gap-2 items-center justify-end flex-wrap">
        <IconMarkerMinus className="size-5 flex-shrink-0 fill-white mr-auto" />
        {animals.map((name) => 
          <ButtonText
            key={name}
            size="small"
            onClick={() => excludeUnitFromMarker(unit, 'animal', name)}
            isDisabled={excludedAnimal.includes(name)}
          >
            <IconAnimal animals={[name]} />
            <span>- {t(`heraldry.animal.${name}`)}</span>
          </ButtonText>
        )}
        {items.map((name) => 
          <ButtonText
            key={name}
            size="small"
            onClick={() => excludeUnitFromMarker(unit, 'item', name)}
            isDisabled={excludeItem.includes(name)}
          >
            <IconCrown />
            <span>- {t(`heraldry.item.${name}`)}</span>
          </ButtonText>
        )}
      </div>
    </Panel>
  );
};

export default RemoveMarkers;
