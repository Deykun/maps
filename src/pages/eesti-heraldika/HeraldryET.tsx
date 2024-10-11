import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SvgMap from './components/SvgMap'
;
import { CoatOfArmsMapData, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';
import { getFiltersFromSearchParams } from '@/topic/Heraldry/utils/getSearchParams';
import { getFilter } from '@/topic/Heraldry/utils/getFilter';

import CountryHeraldry from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldry';
import CountryHeraldryStatus from '@/topic/Heraldry/components/CountryHeraldry/CountryHeraldryStatus';

const dataPaths = [
  '/maps/data/heraldry/et/formerUnit',
  '/maps/data/heraldry/et/unit',
]

const fetchCountryData = async () => {
  const promiseArray = dataPaths.map(
    (path) => fetch(`${path}-map-data.json`).then((resposne) => resposne.json()),
  );
  const resposne = await Promise.all(promiseArray);
  const resposneAll = resposne.flatMap(v => v) as CoatOfArmsMapData[];

  const unitsForMapAll: CoatOfArmsMapData[] = Object.values(
    resposneAll.filter((unit: CoatOfArmsMapData) => {
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
      if (stack[unit.id]) {
        // It merges duplicates but keeps their type in array
        const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
        stack[unit.id].type = [...new Set(typeMerged)];
      } else {
        stack[unit.id] = unit;
      }

      return stack;
    }, {}),
  );
  
  const typeFiltersList = getFilter(unitsForMapAll, 'type');

  return {
    unitsForMapAll,
    typeFiltersList,
  };
}

const fetchCountryDetailsData = async () => {
  const promiseArray = dataPaths.map(
    (path) => fetch(`${path}-details-data.json`).then((resposne) => resposne.json()),
  );
  const resposne = await Promise.all(promiseArray);
  const resposneAll = resposne.flatMap(v => v) as CoatOfArmsDetailsData[];

  console.log('resposneAll', resposneAll);

  // const detailsForUnitsById = Object.values(response).reduce((stack, item) => {
  //   stack[item.id] = item;

  //   console.log(stack);
  // }, {});

  // const unitsForDetailsAll = Object.values(detailsForUnitsById);

  // console.log('unitsForDetailsAll', unitsForDetailsAll);

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
    data: dataForMap,
  } = useQuery({
    queryFn: () => fetchCountryData(),
    queryKey: ['et', 'map'],
  });

  const {
    data: dataForDetails,
  } = useQuery({
    queryFn: () => fetchCountryDetailsData(),
    queryKey: ['et', 'details'],
    staleTime: 60 * 60 * 1000,
    enabled: shouldFetchDetails,
  });

  if (isError) {
    console.error(error);

    return <CountryHeraldryStatus text="Oops... There was an error while fetching data." />
  }
  
  if (isLoading) {
    return <CountryHeraldryStatus text="Gathering map data..." />
  }

  if (!dataForMap) {
    return <CountryHeraldryStatus text="Oops... There was an error while fetching data." />
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
    <CountryHeraldry
      lang="et"
      unitsForMapAll={unitsForMapAll}
      detailsForUnitsById={detailsForUnitsById}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
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
