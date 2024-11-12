import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));
// const SvgMap = React.lazy(() => import('./components/SvgMap2'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => {
  updateProcessingTexts({ value: units.length, total: units.length });

  return units;
};

const HeraldryDK = () => {
  return (
    <HeraldryMap
      lang="et"
      mapWrapperClassName="[&>div>svg]:aspect-[707_/_509]"
      mapWrapperClassNameForZoom0="max-w-[70vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 54.45,
        maxLatTop: 57.75,
        minLonLeft: 8.07,
        maxLonLeft: 15.15,
      }}
      dataPaths={[
        '/maps/data/heraldry/dk/formerUnit',
        '/maps/data/heraldry/dk/unit',
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryDK;
