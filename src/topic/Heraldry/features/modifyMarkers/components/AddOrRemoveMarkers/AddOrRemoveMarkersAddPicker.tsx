import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkerType } from '@/topic/Heraldry/types';

import IconLoader from '@/components/Icons/IconLoader';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import ButtonText from '@/components/UI/ButtonText';

import useQueryFiltersSeeds from '@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds';

type Props = {
  country: string,
  markerType: MarkerType,
}

const AddOrRemoveMarkersAddPicker = ({ country, markerType }: Props) => {
  const [pickedItem, setPickedItem] = useState('');
  const { t } = useTranslation();

  const {
    isLoading,
    data,
  } = useQueryFiltersSeeds({ country });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setPickedItem(value);

  }, [data]);

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
      <ButtonText size="small">
        {markerType === 'animal' ? <IconAnimal animals={pickedItem ? [pickedItem] : []} /> : <IconCrown />}
        <span className="flex-shrink-0 lowercase whitespace-nowrap">+ {t(pickedItem ? `heraldry.${markerType}.${pickedItem}` : `heraldry.${markerType}.filterTitle`)}</span>
      </ButtonText>
    </>
  );
};

export default AddOrRemoveMarkersAddPicker;

/*

<select
disabled={isLoading}
onChange={handleClick}
className="block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-[8px] py-2 px-4"
>
<option>Pick filter</option>
{data && <>
  {data.animals.sort((a, b) => 
    `${t(`heraldry.animal.${a.name}`)}`.localeCompare(
      `${t(`heraldry.animal.${b.name}`)}`
  )).map(({ name }, index) => (
    <option
      key={name}
      value={`animal-${index}`}
    >
      {t('heraldry.animal.filterTitle')}: {t(`heraldry.animal.${name}`)}
    </option>
  ))}
  {data.items.sort((a, b) => 
    `${t(`heraldry.item.${a.name}`)}`.localeCompare(
      `${t(`heraldry.item.${b.name}`)}`
  )).map(({ name }, index) => (
    <option
      key={name}
      value={`item-${index}`}
    >
      {t('heraldry.item.filterTitle')}: {t(`heraldry.item.${name}`)}
    </option>
  ))}
</>}
</select>
*/