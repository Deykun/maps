import SvgMap from './components/SvgMap';
import { AdministrativeUnit } from '../../topic/Heraldry/types';

import { getFilter } from '../../topic/Heraldry/utils/getFilter';

import valdJSON from './vald-map.json'

import Heraldry from '../../topic/Heraldry/Heraldry';

const vald = Object.values(valdJSON);

const allUnits: AdministrativeUnit[] = Object.values([
  ...vald,
].filter((unit: AdministrativeUnit) => {
  if ([
    'empty'
  ].includes(unit.title)) {
    // Historic
    return false;
  };

  if ([
    'empty'
  ].includes(unit.title)) {
    // Outside of Estonia
    return false;
  }

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

const typeFiltersList = getFilter(allUnits, 'type');
const animalFiltersList = getFilter(allUnits, 'animals');
const itemsFiltersList = getFilter(allUnits, 'items');

const HeraldryPL = () => {
  return (
    <Heraldry
      lang="et"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemsFiltersList={itemsFiltersList}
      mapWrapperClassName="aspect-[707_/_509]"
      map={SvgMap}
    />
  );
};

export default HeraldryPL;
