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

import et1JSON from '../eesti-heraldika/unit-map.json';

import fi1JSON from '../suomalainen-heraldikka/kunta-map.json';
import fi2JSON from '../suomalainen-heraldikka/maakunta-map.json';

import pl1JSON from '../heraldyka/gminy-map.json';
import pl2JSON from '../heraldyka/powiaty-map.json';
import pl3JSON from '../heraldyka/miasta-map.json';

import { AdministrativeUnit } from "../../topic/Heraldry/types";

// Will be rendered from north to south and from smallest to largest
const units = [
  ...Object.values(fi1JSON),
  ...Object.values(fi2JSON),
  ...Object.values(et1JSON),
  ...Object.values(pl1JSON),
  ...Object.values(pl2JSON),
  ...Object.values(pl3JSON),
];

// const typeFiltersList = getFilter(allUnits, 'type');
// const animalFiltersList = getFilter(allUnits, 'animals');
// const itemsFiltersList = getFilter(allUnits, 'items');

const HeraldryPage = () => {
  const [selected, setSelected] = useState<AdministrativeUnit[]>([]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const uiWrapperClassName = "p-2 px-4 rounded-[4px] bg-white";
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(wrapperRef);
  
  const { t } = useTranslation();

  const prevZoomLevel = usePrevious(zoomLevel);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setZoomLevel((zoomLevel) => Math.min(25, zoomLevel + 1));
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
      className="fixed top-0 left-0 w-full h-full no-scrollbar overflow-auto md:overflow-hidden"
      {...events}
    >
      <p className={clsx('fixed top-2 left-2 z-10', uiWrapperClassName)}>
        This page doesn’t work yet; please check <Link to="/maps/" className="font-bold">the other maps</Link>
      </p>
      <main>
        <HeraldryCanvas zoomLevel={zoomLevel} units={units} setSelected={setSelected} />
        <nav className="fixed top-2 right-2 z-10 flex flex-col justify-between gap-2 text-[12px]">
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.min(25, zoomLevel + 1))}>
            +
          </button>
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.max(1, zoomLevel - 1))}>
            -
          </button>
        </nav>
        <section className="fixed top-[100px] right-2 z-10">
          <div className={uiWrapperClassName}>
            {selected.map(({ title }) => <div>
              {title}
            </div>)}
          </div>
        </section>
      </main>
      <footer className="fixed bottom-2 left-2 right-2 z-10 flex justify-between text-[12px]">
        <div className={uiWrapperClassName}>
          {t('heraldry.mapFooterSource')}
          {' '}
          <a href="https://www.wikipedia.org/" className="font-bold" target="_blank" rel="nofollow noopener">wikipedia.org</a>.
        </div>
        <div className={uiWrapperClassName}>
          <a href="https://deykun.github.io/maps/" className="font-bold" target="_blank">deykun.github.io/maps</a>
        </div>
      </footer>
    </div>
  );
};

export default HeraldryPage;
