import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';

import useUnitsPaneStore from '@/topic/Heraldry/stores/unitsPaneStore';

import './HeraldryCursor.scss';

type Props = {
  hovered: CoatOfArmsMapData[],
}

const HeraldryCursorDevMarker = ({ hovered }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const selected = useUnitsPaneStore(state => state.selected);

  if (!isFiltersDevModeActive || selected.length === 0) {
    return null;
  }

  const selectedAndHovered = selected.filter(({ id: selectedId }) => hovered.some(({ id: hoveredId }) => selectedId === hoveredId))

  if (selectedAndHovered.length === 0) {
    return null
  }
  
  return (
    <>
      <IconInputCheckFull className="inline-block size-2 mt-[-1px] mr-1 fill-white" />
      {selectedAndHovered.length < hovered.length &&<span>      
        {selectedAndHovered.length}/
      </span>}
    </>
  );
};

export default HeraldryCursorDevMarker;
