// import SvgMap from './components/SvgGmina';
import SvgMap from './components/SvgPowiaty';
import { AdministrativeUnit } from '../../topic/Heraldry/types';

import { getFilter } from '../../topic/Heraldry/utils/getFilter';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'
import powiatyJSON from './powiaty-images.json'

import Heraldry from '../../topic/Heraldry/Heraldry';

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);
const powiaty = Object.values(powiatyJSON);

const allUnits: AdministrativeUnit[] = Object.values([
  ...gminy,
  ...powiaty,
  ...miasta,
].filter((unit: AdministrativeUnit) => {
  if ([
    'Herb Podgórza',
    'Herb gminy Janów (powiat częstochowski)',
    'Herb Nowego Bytomia',
    'Herb gminy Brudzew',
    'Herb gminy Ostrowice',
    'Herby miast Śląska Cieszyńskiego',
  ].includes(unit.title)) {
    // Historic
    return false;
  };

  if ([
    'Herb Trzyńca',
    'Herb Orłowej',
  ].includes(unit.title)) {
    // Outside of Poland
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
      lang="pl"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemsFiltersList={itemsFiltersList}
      map={SvgMap}
    />
  );
};

export default HeraldryPL;
