import { useMemo } from 'react';
import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
import { getSearchParamFromFilters } from '@/topic/Heraldry/utils/getSearchParams'
import { getFilteredUnits, GetFilteredUnitsParams } from '@/topic/Heraldry/utils/getFilteredUnits';

import { setUnitsPaneSearchPhrase } from '@/topic/Heraldry/stores/unitsPaneStore';
import useFiltersStore  from '@/topic/Heraldry/stores/filtersStore';

type UseGetFilteredUnitsParams = Omit<GetFilteredUnitsParams, 
'colorFilters' | 'typeFilters' | 'shouldIgnoreFormer' | 'filterOperator' | 'shouldReverseFilters'
> & {
  typeFiltersList: GetFilterResponse
}

export default function useGetFilteredUnits({
  lang,
  unitsForMapAll,
  detailsForUnitsById,
  customFilter,
  animalFilters,
  itemFilters,
  // Not passed to getFilteredUnits
  typeFiltersList,
}: UseGetFilteredUnitsParams) {
  const shouldIgnoreFormer = useFiltersStore(state => state.shouldIgnoreFormer);
  const typeFilters = useFiltersStore(state => state.type);
  const colorFilters = useFiltersStore(state => state.color);
  const filterOperator = useFiltersStore(state => state.filterOperator);
  const shouldReverseFilters = useFiltersStore(state => state.shouldReverseFilters);

  const { units, unitsForMap, subtitleParts } = useMemo(() => {
    // All types are checked and we can skip setting subtitle and filtering
    const typeFiltersToPass = typeFilters.length === typeFiltersList.length ? [] : typeFilters;

    const {
      filteredUnits,
      unitsForMap,
      subtitleParts,
    } = getFilteredUnits({
      lang,
      unitsForMapAll,
      detailsForUnitsById,
      filterOperator,
      shouldReverseFilters,
      shouldIgnoreFormer,
      customFilter,
      typeFilters: typeFiltersToPass,
      colorFilters,
      animalFilters,
      itemFilters,
    });

    setUnitsPaneSearchPhrase('');

    const searchParams = getSearchParamFromFilters({
      filterOperator, shouldReverseFilters, shouldIgnoreFormer, typeFilters: typeFiltersToPass, colorFilters, animalFilters, itemFilters,
    })
    
    window.history.replaceState(undefined, '', `${location.pathname}${searchParams}`);
    
    return {
      units: filteredUnits,
      unitsForMap,
      subtitleParts,
    }
  }, [lang, unitsForMapAll, detailsForUnitsById, filterOperator, shouldReverseFilters, shouldIgnoreFormer, customFilter, typeFilters, colorFilters, animalFilters, itemFilters]);


  return {
    units,
    unitsForMap,
    subtitleParts,
  };
}
