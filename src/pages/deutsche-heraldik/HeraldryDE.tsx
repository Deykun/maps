import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryRegion from '@/topic/Heraldry/components/HeraldryRegion/HeraldryRegion';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  return units.filter((unit: CoatOfArmsMapData) => {
    if ([
      'empty'
    ].includes(unit.title)) {
      // Historic
      return false;
    };

    if ([
      'Kanton Tessin'
    ].includes(unit.title)) {
      // Outside of country
      return false;
    }

    return true;
  });
};

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

const getSortRankFromUnit = (unit: CoatOfArmsMapData) => {
  const values = (unit.type || []).map((v) => (SORT_ORDER[v] || 1)) || [0];

  return Math.max(...values);
};

const sortForCountryData = (a: CoatOfArmsMapData, b: CoatOfArmsMapData) => {
  return getSortRankFromUnit(a) > getSortRankFromUnit(b) ? 1 : -1;
}

const HeraldryDE = () => {
  return (
    <HeraldryRegion
      lang="de"
      mapWrapperClassName="[&>div>svg]:aspect-[461_/_623]"
      mapWrapperClassNameForZoom0="max-w-[40vh]"
      map={SvgMap}
      mapOffset={{
         minLatTop: 47.3,
         maxLatTop: 55.22,
         minLonLeft: 5.8,
         maxLonLeft: 15.1,
      }}
      dataPaths={[
        '/maps/data/heraldry/de/formerUnit-0',
        '/maps/data/heraldry/de/formerUnit-1',
        '/maps/data/heraldry/de/formerUnit-2',
        '/maps/data/heraldry/de/formerUnit-3',
        '/maps/data/heraldry/de/unit-0',
        '/maps/data/heraldry/de/unit-1',
        '/maps/data/heraldry/de/unit-2',
        '/maps/data/heraldry/de/unit-3',
      ]}
      filterForCountryData={filterForCountryData}
      sortForCountryData={sortForCountryData}
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



