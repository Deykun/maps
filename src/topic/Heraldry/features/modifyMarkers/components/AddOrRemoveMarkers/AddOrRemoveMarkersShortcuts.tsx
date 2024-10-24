import { useTranslation } from 'react-i18next';
// import {
//   toggleAsCustomFilterExclude,
//   toggleAsCustomFilterInclude,
//   useFiltersDevelopmentStore,
//   getIsMatchingManualMarker,
// } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

// import { CoatOfArmsMapData } from '@/topic/Heraldry/types';


import IconAnimal from '@/components/Icons/IconAnimal';
// import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';


type Props = {
  // unit: CoatOfArmsMapData,
}

const AddOrRemoveMarkersShortcuts = ({}) => {
  const { t } = useTranslation();

  // TODO: add logic to return list of last or most popular user action in this section
  return (
    <>
      {['lion', 'eagle', 'bullBison'].map((animal) => 
        <ButtonText
          size="small"
          // onClick={() => toggleAsCustomFilterExclude(unit)}
        >
          <IconAnimal animals={[animal]} />
          <span>+ {t(`heraldry.animal.${animal}`)}</span>
        </ButtonText>
      )}
    </>
  );
};

export default AddOrRemoveMarkersShortcuts;
