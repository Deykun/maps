// import { AdministrativeUnit } from '../../topic/Heraldry/types';
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import usePrevious from '../../hooks/usePrevious';
import clsx from 'clsx';

import HeraldryCanvas from './components/HeraldryCanvas';
import UiRightSidebar from './components/UiRightSidebar';
import { useSettingStore, zoomIn, zoomOut } from '@/topic/Heraldry/stores/settingsStore';
import { zoomUnitInPx } from './components/constants';


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
  const zoomLevel = useSettingStore(state => state.zoomLevel);
  const uiWrapperClassName = "heraldry-ui-pane";
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(wrapperRef, { decayRate: 0 });
  
  // const { t } = useTranslation();

  const prevZoomLevel = usePrevious(zoomLevel, 8);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }

    const handleScrollEnd = () => {
      document.getElementById('europe-marker')?.scrollIntoView({
        // behavior: 'smooth', 
        block: 'nearest',
        inline: 'nearest',
      });
    };
    
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('wheel', handleScroll, { passive: true });
      wrapperRef.current.addEventListener('scrollend', handleScrollEnd);

      document.getElementById('europe-marker')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('wheel', handleScroll);
        wrapperRef.current.removeEventListener('scrollend', handleScrollEnd);
      }
    };
  }, [wrapperRef.current]);

  useEffect(() => {
    if (wrapperRef.current) {
      const topScroll = wrapperRef.current?.scrollTop || 0;
      const scrollLeft = wrapperRef.current?.scrollLeft || 0;
  
      const zoomAgnosticTop = topScroll / prevZoomLevel;
      const zoomAgnosticLeft = scrollLeft / prevZoomLevel;

      const didZoomIn = prevZoomLevel < zoomLevel;
      const zoomOffsetTop = didZoomIn ? zoomUnitInPx / 6 : -zoomUnitInPx / 6;
      const zoomOffsetLeft = didZoomIn ? zoomUnitInPx / 4 : -zoomUnitInPx / 4;

      wrapperRef.current?.scroll({
        top: zoomAgnosticTop * zoomLevel + zoomOffsetTop,
        left: zoomAgnosticLeft * zoomLevel + zoomOffsetLeft,
      });
    }
  }, [zoomLevel, wrapperRef.current]);

  return (
    <>
      <main
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full no-scrollbar overflow-auto md:overflow-hidden"
        {...events}
      >
        <div className={clsx('fixed top-3 left-3 z-10', uiWrapperClassName)}>
          <h1>Heraldic Map of Europe</h1>
          <p><strong className="font-bold">{units.length}</strong> coat of arms.</p>
        <p>
            This page doesn’t work yet; please check <Link to="/maps/" className="font-bold">the other maps</Link>.
          </p>
        </div>
        <HeraldryCanvas units={units} setSelected={setSelected} />
      </main>
      <UiRightSidebar
        selected={selected}
      />
    </>
  );
};

export default HeraldryPage;
