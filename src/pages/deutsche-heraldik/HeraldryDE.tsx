import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => {
  return units.filter((unit: CoatOfArmsMapData, index) => {
    if (shouldUpdateLoader && index % 10) {
      updateProcessingTexts({ value: index, total: units.length });
    }

    if (unit.imageHash) {
      if ([
        // Not CoA but Maps
        '17f85dc9.webp',
        '10bb3b40',
        '624effa8',
        '59307d6a',
        '274142bd',
        'a261b12',
        '4eb9c094',
        'a61d6b4',
        '62b328d3',
        'd5380a3',
        '9470762',
        '1864c23b',
        '898ec90',
        '68c1ad4',
        '469531ac',
        '2c8c531d',
        '68328149',
        '1fb67b80',
        '326cd87e',
        'eb13a1a',
        '21cf49b0',
        '2955aec1',
        '3b309d7c',
        '6ffe3d8',
        '4b2e6014',
        '50d9f0eb',
        '7d1e046e',
        '31fb1c6',
        '25348764',
        '6bbef075',
        '4e7b1ef5',
        '3994855a',
        '593e517f',
        '5a159b15',
        'b47b9c7',
        '79426e02',
        '7d295317',
        '3c5ab582',
        '54f7e9bf',
        '765a596c',
        '6536381e',
        '239dd58f',
        '717f311e',
        '4888eeba',
        '6331ed4a',
        '17d04fcf',
        '5b19f0b2',
        '474e52c5',
        '693c35d0',
        '331070ac',
        'a7e3b91',
        '7f6382ba',
        '3ca696bb',
        '27d4382',
        '7f3f034d',
        '4a15068',
        '287ac35',
        '5cd0fab8',
        '690d19e2',
        '3fa67a2d',
        '5636c6e0',
        '3895a3a7',
        '861d909',
        '3672060c',
        '728bcf92',
        'cd95281',
        '1d2ffdd3',
        '6e5a384d',
        '56bbda94',
        '513f49df',
        '677d66d5',
        '5b87e052',
        '5d5a2fab',
        '2e5123ce',
        '73c3a3a0',
        '72e50ad7',
        '3d12acac',
        '29e5a0f1',
        '5a55bac1',
        '2cbb14ed',
        '27d44f1',
        '3ab2f949',
        '579ae633',
        '535977d9',
        '762c7133',
        '542c19a3',
        '17f85dc9',
        '490b45a4',
        '10fb5e86',
      ].includes(unit.imageHash)) {
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
    <HeraldryMap
      lang="de"
      mapWrapperClassName="[&>div>svg]:aspect-[461_/_623]"
      mapWrapperClassNameForZoom0="max-w-[40vh]"
      map={SvgMap}
      mapOffset={{
        /*
          It’s probably a Mercator projection. To calculate the Y position, you need to know the angles and do some complex logarithmic calculations.
          This projection is easy, but it's fucking frustrating when you don't know those numbers and don't want to spend three weeks just calculating trigonometry for spheres.
        */
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
        '/maps/data/heraldry/de/unit-4',
        '/maps/data/heraldry/de/unit-5',
      ]}
      filterForCountryData={filterForCountryData}
      sortForCountryData={sortForCountryData}
      brokenHashes={[
        '6ec97a69',
        '3408fb18',
      ]}
      developmentModeFiltersTypes={[
        'unit-0',
        'unit-1',
        'unit-2',
        'unit-3',
        'unit-4',
        'unit-5',
        'formerUnit-0',
        'formerUnit-1',
        'formerUnit-2',
        'formerUnit-3',
      ]}
    />
  );
};

export default HeraldryDE;



