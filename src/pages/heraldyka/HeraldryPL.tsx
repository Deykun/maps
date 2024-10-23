import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
import {
  updateProcessingTexts,
} from '@/topic/Heraldry/stores/progressStore';
const SvgMap = React.lazy(() => import('./components/SvgPowiaty'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

const filterForCountryData = (units: CoatOfArmsMapData[], shouldUpdateLoader?: boolean) => {
  return units.filter((unit: CoatOfArmsMapData, index) => {
    if (shouldUpdateLoader && index % 10) {
      updateProcessingTexts({ value: index, total: units.length });
    }

    if ([
      'Herb Podgórza',
      'Herb gminy Janów (powiat częstochowski)',
      'Herb Nowego Bytomia',
      'Herb gminy Brudzew',
      'Herb gminy Ostrowice',
      'Herby miast Śląska Cieszyńskiego',
      'Herb Jabłonkowa',
    ].includes(unit.title)) {
      // Historic
      return false;
    };

    if ([
      'Herb Trzyńca',
      'Herb Orłowej',
      'Herb Czeskiego Cieszyna',
    ].includes(unit.title)) {
      // Outside of Poland
      return false;
    }

    return true;
  });
};

const HeraldryPL = () => {
  return (
    <HeraldryMap
      lang="pl"
      mapWrapperClassName="[&>div>svg]:aspect-[820_/_775]"
      mapWrapperClassNameForZoom0="max-w-[50vh]"
      map={SvgMap}
      mapOffset={{
        minLatTop: 49,
        maxLatTop: 54.95,
        minLonLeft: 13.98,
        maxLonLeft: 24.25,
      }}
      dataPaths={[
        '/maps/data/heraldry/pl/gminy',
        '/maps/data/heraldry/pl/powiaty',
        '/maps/data/heraldry/pl/miasta',
        '/maps/data/heraldry/pl/wojewodztwa',
      ]}
      filterForCountryData={filterForCountryData}
    />
  );
};

export default HeraldryPL;
