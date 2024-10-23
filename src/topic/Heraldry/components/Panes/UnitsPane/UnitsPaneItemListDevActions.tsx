import {
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import ButtonIcon from '@/components/UI/ButtonIcon';

type Props = {
  unit: CoatOfArmsMapData,
}

const UnitsPaneItemListDevActions = ({ unit }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  // const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <ButtonIcon
      size="small"
      onClick={() => toggleAsCustomFilterInclude(unit)}
      isActive={getIsMatchingManualMarker(filterInclude, unit)}
      label="Include"
      labelPosition="left"
    >
      <IconMarkerPlus />
    </ButtonIcon>
  );
};

export default UnitsPaneItemListDevActions;
