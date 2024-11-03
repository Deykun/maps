import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData, MarkerType } from '@/topic/Heraldry/types';

import { removeDiacratics } from '@/utils/text';

import IconLoader from '@/components/Icons/IconLoader';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

import { includeUnitInMarker } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';
import useGetUnitMarkersFromCache from '@/topic/Heraldry/features/modify/hooks/useGetUnitMarkersFromCache';

import useQueryFiltersSeeds from '@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds';
import { useMemo, useState } from 'react';

type Props = {
  unit: CoatOfArmsMapData,
  markerType: MarkerType,
}

const AddOrRemoveMarkersAddPicker = ({ unit, markerType }: Props) => {
  const {
    animals,
    items,
  } = useGetUnitMarkersFromCache(unit)
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const {
    isLoading,
    data,
  } = useQueryFiltersSeeds({ country: unit.lang });

  const options = useMemo(() => {
    if (!data) {
      return [];
    }
    
    const keyForType: 'animals' | 'items' = `${markerType}s`;

    const phraseToCheck = removeDiacratics(inputValue.toLowerCase());

    return (data[keyForType] || []).filter(({ name }) =>
      removeDiacratics(t(`heraldry.${markerType}.${name}`).toLowerCase()).includes(phraseToCheck)
      || name.includes(phraseToCheck) // searching by marker codename
    ).sort((a, b) => 
      `${t(`heraldry.${markerType}.${a.name}`)}`.localeCompare(`${t(`heraldry.${markerType}.${b.name}`)}`)
    );
  }, [data, markerType, inputValue])

  if (isLoading) {
    return (
        <IconLoader className="size-5 fill-white mx-auto" />
    )
  }

  if (!data) {
    return <p>Filters' seed not found.</p>;
  }


  return (
    <>  
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value || '')}
        className="block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-full py-1 px-4"
        placeholder={t('heraldry.list.limitListToPlaceholder')}
        autoFocus
      />
      {options.map(({ name }) => (<ButtonText
        key={name}
        size="small"
        onClick={() => includeUnitInMarker(unit, markerType, name)}
        isActive={markerType === 'animal' ? animals.includes(name) : items.includes(name)}
        isDisabled={markerType === 'animal' ? animals.includes(name) : items.includes(name)}
      >
        {markerType === 'animal' ? <IconAnimal animals={name ? [name] : []} /> : <IconCrown />}
        <span className="flex-shrink-0 lowercase whitespace-nowrap">
          + {t(`heraldry.${markerType}.${name}`)}
        </span>
      </ButtonText>))}
    </>
  );
};

export default AddOrRemoveMarkersAddPicker;
