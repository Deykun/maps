import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  updateProcessingTexts({ value: units.length, total: units.length });

  return units;
};

const HeraldryNO = () => {
  return (
    <HeraldryMap
      lang="no"
      mapWrapperClassName="[&>div>svg]:aspect-[480_/_601]"
      mapWrapperClassNameForZoom0="max-w-[70vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 57.95,
        maxLatTop: 71.19,
        minLonLeft: 4.99,
        maxLonLeft: 31.15,
      }}
      dataPaths={[
        '/maps/data/heraldry/no/formerFylker',
        '/maps/data/heraldry/no/kommune',
        '/maps/data/heraldry/no/fylker',
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryNO;
