import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));
// const SvgMap = React.lazy(() => import('./components/SvgMap2'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => {
  return units.filter((unit: CoatOfArmsMapData, index) => {
    if (shouldUpdateLoader && index % 10) {
      updateProcessingTexts({ value: index, total: units.length });
    }

    if (unit.imageHash) {
      if ([
        // Not CoA but logos
        '49e7f5e6',
        '9629734',
      ].includes(unit.imageHash)) {
        return false;
      };
    }

    if ([
      'empty'
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
  kommune: 1000,
  formerKommune: 500,
  formerAmt: 100,
}

const getSortRankFromUnit = (unit: CoatOfArmsMapData) => {
  const values = (unit.type || []).map((v) => (SORT_ORDER[v] || 1)) || [0];

  return Math.max(...values);
};

const sortForCountryData = (a: CoatOfArmsMapData, b: CoatOfArmsMapData) => {
  return getSortRankFromUnit(a) > getSortRankFromUnit(b) ? 1 : -1;
}

const HeraldryDK = () => {
  return (
    <HeraldryMap
      lang="da"
      country="dk"
      mapWrapperClassName="[&>div>svg]:aspect-[414_/_330]"
      mapWrapperClassNameForZoom0="max-w-[70vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 54.5,
        maxLatTop: 57.85,
        minLonLeft: 8.0,
        maxLonLeft: 15.3,
      }}
      dataPaths={[
        '/maps/data/heraldry/dk/formerUnit',
        '/maps/data/heraldry/dk/unit',
      ]}
      filterForCountryData={filterForCountryData}
      sortForCountryData={sortForCountryData}
      brokenHashes={[
        '3408fb18',
      ]}
    />
  );
};

export default HeraldryDK;
