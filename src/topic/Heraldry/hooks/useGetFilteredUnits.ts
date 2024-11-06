import { useCallback, useEffect, useRef, useState } from 'react';


import useEffectChange from '@/hooks/useEffectChange';

import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
import { getSearchParamFromFilters } from '@/topic/Heraldry/utils/getSearchParams'
import { getFilteredUnits, GetFilteredUnitsParams, SubtitlePart } from '@/topic/Heraldry/utils/getFilteredUnits';


import { setUnitsPaneSearchPhrase } from '@/topic/Heraldry/stores/unitsPaneStore';
import useFiltersStore  from '@/topic/Heraldry/stores/filtersStore';

type UseGetFilteredUnitsParams = Omit<GetFilteredUnitsParams, 
  'colorFilters' | 'typeFilters' | 'shouldIgnoreFormer' | 'filterOperator' | 'shouldReverseFilters' | 'shouldHideMissingImages' | 'animalFilters' | 'itemFilters'
> & {
  typeFiltersList: GetFilterResponse
}

let postMemoCacheHash = '';

export default function useGetFilteredUnits({
  lang,
  unitsForMapAll,
  detailsForUnitsById,
  customFilter,
  brokenHashes,
  // Not passed to getFilteredUnits
  typeFiltersList,
}: UseGetFilteredUnitsParams) {
  const updateFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [response, setResponse] = useState<{
    units: CoatOfArmsMapData[];
    unitsForMap: CoatOfArmsMapData[];
    subtitleParts: SubtitlePart[]
  }>({
    units: [],
    unitsForMap: [],
    subtitleParts: [],
  });

  const {
    type: typeFilters,
    color: colorFilters,
    animal: animalFilters,
    item: itemFilters,
    filterOperator,
    shouldReverseFilters,
    shouldHideMissingImages,
    shouldIgnoreFormer,
  } = useFiltersStore();

  const filterHash = JSON.stringify({
    lang,
    unitsForMapAll, 
    detailsForUnitsById, 
    filterOperator, 
    shouldReverseFilters,
    shouldIgnoreFormer,
    customFilter,
    typeFilters,
    colorFilters,
    animalFilters,
    itemFilters,
    shouldHideMissingImages
  });

  const updateResponse = useCallback(() => {
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
      brokenHashes,
      shouldHideMissingImages,
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

    const cacheKey = filteredUnits.map(({ id }) => id).sort((a, b) => a.localeCompare(b)).join(',');

    if (postMemoCacheHash === cacheKey) {
      return;
    }

    postMemoCacheHash = cacheKey;
   
    setResponse({
      units: filteredUnits,
      unitsForMap,
      subtitleParts,
    })
  }, [filterHash]);

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    updateFilterTimeoutRef.current = setTimeout(() => {
      updateResponse();

      if (updateFilterTimeoutRef.current) {
        clearTimeout(updateFilterTimeoutRef.current);
        updateFilterTimeoutRef.current = null;
      }
    }, 5); /*
      This is just a proof of concept; it could be expanded further, and I could indicate changes using progressStore. However, that’s not necessary here. Leaving it as is avoids tying a large recalculation to changes in one checkbox, so updates happen instantly, and the calculation won't block the main thread this ms later, running asynchronously instead.
    */
  }, [filterHash]);

  useEffect(() => {
    updateResponse();
  }, []);

  return response;
}
