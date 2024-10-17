import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  return units.filter((unit: CoatOfArmsMapData) => {
    if ([
       'empty'
    ].includes(unit.title)) {
      // Historic
      return false;
    };

    if ([
      'Viipurin vaakuna'
    ].includes(unit.title)) {
      // Outside of country
      return false;
    }

    return true;
  });
};

const HeraldryFI = () => {
  return (
    <HeraldryMap
      lang="fi"
      mapWrapperClassName="[&>div>svg]:aspect-[373_/_759]"
      mapWrapperClassNameForZoom0="max-w-[30vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 59.899,
        maxLatTop: 71.099,
        minLonLeft: 19.285,
        maxLonLeft: 31.785,
      }}
      dataPaths={[
        '/maps/data/heraldry/fi/formerKunta',
        '/maps/data/heraldry/fi/kunta',
        '/maps/data/heraldry/fi/maakunta',
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryFI;
