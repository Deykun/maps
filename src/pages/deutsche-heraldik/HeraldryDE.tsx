import React from 'react';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';
const SvgMap = React.lazy(() => import('./components/SvgMap'));

import HeraldryMap from '@/topic/Heraldry/components/HeraldryMap/HeraldryMap';

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
        'images/heraldry/de/unit/3994855a-oberbergischer-kreis-80w.webp',
        'images/heraldry/de/unit/593e517f-rheinerftkreis-80w.webp',
        'images/heraldry/de/unit/5a159b15-deutschland-80w.webp',
        'images/heraldry/de/unit/b47b9c7-thuringen-80w.webp',
        'images/heraldry/de/unit/79426e02-deutschland-80w.webp',
        'images/heraldry/de/unit/7d295317-thuringen-80w.webp',
        'images/heraldry/de/unit/3c5ab582-deutschland-80w.webp',
        'images/heraldry/de/unit/54f7e9bf-thuringen-80w.webp',
        'images/heraldry/de/unit/765a596c-deutschland-80w.webp',
        'images/heraldry/de/unit/6536381e-thuringen-80w.webp',
        'images/heraldry/de/unit/239dd58f-deutschland-80w.webp',
        'images/heraldry/de/unit/717f311e-thuringen-80w.webp',
        'images/heraldry/de/unit/4888eeba-deutschland-80w.webp',
        'images/heraldry/de/unit/6331ed4a-thuringen-80w.webp',
        'images/heraldry/de/unit/17d04fcf-deutschland-80w.webp',
        'images/heraldry/de/unit/5b19f0b2-thuringen-80w.webp',
        'images/heraldry/de/unit/474e52c5-deutschland-80w.webp',
        'images/heraldry/de/unit/693c35d0-thuringen-80w.webp',
        'images/heraldry/de/unit/331070ac-deutschland-80w.webp',
        'images/heraldry/de/unit/a7e3b91-thuringen-80w.webp',
        'images/heraldry/de/unit/7f6382ba-deutschland-80w.webp',
        'images/heraldry/de/unit/3ca696bb-thuringen-80w.webp',
        'images/heraldry/de/unit/27d4382-deutschland-80w.webp',
        'images/heraldry/de/unit/7f3f034d-thuringen-80w.webp',
        'images/heraldry/de/unit/4a15068-deutschland-80w.webp',
        'images/heraldry/de/unit/287ac35-thuringen-80w.webp',
        'images/heraldry/de/unit/5cd0fab8-deutschland-80w.webp',
        'images/heraldry/de/unit/690d19e2-thuringen-80w.webp',
        'images/heraldry/de/unit/3fa67a2d-deutschland-80w.webp',
        'images/heraldry/de/unit/5636c6e0-thuringen-80w.webp',
        'images/heraldry/de/unit/3895a3a7-deutschland-80w.webp',
        'images/heraldry/de/unit/861d909-thuringen-80w.webp',
        'images/heraldry/de/unit/3672060c-bosau-80w.webp',
        'images/heraldry/de/unit/728bcf92-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/cd95281-niedersachsen-80w.webp',
        'images/heraldry/de/unit/1d2ffdd3-deutschland-80w.webp',
        'images/heraldry/de/unit/6e5a384d-deutschland-80w.webp',
        'images/heraldry/de/unit/56bbda94-deutschland-80w.webp',
        'images/heraldry/de/unit/513f49df-deutschland-80w.webp',
        'images/heraldry/de/unit/677d66d5-deutschland-80w.webp',
        'images/heraldry/de/unit/5b87e052-deutschland-80w.webp',
        'images/heraldry/de/unit/5d5a2fab-deutschland-80w.webp',
        'images/heraldry/de/unit/2e5123ce-deutschland-80w.webp',
        'images/heraldry/de/unit/73c3a3a0-deutschland-80w.webp',
        'images/heraldry/de/unit/72e50ad7-mecklenburgvorpommern-80w.webp',
        'images/heraldry/de/unit/3d12acac-brandenburg-80w.webp',
        'images/heraldry/de/unit/29e5a0f1-brandenburg-80w.webp',
        'images/heraldry/de/unit/5a55bac1-brandenburg-80w.webp',
        'images/heraldry/de/unit/2cbb14ed-brandenburg-80w.webp',
        'images/heraldry/de/unit/27d44f1-brandenburg-80w.webp',
        'images/heraldry/de/unit/3ab2f949-brandenburg-80w.webp',
        'images/heraldry/de/unit/579ae633-brandenburg-80w.webp',
        'images/heraldry/de/unit/535977d9-brandenburg-80w.webp',
        'images/heraldry/de/unit/762c7133-nordrheinwestfalen-80w.webp',
        'images/heraldry/de/unit/542c19a3-thuringen-80w.webp',
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
    <HeraldryMap
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
        '/maps/data/heraldry/de/unit-4',
        '/maps/data/heraldry/de/unit-5',
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



