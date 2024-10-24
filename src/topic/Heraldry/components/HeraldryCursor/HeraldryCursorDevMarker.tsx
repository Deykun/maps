import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import {
  useFiltersDevelopmentStore,
  getIsMatchingManualMarker,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import './HeraldryCursor.scss';

type Props = {
  hovered: CoatOfArmsMapData[],
}

const HeraldryCursorDevMarker = ({ hovered }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude || [])
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include || []);

  if (!isFiltersDevModeActive || (filterExclude.length === 0 && filterInclude.length === 0)) {
    return null;
  }

  
  const excluded = hovered.filter((unit) => getIsMatchingManualMarker(filterExclude, unit));
  const included = hovered.filter((unit) => getIsMatchingManualMarker(filterInclude, unit));

  if (excluded.length === 0 && included.length === 0) {
    return null;
  }

  const devLabel = [
    included.length > 0 ? `+${included.length} ⛨` : '',
    excluded.length > 0 ? `-${excluded.length} ⛨` : '',
  ].filter(Boolean).join(' ').trim();
  
  return (
    <>
      {devLabel}
      {' | '}
    </>
  );
};

export default HeraldryCursorDevMarker;
