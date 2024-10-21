import { useMemo } from 'react';
import clsx from 'clsx';

import { queryClient } from '@/main';
import { CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconBuilding from '@/components/Icons/IconBuilding';
import IconCrown from '@/components/Icons/IconCrown';

import UnitsPaneUnitMarkersList from './UnitsPaneUnitMarkersList';

type Props = {
  id: string,
  country: string,
  types?: string[],
  shouldShowContentAsTooltip?: boolean,
}

const UnitsPaneUnitMarkers = ({ id, country, types = [], shouldShowContentAsTooltip = false }: Props) => {
  const data = queryClient.getQueryData([country, 'details']);

  const details = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const unitDetails = (data as {
      detailsForUnitsById: {
        [id: string]: CoatOfArmsDetailsData,
      }
    }).detailsForUnitsById?.[id];

    if (unitDetails) {
      return unitDetails;
    }

    return undefined;
  }, [data]);

  const hasContent = (details?.markers?.animals?.length || 0) > 0 || (details?.markers?.items?.length || 0) || types.length > 0;

  if (!hasContent) {
    return null;
  }

  const animals = details?.markers?.animals || [];
  const items = details?.markers?.items || [];

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
        list={types}
        listTitle="heraldry.unit.filterTitle"
        listElementPrefix={`heraldry.unit.type.${country}`}
        icon={IconBuilding}
        shouldShowContentAsTooltip={shouldShowContentAsTooltip}
      />
    </p>
  );
};

export default UnitsPaneUnitMarkers;
