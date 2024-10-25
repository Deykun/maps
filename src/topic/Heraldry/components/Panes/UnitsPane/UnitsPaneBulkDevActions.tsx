import {
  useFiltersDevelopmentStore,
  bulkAddToFilterInclude,
  bulkAddToFilterExclude,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import IconCheck from '@/components/Icons/IconCheck';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import ButtonIcon from '@/components/UI/ButtonIcon';

import useUnitsPaneStore, { setSelected } from '@/topic/Heraldry/stores/unitsPaneStore';

const UnitsPaneBulkDevActions = () => {
  const selected = useUnitsPaneStore(state => state.selected);
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude || []);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include || []);

  if (!isFiltersDevModeActive) {
    return null;
  }

  const hasSelected = selected.length > 0;
  const hasExclude = filterExclude.length > 0;
  const hasInclude = filterInclude.length > 0;

  const areAllExcludeActive = hasSelected && hasExclude && selected.every((unit) => getIsMatchingManualMarker(filterExclude, unit));
  const areAllIncludeActive = hasSelected && hasInclude && selected.every((unit) => getIsMatchingManualMarker(filterInclude, unit));

  return (
    <>
      <span className="border-l--panel"></span>
      <ButtonIcon
        size="small"
        onClick={() => setSelected([])}
        isDisabled={!hasSelected}
        label={`Unselect`}
        labelPosition="bottomRight"
      >
        <IconInputCheckFull />
        {selected.length > 0 && <span className="ui-button-icon-marker ui-button-icon-marker--small ui-button-icon-marker--on-soft">{selected.length}</span>}
      </ButtonIcon>
      <ButtonIcon
        size="small"
        onClick={() => bulkAddToFilterExclude(selected)}
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
        onClick={() => bulkAddToFilterInclude(selected)}
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

export default UnitsPaneBulkDevActions;
