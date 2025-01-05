import { useMemo } from 'react';

import queryClient from '@/providers/utils/queryClient';
import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import { mergeMarkersForUnit } from '@/topic/Heraldry/utils/markers/mergeMarkersForUnit';

export default function useGetUnitMarkersFromCache(unit: CoatOfArmsMapData, country: string) {
  const data = queryClient.getQueryData(['details', country]);
  const data2 = queryClient.getQueryData(['dev', country]);

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
  }, [data, unit.id]);

  return {
    animals,
    items,
  };
};
