import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
;
import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';

import {
  updateTotalsForTexts,
  updateValueForTexts,
  updateProcessingTexts,
  updateTotalsForFilters,
  updateValueForFilters,
} from '@/topic/Heraldry/stores/progressStore';

import HeraldryMapContainerWithUI, { Props as HeraldryMapContainerWithUIProps } from '@/topic/Heraldry/components/HeraldryMapContainerWithUI/HeraldryMapContainerWithUI';

import HeraldryProgressStatus from '@/topic/Heraldry/components/HeraldryProgressbar/HeraldryProgressStatus';

type FetchParams = {
  dataPaths: string[],
  filterForCountryData?: (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => CoatOfArmsMapData[],
  sortForCountryData?: (a: CoatOfArmsMapData, b: CoatOfArmsMapData) => number,
}

const fetchCountryData = async ({ dataPaths, filterForCountryData, sortForCountryData }: FetchParams) => {
  updateTotalsForTexts(dataPaths);

  const promiseArray = dataPaths.map(
    (path) => fetch(`${path}-map-data.json`).then((resposne) => {
      return resposne.json()
    }).then((value) => {
      updateValueForTexts(path);

      return value;
    }),
  );
  const resposne = await Promise.all(promiseArray);
  const resposneAll = resposne.flatMap(v => v) as CoatOfArmsMapData[];

  const updateLoaderIn = [
    filterForCountryData ? 'updateLoaderInFilter' : '',
    'updateLoaderInIndex',
  ].filter(Boolean)[0];

  let unitsForMapAll: CoatOfArmsMapData[] = Object.values(
    resposneAll.reduce((stack: {
      [url: string]: CoatOfArmsMapData,
    }, unit: CoatOfArmsMapData, index) => {
      const uniqueId = unit?.imagesList?.[0]?.path?.split('/').at(-1);

      if (uniqueId) {
        if (stack[uniqueId]) {
          // It merges duplicates but keeps their type in array
          const typeMerged: string[] = [...(stack[uniqueId].type || []), ...(unit.type || [])];
          stack[uniqueId].type = [...new Set(typeMerged)];
          stack[uniqueId].mergedIds = Array.isArray(stack[uniqueId]?.mergedIds) ? [...(stack[uniqueId].mergedIds as string[]), unit.id] : [unit.id];
        } else {
          stack[uniqueId] = unit;
        }
      }

      if (updateLoaderIn === 'updateLoaderInIndex' && index % 10) {
        updateProcessingTexts({ value: index, total: resposneAll.length });
      }

      return stack;
    }, {}),
  );

  if (filterForCountryData) {
    // Filter from the parent
    unitsForMapAll = filterForCountryData(unitsForMapAll, updateLoaderIn === 'updateLoaderInFilter');
  }

  if (sortForCountryData) {
    // Sort from the parent
    unitsForMapAll = unitsForMapAll.sort(sortForCountryData);
  }

  updateProcessingTexts({ value: unitsForMapAll.length, total: unitsForMapAll.length });
  
  const typeFiltersList = getFilter(unitsForMapAll, 'type');

  return {
    unitsForMapAll,
    typeFiltersList,
  };
};

const fetchCountryDetailsData = async ({ dataPaths }: FetchParams) => {
  updateTotalsForFilters(dataPaths);

  const promiseArray = dataPaths.map(
    (path) => fetch(`${path}-details-data.json`).then((resposne) => resposne.json()).then((value) => {
      updateValueForFilters(path);

      return value;
    }),
  );
  const resposne = await Promise.all(promiseArray);
  const resposneAll = resposne.flatMap(v => v) as CoatOfArmsDetailsData[];

  const animalFiltersList = getFilter(resposneAll, 'animals');
  const itemFiltersList = getFilter(resposneAll, 'items');

  const detailsForUnitsById = resposneAll.reduce((stack: {
    [id: string]: CoatOfArmsDetailsData,
  }, item) => {
    stack[item.id] = item;

    return stack;
  }, {});

  return {
    detailsForUnitsById,
    animalFiltersList,
    itemFiltersList
  };
};

type Props = FetchParams & Pick<
  HeraldryMapContainerWithUIProps,
  "lang" | "map" | "mapWrapperClassName" | "mapWrapperClassNameForZoom0" | "mapOffset" | "developmentModeFiltersTypes"
>;

const HeraldryMapMap = ({
  lang,
  mapWrapperClassName,
  mapWrapperClassNameForZoom0,
  map: Map,
  mapOffset,
  developmentModeFiltersTypes,
  dataPaths,
  filterForCountryData,
  sortForCountryData,
}: Props) => {
  const [shouldFetchDetails, setShouldFetchDetails] = useState(false);

  const initialFilters = useMemo(() => {
    return getFiltersFromSearchParams();
  }, []);

  const {
    isLoading,
    isError,
    error,
    data: dataForMap,
  } = useQuery({
    queryFn: () => fetchCountryData({ dataPaths, filterForCountryData, sortForCountryData }),
    queryKey: [lang, 'map'],
  });

  const {
    isLoading: isFetchingDetails,
    data: dataForDetails,
  } = useQuery({
    queryFn: () => fetchCountryDetailsData({ dataPaths }),
    queryKey: [lang, 'details'],
    staleTime: 60 * 60 * 1000,
    enabled: shouldFetchDetails,
  });

  if (isError) {
    console.error(error);

    return <HeraldryProgressStatus message="heraldry.loading.error" />
  }
  
  // if (isLoading) {
    return <HeraldryProgressStatus country={lang} message="heraldry.loading.fetching" isLoading />
  // }

  if (!dataForMap) {
    return <HeraldryProgressStatus message="heraldry.loading.error" />
  }

  const {
    unitsForMapAll,
    typeFiltersList,
  } = dataForMap;

  const {
    detailsForUnitsById = {},
    animalFiltersList = [],
    itemFiltersList = [],
  } = dataForDetails || {};

  return (
    <HeraldryMapContainerWithUI
      lang={lang}
      unitsForMapAll={unitsForMapAll}
      detailsForUnitsById={detailsForUnitsById}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
      mapWrapperClassName={mapWrapperClassName}
      mapWrapperClassNameForZoom0={mapWrapperClassNameForZoom0}
      map={Map}
      initialFilters={initialFilters}
      mapOffset={mapOffset}
      developmentModeFiltersTypes={developmentModeFiltersTypes}
      setShouldFetchDetails={setShouldFetchDetails}
      isFetchingDetails={isFetchingDetails}
    />
  );
};

export default HeraldryMapMap;
