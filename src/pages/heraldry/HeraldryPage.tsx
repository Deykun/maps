// import SvgMap from './components/SvgMap';
// import { AdministrativeUnit } from '../../topic/Heraldry/types';
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import usePrevious from '../../hooks/usePrevious';
import clsx from 'clsx';

import HeraldryCanvas from './components/HeraldryCanvas';

// import { getFilter } from '../../topic/Heraldry/utils/getFilter';

// import unitJSON from './unit-map.json'

import miastaJSON from '../heraldyka/miasta-map.json';
import unitJSON from '../eesti-heraldika/unit-map.json';
import unitFIJSON from '../suomalainen-heraldikka/maakunta-map.json';
import unitFISmallJSON from '../suomalainen-heraldikka/kunta-map.json';
const miasta = Object.values(miastaJSON);
const unitsET = Object.values(unitJSON);
const unitFI = Object.values(unitFIJSON);
const unitFIsmall = Object.values(unitFISmallJSON);

const units = [...miasta, ...unitsET, ...unitFI, ...unitFIsmall];

// import Heraldry from '../../topic/Heraldry/Heraldry';

// const units = Object.values(unitJSON);

// const typeFiltersList = getFilter(allUnits, 'type');
// const animalFiltersList = getFilter(allUnits, 'animals');
// const itemsFiltersList = getFilter(allUnits, 'items');

const HeraldryPage = () => {
  const [zoomLevel, setZoomLevel] = useState(5);
  const uiWrapperClassName = "p-2 px-4 rounded-[4px] bg-white";
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(wrapperRef);
  
  const { t } = useTranslation();

  const prevZoomLevel = usePrevious(zoomLevel);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setZoomLevel((zoomLevel) => Math.min(20, zoomLevel + 1));
      } else {
        setZoomLevel((zoomLevel) => Math.max(1, zoomLevel - 1));
      }
    }

    wrapperRef.current.addEventListener('wheel', handleScroll);
  
    return () => {
      wrapperRef.current.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      const topScroll = wrapperRef.current?.scrollTop || 0;
      const scrollLeft = wrapperRef.current?.scrollLeft || 0;
  
      const zoomAgnosticTop = topScroll / (prevZoomLevel ?? 5);
      const zoomAgnosticLeft = scrollLeft / (prevZoomLevel ?? 5);


      wrapperRef.current?.scroll({
        top: zoomAgnosticTop * zoomLevel,
        left: zoomAgnosticLeft * zoomLevel,
      });
    }
  }, [zoomLevel, wrapperRef.current]);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 w-full h-full no-scrollbar overflow-hidden"
      {...events}
    >
      <header className={clsx('fixed top-2 left-2 z-10', uiWrapperClassName)}>
        <h1>Heraldic Map of Europe</h1>
        This page doesn’t work yet; please check <Link to="/maps/" className="font-bold">the other maps</Link>
      </header>
      <main>
        <HeraldryCanvas zoomLevel={zoomLevel} units={units} />
        <nav className="fixed top-2 right-2 z-10 flex flex-col justify-between gap-2 text-[12px]">
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.min(20, zoomLevel + 1))}>
            +
          </button>
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.max(1, zoomLevel - 1))}>
            -
          </button>
        </nav>
      </main>
      <footer className="fixed bottom-2 left-2 right-2 z-10 flex justify-between text-[12px]">
        <div className={uiWrapperClassName}>
          {t('heraldry.mapFooterSource')} <a href="https://www.wikipedia.org/" className="font-bold" target="_blank" rel="nofollow noopener">wikipedia.org</a>.
        </div>
        <div className={uiWrapperClassName}>
          Wszystkich herbów <strong className="font-bold">2570</strong>.
        </div>
      </footer>
    </div>
  );
};

export default HeraldryPage;
