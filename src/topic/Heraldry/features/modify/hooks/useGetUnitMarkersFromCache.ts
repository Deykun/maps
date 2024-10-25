import { useMemo } from 'react';

import { queryClient } from '@/main';
import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import { mergeMarkersForUnit } from '@/topic/Heraldry/utils/markers/mergeMarkersForUnit';

export default function useGetUnitMarkersFromCache(unit: CoatOfArmsMapData){
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

  return {
    animals,
    items,
  };
};
