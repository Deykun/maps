import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

/*
  Units with the same image and name are merged together.
  
  If a merged unit had a description that allowed for the detection of an animal, that information would be lost, but this function are keeping it.
*/

export const mergeMarkersForUnit = (
  unit: CoatOfArmsMapData,
  detailsForUnitsById: {
    [id: string]: CoatOfArmsDetailsData,
  },
  type: 'animals' | 'items',
) => {
  if (Array.isArray(unit.mergedIds) && unit.mergedIds.length > 0) {
    if (type === 'animals') {
      const merged = unit.mergedIds.reduce((stack: string[], id) => {
        return stack.concat(detailsForUnitsById?.[id]?.markers?.animals || []);
      }, []);

      return [...new Set([...merged, ...(detailsForUnitsById?.[unit.id]?.markers?.animals || [])])];
    }

    if (type === 'items') {
      const merged = unit.mergedIds.reduce((stack: string[], id) => {
        return stack.concat(detailsForUnitsById?.[id]?.markers?.items || []);
      }, []);

      return [...new Set([...merged, ...(detailsForUnitsById?.[unit.id]?.markers?.items || [])])];
    }
  }

  if (type === 'animals') {
    return detailsForUnitsById?.[unit.id]?.markers?.animals || [];
  }

  if (type === 'items') {
    return detailsForUnitsById?.[unit.id]?.markers?.items || [];
  }

  return []
}
