// import SvgMap from './components/SvgMap';
// import { AdministrativeUnit } from '../../topic/Heraldry/types';

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
  const uiWrapperClassName = "p-2 px-4 rounded-[4px] bg-white";

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <HeraldryCanvas className="size-full bg-[#dff5ff]" />
      <header className={clsx('absolute top-2 left-2', uiWrapperClassName)}>
        <h1>Coats of arms in Poland</h1>
      </header>
      <footer className="fixed bottom-2 left-2 right-2 flex justify-between text-[12px]">
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
