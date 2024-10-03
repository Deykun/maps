import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import SvgMap from './components/SvgMap'
;
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';

import CountryHeraldry from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldry';
import CountryHeraldryStatus from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldryStatus';

const SORT_ORDER: {
  [type: string]: number,
} = {
  gemeinde: 1000,
  city: 1500,
  markt: 500,
  kreis: 1800,
  bezirke: 500,
  marktgemeinde: 800,
  land: 2000,
  formerMarkt: 5,
  formerBezirke: 5,
  formerKreis: 8,
  formerCity: 15,
  formerGemeinde: 10, 
}

const getSortRankFromUnit = (unit: AdministrativeUnit) => {
  const values = (unit.type || []).map((v) => (SORT_ORDER[v] || 1)) || [0];

  return Math.max(...values);
};

const fetchCountryData = async () => {
  const [
    formerUnits0,
    formerUnits1,
    formerUnits2,
    formerUnits3,
    units0,
    units1,
    units2,
    units3,
  ] = await Promise.all([
    fetch('/maps/data/heraldry/de/formerUnit-0-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/formerUnit-1-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/formerUnit-2-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/formerUnit-3-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/unit-0-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/unit-1-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/unit-2-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    fetch('/maps/data/heraldry/de/unit-3-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
  ]);

  const allUnits: AdministrativeUnit[] = Object.values([
    ...Object.values(formerUnits0) as AdministrativeUnit[],
    ...Object.values(formerUnits1) as AdministrativeUnit[],
    ...Object.values(formerUnits2) as AdministrativeUnit[],
    ...Object.values(formerUnits3) as AdministrativeUnit[],
    ...Object.values(units0) as AdministrativeUnit[],
    ...Object.values(units1) as AdministrativeUnit[],
    ...Object.values(units2) as AdministrativeUnit[],
    ...Object.values(units3) as AdministrativeUnit[],
  ].reduce((stack: {
      [url: string]: AdministrativeUnit,
    }, unit: AdministrativeUnit) => {
      const uniqueId = unit?.image?.source;
      if (uniqueId) {
        if (stack[uniqueId]) {
          // It merges duplicates but keeps their type in array
          const typeMerged: string[] = [...(stack[uniqueId].type || []), ...(unit.type || [])];
          stack[uniqueId].type = [...new Set(typeMerged)];
        } else {
          stack[uniqueId] = unit;
        }
      }
  
      return stack;
    }, {})).sort((a, b) => getSortRankFromUnit(a) > getSortRankFromUnit(b) ? 1 : -1);

  const typeFiltersList = getFilter(allUnits, 'type').sort((a) => !a.value.startsWith('former') ? -1 : 1);
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
      mapWrapperClassName="[&>div>svg]:aspect-[461_/_623]"
      mapWrapperClassNameForZoom0="max-w-[40vh]"
      map={SvgMap}
      mapOffset={{
         minLatTop: 47.3,
         maxLatTop: 55.22,
         minLonLeft: 5.8,
         maxLonLeft: 15.1,
      }}
      initialFilters={initialFilters}
      developmentModeFiltersTypes={[
        'unit-0',
        'unit-1',
        'unit-2',
        'unit-3',
        'formerUnit-0',
        'formerUnit-1',
        'formerUnit-2',
        'formerUnit-3',
      ]}
    />
  );
};

export default HeraldryDE;
