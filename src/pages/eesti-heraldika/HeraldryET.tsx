import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => {
  updateProcessingTexts({ value: units.length, total: units.length });

  return units;

  // return units.filter((unit: CoatOfArmsMapData, index) => {
  //   if (shouldUpdateLoader && index % 10) {
  //     updateProcessingTexts({ value: index, total: units.length });
  //   }
  // };
  //   if ([
  //      'empty'
  //   ].includes(unit.title)) {
  //     // Historic
  //     return false;
  //   };

  //   if ([
  //     'empty'
  //   ].includes(unit.title)) {
  //     // Outside of country
  //     return false;
  //   }

  //   return true;
  // });
};

const HeraldryET = () => {
  return (
    <HeraldryMap
      lang="et"
      mapWrapperClassName="[&>div>svg]:aspect-[707_/_509]"
      mapWrapperClassNameForZoom0="max-w-[70vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 57.43,
        maxLatTop: 59.97,
        minLonLeft: 21.46,
        maxLonLeft: 28.45,
      }}
      dataPaths={[
        '/maps/data/heraldry/et/formerUnit',
        '/maps/data/heraldry/et/unit',
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryET;
