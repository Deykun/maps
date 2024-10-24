import {
  useFiltersDevelopmentStore,
  bulkAddToFilterInclude,
  bulkAddToFilterExclude,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import IconCheck from '@/components/Icons/IconCheck';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import ButtonIcon from '@/components/UI/ButtonIcon';

type Props = {
  setSelectedPaneUnits: (units: CoatOfArmsMapData[]) => void,
  selectedPaneUnits: CoatOfArmsMapData[],
}

const UnitsPaneItemListSelectCheckbox = ({ setSelectedPaneUnits, selectedPaneUnits }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude || []);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include || []);

  if (!isFiltersDevModeActive) {
    return null;
  }

  const hasSelected = selectedPaneUnits.length > 0;
  const hasExclude = filterExclude.length > 0;
  const hasInclude = filterInclude.length > 0;

  const areAllExcludeActive = hasSelected && hasExclude && selectedPaneUnits.every((unit) => getIsMatchingManualMarker(filterExclude, unit));
  const areAllIncludeActive = hasSelected && hasInclude && selectedPaneUnits.every((unit) => getIsMatchingManualMarker(filterInclude, unit));

  return (
    <>
      <span className="border-l--panel"></span>
      <ButtonIcon
        size="small"
        onClick={() => setSelectedPaneUnits([])}
        isDisabled={!hasSelected}
        label={`Unselect`}
        labelPosition="bottomRight"
      >
        <IconInputCheckFull />
        {selectedPaneUnits.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--small ui-button-icon-marker--on-soft">{selectedPaneUnits.length}</span>}
      </ButtonIcon>
      <ButtonIcon
        size="small"
        onClick={() => bulkAddToFilterExclude(selectedPaneUnits)}
        isActive={areAllExcludeActive}
        isDisabled={!hasSelected}
        label={`Exclude in the custom filter`}
        labelPosition="bottom"
      >
        <IconMarkerMinus />
        {areAllExcludeActive && <span className="ui-button-icon-marker ui-button-icon-marker--small ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
      </ButtonIcon>
      <ButtonIcon
        size="small"
        onClick={() => bulkAddToFilterInclude(selectedPaneUnits)}
        isActive={areAllIncludeActive}
        isDisabled={!hasSelected}
        label={`Include in the custom filter`}
        labelPosition="bottom"
      >
        <IconMarkerPlus />
        {areAllIncludeActive && <span className="ui-button-icon-marker ui-button-icon-marker--small ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
      </ButtonIcon>
    </>
  );
};

export default UnitsPaneItemListSelectCheckbox;
