import { useState } from 'react';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';


import ButtonText from '@/components/UI/ButtonText';

import UnitsPaneUnitDescriptionContent from './UnitsPaneUnitDescriptionContent';

type Props = {
  id: string,
  country: string,
  mergedIds?: string[],
}

const UnitsPaneUnitDescription = ({ id, country, mergedIds = [] }: Props) => {
  const [idPicked, setIdPicked] = useState(id);
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  if (!isFiltersDevModeActive) {
    return null;
  }

  return (
    <div>
      <UnitsPaneUnitDescriptionContent id={idPicked} country={country} shouldShowUnitTitle={idPicked !== id} />
      {mergedIds.length > 0 && <div>

        {[id, ...mergedIds].map((subId) => <ButtonText
          size="small"
          key={subId}
          isActive={subId === idPicked}
          onClick={() => setIdPicked(subId)}>
            <span>{subId}</span>
        </ButtonText>)}
      </div>}
    </div>
  );
};

export default UnitsPaneUnitDescription;
