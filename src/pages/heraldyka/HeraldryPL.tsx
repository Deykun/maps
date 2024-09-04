import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
// import SvgMap from './components/SvgGmina';
import SvgMap from './components/SvgPowiaty';

import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';
import CountryHeraldry from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldry';
import CountryHeraldryStatus from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldryStatus';

const fetchCountryData = async () => {
  const [
    gminy,
    miasta,
    powiaty,
    wojewodztwa,
  ] = await Promise.all([
    fetch('/maps/data/heraldry/pl/gminy-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/pl/powiaty-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/pl/miasta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/pl/wojewodztwa-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
  ]);

  const allUnits: AdministrativeUnit[] = Object.values([
    ...Object.values(gminy) as AdministrativeUnit[],
    ...Object.values(powiaty) as AdministrativeUnit[],
    ...Object.values(miasta) as AdministrativeUnit[],
    ...Object.values(wojewodztwa) as AdministrativeUnit[],
  ].filter((unit: AdministrativeUnit) => {
    if ([
      'Herb Podgórza',
      'Herb gminy Janów (powiat częstochowski)',
      'Herb Nowego Bytomia',
      'Herb gminy Brudzew',
      'Herb gminy Ostrowice',
      'Herby miast Śląska Cieszyńskiego',
    ].includes(unit.title)) {
      // Historic
      return false;
    };

    if ([
      'Herb Trzyńca',
      'Herb Orłowej',
      'Herb Czeskiego Cieszyna',
    ].includes(unit.title)) {
      // Outside of Poland
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

const HeraldryPL = () => {
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
    queryKey: ['pl'],
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
      lang="pl"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
      mapWrapperClassName="aspect-[820_/_775]"
      map={SvgMap}
      initialFilters={initialFilters}
    />
  );
};

export default HeraldryPL;
