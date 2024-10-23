import { useMemo } from 'react';
import clsx from 'clsx';

import { queryClient } from '@/main';
import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconCrown from '@/components/Icons/IconCrown';

import UnitsPaneUnitMarkersList from './UnitsPaneUnitMarkersList';

import { mergeMarkersForUnit } from '@/topic/Heraldry/utils/markers/mergeMarkersForUnit';

type Props = {
  unit: CoatOfArmsMapData,
  shouldShowContentAsTooltip?: boolean,
}

const UnitsPaneUnitMarkers = ({ unit, shouldShowContentAsTooltip = false }: Props) => {
  const country = unit.lang;

  const data = queryClient.getQueryData([country, 'details']);

  const {
    animals,
    items,
  } = useMemo(() => {
    if (!data) {
      return {
        animals: [],
        items: [],
      }
    }

    const detailsForUnitsById = (data as {
      detailsForUnitsById: {
        [id: string]: CoatOfArmsDetailsData,
      }
    }).detailsForUnitsById;


    const animals = mergeMarkersForUnit(unit, detailsForUnitsById, 'animals');
    const items = mergeMarkersForUnit(unit, detailsForUnitsById, 'items');

    return {
      animals,
      items,
    }
  }, [data]);

  const hasContent = animals.length > 0 || items.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <p
      className={clsx(
        'flex flex-wrap justify-center gap-4',
        'text-[10px]',
        {
          'inline-flex text-ui-contrast': shouldShowContentAsTooltip,
          'flex text-ui-dark-contrast': !shouldShowContentAsTooltip,
        }
      )}
    >
      <UnitsPaneUnitMarkersList
        list={animals}
        listTitle="heraldry.animal.filterTitle"
        listElementPrefix="heraldry.animal"
        icon={IconAnimal}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
      <UnitsPaneUnitMarkersList
        list={items}
        listTitle="heraldry.item.filterTitle"
        listElementPrefix="heraldry.item"
        icon={IconCrown}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
      <UnitsPaneUnitMarkersList
        list={unit.type}
        listTitle="heraldry.unit.filterTitle"
        listElementPrefix={`heraldry.unit.type.${country}`}
        icon={IconBuilding}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
    </p>
  );
};

export default UnitsPaneUnitMarkers;
