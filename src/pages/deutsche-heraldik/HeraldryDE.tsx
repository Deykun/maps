import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryRegion from '@/topic/Heraldry/components/HeraldryRegion/HeraldryRegion';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  return units.filter((unit: CoatOfArmsMapData) => {
    const imagePath = (unit.imagesList || []).find(({ width }) => width === '80w')?.path;

    if (imagePath) {
      if ([
        // Not CoA but Maps
        'images/heraldry/de/unit/17f85dc9-kreis-warendorf-80w.webp',
        'images/heraldry/de/unit/10bb3b40-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/624effa8-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/59307d6a-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/274142bd-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/a261b12-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/4eb9c094-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/a61d6b4-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/62b328d3-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/d5380a3-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/9470762-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/1864c23b-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/898ec90-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/68c1ad4-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/469531ac-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/2c8c531d-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/68328149-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/1fb67b80-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/326cd87e-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/eb13a1a-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/21cf49b0-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/2955aec1-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/3b309d7c-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/6ffe3d8-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/4b2e6014-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/50d9f0eb-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/7d1e046e-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/31fb1c6-badenwurttemberg-80w.webp',
        'images/heraldry/de/unit/25348764-thuringen-80w.webp',
        'images/heraldry/de/unit/6bbef075-deutschland-80w.webp',
        'images/heraldry/de/unit/4e7b1ef5-enneperuhrkreis-80w.webp',
      ].includes(imagePath)) {
        return false;
      };
    }

    if ([
      'Kanton Tessin'
    ].includes(unit.title)) {
      // Historic or outside of country
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



