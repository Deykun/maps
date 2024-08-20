import SvgMap from './components/SvgMap';
import { AdministrativeUnit } from '../../topic/Heraldry/types';

import { getFilter } from '../../topic/Heraldry/utils/getFilter';

import formerKuntaJson from './formerKunta-map.json'
import kuntaJson from './kunta-map.json'
import maakuntaJson from './maakunta-map.json'

import CountryHeraldry from '../../topic/Heraldry/components/CountryHeraldry/CountryHeraldry';

const formerKunta = Object.values(formerKuntaJson);
const kunta = Object.values(kuntaJson);
const maakunta = Object.values(maakuntaJson);

const allUnits: AdministrativeUnit[] = Object.values([
  ...formerKunta,
  ...kunta,
  ...maakunta,
  // ...powiaty,
  // ...miasta,
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
  //   // Outside of country
  //   return false;
  // }

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
const itemFiltersList = getFilter(allUnits, 'items');

const HeraldryFI = () => {
  return (
    <CountryHeraldry
      lang="fi"
      allUnits={allUnits}
      typeFiltersList={typeFiltersList}
      animalFiltersList={animalFiltersList}
      itemFiltersList={itemFiltersList}
      mapWrapperClassName="aspect-[361_/_734]"
      map={SvgMap}
    />
  );
};

export default HeraldryFI;
