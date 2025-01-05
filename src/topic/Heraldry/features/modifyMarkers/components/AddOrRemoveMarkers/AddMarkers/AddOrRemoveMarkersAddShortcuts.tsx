import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import {
  useFilterModificationStore,
  includeUnitInMarker,
  selectUnitIncludeModifictions,
  selectShortcuts,
} from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';
import useGetUnitMarkersFromCache from '@/topic/Heraldry/features/modify/hooks/useGetUnitMarkersFromCache';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkersSection = ({ unit }: Props) => {
  const includeAnimal = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'animal'));
  const includeItem = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'item'));
  const {
    animals,
    items,
  } = useGetUnitMarkersFromCache(unit, unit.country);
  const shortcuts = useFilterModificationStore(selectShortcuts);

  const { t } = useTranslation();

  return (
    <>
      {shortcuts.map(({ name, type, total }) => 
        <ButtonText
          key={name}
          size="small"
          onClick={() => includeUnitInMarker(unit, type, name)}
          isActive={type === 'animal' ? includeAnimal.includes(name) : includeItem.includes(name)}
          isDisabled={type === 'animal' ? animals.includes(name) : items.includes(name)}
        >
          {type === 'animal' ? <IconAnimal animals={[name]} /> : <IconCrown />}
          <span>+ {t(`heraldry.${type}.${name}`)} <small>({total})</small></span>
        </ButtonText>
      )}
    </>
  );
};

export default AddOrRemoveMarkersSection;
