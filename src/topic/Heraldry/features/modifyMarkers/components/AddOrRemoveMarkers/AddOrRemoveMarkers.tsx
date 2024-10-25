import { useFiltersDevelopmentStore } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

import AddMarkers from './AddMarkers/AddMarkers';
import RemoveMarkers from './RemoveMarkers/RemoveMarkers';
import RemoveModifications from './RemoveModifications/RemoveModifications';

type Props = {
  unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkers = ({ unit }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <>  
      <RemoveMarkers unit={unit} />
      <AddMarkers unit={unit} />
      <RemoveModifications unit={unit} />
    </>
  );
};

export default AddOrRemoveMarkers;
