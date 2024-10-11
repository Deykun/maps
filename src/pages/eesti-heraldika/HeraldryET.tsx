import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SvgMap from './components/SvgMap'
;
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';

import CountryHeraldry from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldry';
import CountryHeraldryStatus from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldryStatus';

const fetchCountryData = async () => {
  const [
    formerUnits,
    units,
  ] = await Promise.all([
    fetch('/maps/data/heraldry/et/formerUnit-map-data.json').then((response) => response.json()),
    fetch('/maps/data/heraldry/et/unit-map-data.json').then((response) => response.json()),
  ]);

  const allUnitsForMap: CoatOfArmsMapData[] = Object.values([
    ...formerUnits as CoatOfArmsMapData[],
    ...units as CoatOfArmsMapData[],
  ].filter((unit: CoatOfArmsMapData) => {
    // if ([
    //    'empty'
    // ].includes(unit.title)) {
    //   // Historic
    //   return false;
    // };

    if ([
      'Viipurin vaakuna'
    ].includes(unit.title)) {
      // Outside of country
      return false;
    }

    return true;
  }).reduce((stack: {
    [url: string]: CoatOfArmsMapData,
  }, unit: CoatOfArmsMapData) => {
    if (stack[unit.url]) {
      // const areImagesFilledAndDifferent = unit.image?.source && unit.image?.source !== stack[unit.url].image?.source;
      // if (areImagesFilledAndDifferent) {
      //   if (location.href.includes('localhost')) {
      //     console.error({
      //       [unit.type?.join('') || 'a']: stack[unit.url].image?.source,
      //       [stack[unit.url].type?.join('') || 'b']: stack[unit.url].image?.source,
      //     })
      //     throw ('Duplicated but different images!')
      //   }
      // }

      // It merges duplicates but keeps their type in array
      const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
      stack[unit.url].type = [...new Set(typeMerged)];
    } else {
      stack[unit.url] = unit;
    }

    return stack;
  }, {}));

  // const typeFiltersList = getFilter(mapUnits, 'type');
  // const animalFiltersList = getFilter(mapUnits, 'animals');
  // const itemFiltersList = getFilter(mapUnits, 'items');

  return {
    allUnitsForMap,
    // typeFiltersList,
    // animalFiltersList,
    // itemFiltersList
  };
}

const fetchCountryDetailsData = async () => {
  const [
    formerUnits,
    units,
  ] = await Promise.all([
    fetch('/maps/data/heraldry/et/formerUnit-map-data.json').then((response) => response.json()),
    fetch('/maps/data/heraldry/et/unit-map-data.json').then((response) => response.json()),
  ]);

  const allUnitsForMap: CoatOfArmsMapData[] = Object.values([
    ...formerUnits as CoatOfArmsMapData[],
    ...units as CoatOfArmsMapData[],
  ].filter((unit: CoatOfArmsMapData) => {
    // if ([
    //    'empty'
    // ].includes(unit.title)) {
    //   // Historic
    //   return false;
    // };

    if ([
      'Viipurin vaakuna'
    ].includes(unit.title)) {
      // Outside of country
      return false;
    }

    return true;
  }).reduce((stack: {
    [url: string]: CoatOfArmsMapData,
  }, unit: CoatOfArmsMapData) => {
    if (stack[unit.url]) {
      // const areImagesFilledAndDifferent = unit.image?.source && unit.image?.source !== stack[unit.url].image?.source;
      // if (areImagesFilledAndDifferent) {
      //   if (location.href.includes('localhost')) {
      //     console.error({
      //       [unit.type?.join('') || 'a']: stack[unit.url].image?.source,
      //       [stack[unit.url].type?.join('') || 'b']: stack[unit.url].image?.source,
      //     })
      //     throw ('Duplicated but different images!')
      //   }
      // }

      // It merges duplicates but keeps their type in array
      const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
      stack[unit.url].type = [...new Set(typeMerged)];
    } else {
      stack[unit.url] = unit;
    }

    return stack;
  }, {}));

  // const typeFiltersList = getFilter(mapUnits, 'type');
  // const animalFiltersList = getFilter(mapUnits, 'animals');
  // const itemFiltersList = getFilter(mapUnits, 'items');

  return {
    allUnitsForMap,
    // typeFiltersList,
    // animalFiltersList,
    // itemFiltersList
  };
}

const HeraldryET = () => {
  const [shouldFetchDetails, setShouldFetchDetails] = useState(false);

  const initialFilters = useMemo(() => {
    return getFiltersFromSearchParams();
  }, []);

  const {
    isLoading,
    isError,
    error,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchCountryData(),
    queryKey: ['et'],
  });

  if (isError) {
    console.error(error);

    return <CountryHeraldryStatus text="Oops... There was an error while fetching data." />
  }
  
  if (isLoading) {
    return <CountryHeraldryStatus text="Gathering map data..." />
  }

  if (!data) {
    return <CountryHeraldryStatus text="Oops... There was an error while fetching data." />
  }

  const {
    allUnitsForMap,
    // typeFiltersList,
    // animalFiltersList,
    // itemFiltersList
  } = data;

  return (
    <CountryHeraldry
      lang="et"
      allUnitsForMap={allUnitsForMap}
      // typeFiltersList={typeFiltersList}
      // animalFiltersList={animalFiltersList}
      // itemFiltersList={itemFiltersList}

      typeFiltersList={[]}
      animalFiltersList={[]}
      itemFiltersList={[]}
      mapWrapperClassName="[&>div>svg]:aspect-[707_/_509]"
      mapWrapperClassNameForZoom0="max-w-[70vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 57.43,
        maxLatTop: 59.97,
        minLonLeft: 21.46,
        maxLonLeft: 28.45,
      }}
      initialFilters={initialFilters}
      setShouldFetchDetails={setShouldFetchDetails}
    />
  );
};

export default HeraldryET;
