import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CoatOfArmsMapData, MarkerType } from '@/topic/Heraldry/types';

import IconLoader from '@/components/Icons/IconLoader';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

import useQueryFiltersSeeds from '@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds';

import { includeUnitInMarker, excludeUnitFromMarker, removeFromIncludeAndExcludeInMarker } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

type Props = {
  unit: CoatOfArmsMapData,
  markerType: MarkerType,
}

const AddOrRemoveMarkersAddPicker = ({ unit, markerType }: Props) => {
  const [pickedItem, setPickedItem] = useState('');
  const { t } = useTranslation();

  const {
    isLoading,
    data,
  } = useQueryFiltersSeeds({ country: unit.lang });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setPickedItem(value);

  }, [data]);

  const handleApply = () => {
    if (pickedItem) {
      includeUnitInMarker(unit, markerType, pickedItem);
    }
  }

  if (isLoading) {
    return (
        <IconLoader className="size-5 fill-white" />
    )
  }

  if (!data) {
    return <p>Filters' seed not found.</p>;
  }

  const keyForType: 'animals' | 'items' = `${markerType}s`;

  const options = (data[keyForType] || []).sort((a, b) => 
    `${t(`heraldry.animal.${a.name}`)}`.localeCompare(
      `${t(`heraldry.animal.${b.name}`)}`
  ));

  return (
    <>
      <select
        className="w-full bg-ui-dark rounded-[4px] h-[24px] px-3 text-[12px]"
        onChange={handleChange}
      >
        <option value="">Pick</option>
        {options.map(({ name }) => <option
          key={name}
          value={name}
        >
          {t(`heraldry.${markerType}.${name}`)}
        </option>)}
      </select>
      <ButtonText
        size="small"
        isDisabled={!pickedItem}
        onClick={handleApply}
      >
        {markerType === 'animal' ? <IconAnimal animals={pickedItem ? [pickedItem] : []} /> : <IconCrown />}
        <span className="flex-shrink-0 lowercase whitespace-nowrap">+ {t(pickedItem ? `heraldry.${markerType}.${pickedItem}` : `heraldry.${markerType}.filterTitle`)}</span>
      </ButtonText>
    </>
  );
};

export default AddOrRemoveMarkersAddPicker;
