import React from 'react';
import { CoatOfArmsMapData, MapOffset } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[]) => {
  updateProcessingTexts({ value: units.length, total: units.length });

  return units;
};

const mapOffset: MapOffset = {
  minLatTop: 58,
  maxLatTop: 71.9,
  minLonLeft: 4.45,
  maxLonLeft: 24.8,
  xModifier: (percentageX: number, { percentageY }) => {
    if (percentageY > 0.5) {
      return percentageX;
    }

    if (percentageX > 0.55) {
      const skewFactor = percentageX - 0.55;

      return percentageX + (skewFactor * -1 * 0.45);
    }

    const skewFactor = percentageX - 0.75;

    return percentageX + (skewFactor * 0.1);
  },
  yModifier: (percentageY: number) => {
    if (percentageY > 0.3) {
      return percentageY;
    }

    const skewFactor = percentageY - 0.4;

    return percentageY + (skewFactor * 0.18);
  }
}

const HeraldryNO = () => {
  return (
    <HeraldryMap
      lang="no"
      mapWrapperClassName="[&>div>svg]:aspect-[507_/_730]"
      mapWrapperClassNameForZoom0="max-w-[38vh]"
      map={SvgMap}
      mapOffset={mapOffset}
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
