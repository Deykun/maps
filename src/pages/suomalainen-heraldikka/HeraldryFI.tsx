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
    formerKunta,
    kunta,
    maakunta,
  ] = await Promise.all([
    fetch('/maps/data/heraldry/fi/formerKunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/fi/kunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/fi/maakunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
  ]);

  const allUnits: AdministrativeUnit[] = Object.values([
    ...Object.values(formerKunta) as AdministrativeUnit[],
    ...Object.values(kunta) as AdministrativeUnit[],
    ...Object.values(maakunta) as AdministrativeUnit[],
  ].filter((unit: AdministrativeUnit) => {
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
    [url: string]: AdministrativeUnit,
  }, unit: AdministrativeUnit) => {
    if (stack[unit.url]) {
      const areImagesFilledAndDifferent = unit.image?.source && unit.image?.source !== stack[unit.url].image?.source;
      if (areImagesFilledAndDifferent) {
        if (location.href.includes('localhost')) {
          console.error({
            [unit.type?.join('') || 'a']: stack[unit.url].image?.source,
            [stack[unit.url].type?.join('') || 'b']: stack[unit.url].image?.source,
          })
          throw ('Duplicated but different images!')
        }
      }

      // It merges duplicates but keeps their type in array
      const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
      stack[unit.url].type = [...new Set(typeMerged)];
    } else {
      stack[unit.url] = unit;
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

const HeraldryFI = () => {
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
    queryKey: ['fi'],
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
      lang="fi"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
      mapWrapperClassName="aspect-[361_/_734]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 59.553,
        maxLatTop: 71.099,
        minLonLeft: 19.585,
        maxLonLeft: 30.585,
     }}
      initialFilters={initialFilters}
    />
  );
};

export default HeraldryFI;
