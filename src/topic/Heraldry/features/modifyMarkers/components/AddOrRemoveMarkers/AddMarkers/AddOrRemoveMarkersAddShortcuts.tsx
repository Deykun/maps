import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import {
  useFilterModificationStore,
  includeUnitInMarker,
  selectUnitIncludeModifictions,
  selectShortcuts,
} from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkersSection = ({ unit }: Props) => {
  const includeAnimal = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'animal'));
  const includeItem = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'item'));
  const shortcuts = useFilterModificationStore(selectShortcuts);

  const { t } = useTranslation();

  // TODO: add logic to return list of last or most popular user action in this section
  return (
    <>
      {shortcuts.map(({ name, type }) => 
        <ButtonText
          key={name}
          size="small"
          onClick={() => includeUnitInMarker(unit, type, name)}
          isDisabled={type === 'animal' ? includeAnimal.includes(name) : includeItem.includes(name)}
        >
          {type === 'animal' ? <IconAnimal animals={[name]} /> : <IconCrown />}
          <span>+ {t(`heraldry.${type}.${name}`)}</span>
        </ButtonText>
      )}
    </>
  );
};

export default AddOrRemoveMarkersSection;
