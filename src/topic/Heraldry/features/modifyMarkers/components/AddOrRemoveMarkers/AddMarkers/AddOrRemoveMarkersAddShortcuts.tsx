import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import { useFilterModificationStore, includeUnitInMarker, selectUnitIncludeModifictions } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';


type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkersSection = ({ unit }: Props) => {
  const includeAnimal = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'animal'));
  const includeItem = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'item'));

  const { t } = useTranslation();

  // TODO: add logic to return list of last or most popular user action in this section
  return (
    <>
      {['lion', 'eagle'].map((name) => 
        <ButtonText
          size="small"
          onClick={() => includeUnitInMarker(unit, 'animal', name)}
          isDisabled={includeAnimal.includes(name)}
        >
          <IconAnimal animals={[name]} />
          <span>+ {t(`heraldry.animal.${name}`)}</span>
        </ButtonText>
      )}
      {['crown'].map((name) => 
        <ButtonText
          size="small"
          onClick={() => includeUnitInMarker(unit, 'item', name)}
          isDisabled={includeItem.includes(name)}
        >
          <IconCrown />
          <span>+ {t(`heraldry.item.${name}`)}</span>
        </ButtonText>
      )}
    </>
  );
};

export default AddOrRemoveMarkersSection;
