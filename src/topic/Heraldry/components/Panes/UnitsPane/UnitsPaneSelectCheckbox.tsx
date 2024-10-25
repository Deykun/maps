import { useFiltersDevelopmentStore } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconInputCheckEmpty from '@/components/Icons/IconInputCheckEmpty';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';

import ButtonIcon from '@/components/UI/ButtonIcon';

type Props = {
  wrapperClassName?: string,
  className?: string,
  unit: CoatOfArmsMapData,
  setSelectedPaneUnits: (units: CoatOfArmsMapData[]) => void,
  selectedPaneUnits: CoatOfArmsMapData[],
}

const UnitsPaneSelectCheckbox = ({ wrapperClassName, className, unit, setSelectedPaneUnits, selectedPaneUnits }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const isSelected = selectedPaneUnits.some(({ id }) => id === unit.id);

  const handleToggle = () => {
    if (isSelected) {
      setSelectedPaneUnits(selectedPaneUnits.filter(({ id }) => id !== unit.id));

      return;
    }

     setSelectedPaneUnits([...selectedPaneUnits, unit])
  }

  // Bull actions are only available in dev mode
  if (!isFiltersDevModeActive) {
    return null;
  }


  return (
    <ButtonIcon
      wrapperClassName={wrapperClassName}
      className={className}
      size="small"
      onClick={handleToggle}
      isActive={isSelected}
      label={isSelected ? 'Unselect' : 'Select'}
      labelPosition="left"
    >
      {isSelected ? <IconInputCheckFull /> : <IconInputCheckEmpty />}
    </ButtonIcon>
  );
};

export default UnitsPaneSelectCheckbox;
