import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import Panel from '@/components/UI/Panel';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';
import IconEraser from '@/components/Icons/IconEraser';

import ButtonText from '@/components/UI/ButtonText';

import {
  useFilterModificationStore,
  selectUnitExcludeModifictions,
  selectUnitIncludeModifictions,
  removeFromIncludeAndExcludeInMarker,
} from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

type Props = {
  unit: CoatOfArmsMapData,
}

const buttonClassName = 'hover:!bg-[#ff00004f]';

const RemoveModifications = ({ unit }: Props) => {
  const includeAnimal = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'animal'));
  const includeItem = useFilterModificationStore(selectUnitIncludeModifictions(unit, 'item'));
  const excludedAnimal = useFilterModificationStore(selectUnitExcludeModifictions(unit, 'animal'));
  const excludeItem = useFilterModificationStore(selectUnitExcludeModifictions(unit, 'item'));

  const { t } = useTranslation();

  const hasContent = includeAnimal.length > 0 || includeItem.length > 0 || excludedAnimal.length > 0 || excludeItem.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <Panel className="ui-panel--rounded-l ui-panel--rounded-r bg-black">
      <div className="flex gap-2 items-center justify-end flex-wrap">
        <IconEraser className="size-5 flex-shrink-0 fill-white mr-auto" />
        {includeAnimal.map((name) => 
          <ButtonText key={name} size="small" onClick={() => removeFromIncludeAndExcludeInMarker(unit, 'animal', name)} className={buttonClassName}>
            <IconAnimal className="!fill-marker" animals={[name]} />
            <span>+ {t(`heraldry.animal.${name}`)}</span>
          </ButtonText>
        )}
        {excludedAnimal.map((name) => 
          <ButtonText key={name} size="small" onClick={() => removeFromIncludeAndExcludeInMarker(unit, 'animal', name)} className={buttonClassName}>
            <IconAnimal className="!fill-marker" animals={[name]} />
            <span>- {t(`heraldry.animal.${name}`)}</span>
          </ButtonText>
        )}
        {includeItem.map((name) => 
          <ButtonText key={name} size="small" onClick={() => removeFromIncludeAndExcludeInMarker(unit, 'item', name)} className={buttonClassName}>
            <IconCrown className="!fill-marker" />
            <span>+ {t(`heraldry.item.${name}`)}</span>
          </ButtonText>
        )}
        {excludeItem.map((name) => 
          <ButtonText key={name} size="small" onClick={() => removeFromIncludeAndExcludeInMarker(unit, 'item', name)} className={buttonClassName}>
            <IconCrown className="!fill-marker" />
            <span>- {t(`heraldry.item.${name}`)}</span>
          </ButtonText>
        )}
      </div>
    </Panel>
  );
};

export default RemoveModifications;
