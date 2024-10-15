import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryRegion from '@/topic/Heraldry/components/HeraldryRegion/HeraldryRegion';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  return units;

  // return units.filter((unit: CoatOfArmsMapData) => {
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
    <HeraldryRegion
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
