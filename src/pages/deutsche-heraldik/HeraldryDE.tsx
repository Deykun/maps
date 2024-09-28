import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import SvgMap from './components/SvgMap'
;
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';

import CountryHeraldry from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldry';
import CountryHeraldryStatus from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldryStatus';

const fetchCountryData = async () => {
  const [
    // formerUnits,
    units,
  ] = await Promise.all([
    // fetch('/maps/data/heraldry/et/formerUnit-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/unit-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
  ]);

  const allUnits: AdministrativeUnit[] = Object.values([
    // ...Object.values(formerUnits) as AdministrativeUnit[],
    ...Object.values(units) as AdministrativeUnit[],
  ].filter((unit: AdministrativeUnit) => {
    // if ([
    //    'empty'
    // ].includes(unit.title)) {
    //   // Historic
    //   return false;
    // };

    if ([
      'empty'
    ].includes(unit.title)) {
      // Outside of country
      return false;
    }

    return true;
  }).reduce((stack: {
    [url: string]: AdministrativeUnit,
  }, unit: AdministrativeUnit) => {
    if (stack[unit.id]) {
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
      // const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
      // stack[unit.id].type = [...new Set(typeMerged)];
    } else {
      stack[unit.id] = unit;
    }

    return stack;
  }, {}));

  const typeFiltersList = getFilter(allUnits, 'type');
  const animalFiltersList = getFilter(allUnits, 'animals');
  const itemFiltersList = getFilter(allUnits, 'items');

  return {
    allUnits,
    typeFiltersList,
    animalFiltersList,
    itemFiltersList
  };
}


const HeraldryDE = () => {
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
    allUnits,
    typeFiltersList,
    animalFiltersList,
    itemFiltersList
  } = data;

  return (
    <CountryHeraldry
      lang="de"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
      mapWrapperClassName="[&>div>svg]:aspect-[594_/_803]"
      mapWrapperClassNameForZoom0="max-w-[40vh]"
      map={SvgMap}
      mapOffset={{
         minLatTop: 47.27,
         maxLatTop: 55.09,
         minLonLeft: 5.87,
         maxLonLeft: 15.04,
     }}
      initialFilters={initialFilters}
    />
  );
};

export default HeraldryDE;
