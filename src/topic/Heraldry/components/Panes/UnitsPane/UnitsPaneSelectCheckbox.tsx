import { useFiltersDevelopmentStore } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconInputCheckEmpty from '@/components/Icons/IconInputCheckEmpty';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';

import ButtonIcon from '@/components/UI/ButtonIcon';

import useUnitsPaneStore, { toggleSelected } from '@/topic/Heraldry/stores/unitsPaneStore';

type Props = {
  wrapperClassName?: string,
  className?: string,
  unit: CoatOfArmsMapData,
}

const UnitsPaneSelectCheckbox = ({ wrapperClassName, className, unit }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const selected = useUnitsPaneStore(state => state.selected);
  const isSelected = selected.some(({ id }) => id === unit.id);

  // Bull actions are only available in dev mode
  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <ButtonIcon
      wrapperClassName={wrapperClassName}
      className={className}
      size="small"
      onClick={() => toggleSelected(unit)}
      isActive={isSelected}
      label={isSelected ? 'Unselect' : 'Select'}
      labelPosition="left"
    >
      {isSelected ? <IconInputCheckFull /> : <IconInputCheckEmpty />}
    </ButtonIcon>
  );
};

export default UnitsPaneSelectCheckbox;
