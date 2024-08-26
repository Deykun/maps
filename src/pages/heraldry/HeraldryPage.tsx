// import { AdministrativeUnit } from '../../topic/Heraldry/types';
import { Link } from "wouter";
import { useQuery } from '@tanstack/react-query';
// import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import clsx from 'clsx';

import HeraldryCanvas from './components/HeraldryCanvas';
import UiRightSidebar from './components/UiRightSidebar';

import useZoom from '@/pages/heraldry/hooks/useZoom';

// import { getFilter } from '../../topic/Heraldry/utils/getFilter';

import { AdministrativeUnit } from "../../topic/Heraldry/types";

import './HeraldryPage.scss';

const fetchCountryData = async () => {
  const [
    gminy,
    miasta,
    powiaty,
    wojewodztwa,
    formerKunta,
    kunta,
    maakunta,
    formerUnits,
    units,
  ] = await Promise.all([
    await fetch('/maps/data/heraldry/fi/formerKunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/fi/kunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/fi/maakunta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/et/formerUnit-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/et/unit-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/pl/gminy-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/pl/powiaty-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/pl/miasta-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
    await fetch('/maps/data/heraldry/pl/wojewodztwa-map.json').then((response) => response.json()).then((byKey) => Object.values(byKey)),
  ]);

  
// Will be rendered from former to current, north to south and from smallest to largest by country
  const allUnits: AdministrativeUnit[] = Object.values([
    ...Object.values(formerKunta) as AdministrativeUnit[],
    ...Object.values(kunta) as AdministrativeUnit[],
    ...Object.values(maakunta) as AdministrativeUnit[],
    ...Object.values(formerUnits) as AdministrativeUnit[],
    ...Object.values(units) as AdministrativeUnit[],
    ...Object.values(gminy) as AdministrativeUnit[],
    ...Object.values(powiaty) as AdministrativeUnit[],
    ...Object.values(miasta) as AdministrativeUnit[],
    ...Object.values(wojewodztwa) as AdministrativeUnit[],
  ].filter((unit: AdministrativeUnit) => {
    // if ([
    //    'empty'
    // ].includes(unit.title)) {
    //   // Historic
    //   return false;
    // };

    // if ([
    //    'empty'
    // ].includes(unit.title)) {
    //   // Historic
    //   return false;
    // };

    return true;
  }).reduce((stack: {
    [url: string]: AdministrativeUnit,
  }, unit: AdministrativeUnit) => {
    if (stack[unit.url]) {
      const areImagesFilledAndDifferent = unit.image?.source && unit.image?.source !== stack[unit.url].image?.source;
      if (areImagesFilledAndDifferent) {
        if (location.href.includes('localhost')) {
          console.error({
            [unit.type?.join('') || 'a']: stack[unit.url].image?.source,
            [stack[unit.url].type?.join('') || 'b']: stack[unit.url].image?.source,
          })
          throw ('Duplicated but different images!')
        }
      }

      // It merges duplicates but keeps their type in array
      const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
      stack[unit.url].type = [...new Set(typeMerged)];
    } else {
      stack[unit.url] = unit;
    }

    return stack;
  }, {}));

  // const typeFiltersList = getFilter(allUnits, 'type');
  // const animalFiltersList = getFilter(allUnits, 'animals');
  // const itemFiltersList = getFilter(allUnits, 'items');

  return {
    allUnits,
    // typeFiltersList,
    // animalFiltersList,
    // itemFiltersList
  };
}

const HeraldryPage = () => {
  const [selected, setSelected] = useState<AdministrativeUnit[]>([]);
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(wrapperRef, { decayRate: 0 });
  
  // const { t } = useTranslation();

  const {
    // isLoading,
    // isError,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchCountryData(),
    queryKey: ['all'],
  });

  const {
    allUnits = [],
  } = data || {};

  const width = useZoom(wrapperRef)

  return (
    <>
      <main
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full no-scrollbar overflow-auto md:overflow-hidden"
        {...events}
      >
        <div className={clsx('heraldry-ui-pane fixed top-3 left-3 z-10')}>
          <h1>Heraldic Map of Europe</h1>
          <p><strong className="font-bold">{allUnits.length}</strong> coat of arms.</p>
        <p>
            This page doesn’t work yet; please check <Link to="/maps/" className="font-bold">the other maps</Link>.
          </p>
        </div>
        {allUnits.length > 0 && <HeraldryCanvas width={width} units={allUnits} setSelected={setSelected} />}
      </main>
      <UiRightSidebar
        selected={selected}
      />
    </>
  );
};

export default HeraldryPage;
