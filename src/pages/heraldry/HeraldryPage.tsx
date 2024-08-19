// import { AdministrativeUnit } from '../../topic/Heraldry/types';
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import clsx from 'clsx';

import HeraldryCanvas from './components/HeraldryCanvas';
import UiRightSidebar from './components/UiRightSidebar';

import useZoom from '@/pages/heraldry/hooks/useZoom';

// import { getFilter } from '../../topic/Heraldry/utils/getFilter';

// import unitJSON from './unit-map.json'

import et1JSON from '../eesti-heraldika/formerUnit-map.json';
import et2JSON from '../eesti-heraldika/unit-map.json';

import fi1JSON from '../suomalainen-heraldikka/formerKunta-map.json';
import fi2JSON from '../suomalainen-heraldikka/kunta-map.json';
import fi3JSON from '../suomalainen-heraldikka/maakunta-map.json';

import pl1JSON from '../heraldyka/gminy-map.json';
import pl2JSON from '../heraldyka/powiaty-map.json';
import pl3JSON from '../heraldyka/miasta-map.json';
import pl4JSON from '../heraldyka/wojewodztwa-map.json';

import { AdministrativeUnit } from "../../topic/Heraldry/types";

import './HeraldryPage.scss';

// Will be rendered from former to current, north to south and from smallest to largest
const units = [
  ...Object.values(fi1JSON),
  ...Object.values(fi2JSON),
  ...Object.values(fi3JSON),
  ...Object.values(et1JSON),
  ...Object.values(et2JSON),
  ...Object.values(pl1JSON),
  ...Object.values(pl2JSON),
  ...Object.values(pl3JSON),
  ...Object.values(pl4JSON),
];

// const typeFiltersList = getFilter(allUnits, 'type');
// const animalFiltersList = getFilter(allUnits, 'animals');
// const itemsFiltersList = getFilter(allUnits, 'items');

const HeraldryPage = () => {
  const [selected, setSelected] = useState<AdministrativeUnit[]>([]);
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(wrapperRef, { decayRate: 0 });
  
  // const { t } = useTranslation();

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
          <p><strong className="font-bold">{units.length}</strong> coat of arms.</p>
        <p>
            This page doesn’t work yet; please check <Link to="/maps/" className="font-bold">the other maps</Link>.
          </p>
        </div>
        <HeraldryCanvas width={width} units={units} setSelected={setSelected} />
      </main>
      <UiRightSidebar
        selected={selected}
      />
    </>
  );
};

export default HeraldryPage;
