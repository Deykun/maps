import {
  toggleAsCustomFilterExclude,
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconFlask from '@/components/Icons/IconFlask';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import ButtonText from '@/components/UI/ButtonText';

type Props = {
  unit: CoatOfArmsMapData,
}

const UnitsPaneUnitDescription = ({ unit }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <div>
      <h5 className="flex mt-4 gap-2 justify-center items-center mb-2 text-ui-dark-contrast">
        <IconFlask className="size-4 fill-current" />
        <span>Custom filter</span>
      </h5>
      <div className="flex gap-1 justify-center">
        <ButtonText
          size="small"
          onClick={() => toggleAsCustomFilterExclude(unit)}
          isActive={getIsMatchingManualMarker(filterExclude, unit)}
        >
          <IconMarkerMinus />
          <span>Exclude</span>
        </ButtonText>
        <ButtonText
          size="small"
          onClick={() => toggleAsCustomFilterInclude(unit)}
          isActive={getIsMatchingManualMarker(filterInclude, unit)}
        >
          <IconMarkerPlus />
          <span>Include</span>
        </ButtonText>
      </div>
    </div>
  );
};

export default UnitsPaneUnitDescription;
