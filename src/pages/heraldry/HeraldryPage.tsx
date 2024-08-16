// import SvgMap from './components/SvgMap';
// import { AdministrativeUnit } from '../../topic/Heraldry/types';
import { useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import clsx from 'clsx';

import HeraldryCanvas from './components/HeraldryCanvas';

// import { getFilter } from '../../topic/Heraldry/utils/getFilter';

// import unitJSON from './unit-map.json'

// import Heraldry from '../../topic/Heraldry/Heraldry';

// const units = Object.values(unitJSON);

// const typeFiltersList = getFilter(allUnits, 'type');
// const animalFiltersList = getFilter(allUnits, 'animals');
// const itemsFiltersList = getFilter(allUnits, 'items');

const HeraldryPage = () => {
  const [zoomLevel, setZoomLevel] = useState(2);
  const uiWrapperClassName = "p-2 px-4 rounded-[4px] bg-white";
  const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 w-full h-full no-scrollbar overflow-hidden"
      {...events}
    >
      <header className={clsx('fixed top-2 left-2 z-10', uiWrapperClassName)}>
        <h1>Coats of arms in Poland</h1>
      </header>
      <main>
        <HeraldryCanvas className="size-full bg-[#dff5ff]" zoomLevel={zoomLevel} />
        <nav className="fixed top-2 right-2 z-10 flex flex-col justify-between gap-2 text-[12px]">
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.min(8, zoomLevel + 1))}>
            +
          </button>
          <span>
            {zoomLevel}
          </span>
          <button className={uiWrapperClassName} onClick={() => setZoomLevel((zoomLevel) => Math.max(1, zoomLevel - 1))}>
            -
          </button>
        </nav>
      </main>
      <footer className="fixed bottom-2 left-2 right-2 z-10 flex justify-between text-[12px]">
        <div className={uiWrapperClassName}>
          Na podstawie danych z <a href="#" className="font-bold">wikipedia.org</a>.
        </div>
        <div className={uiWrapperClassName}>
          Wszystkich herbów <strong className="font-bold">2570</strong>.
        </div>
      </footer>
    </div>
  );
};

export default HeraldryPage;
