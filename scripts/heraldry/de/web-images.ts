import { getSprites } from '../utils/web';

import unit0JSON from '../../../public/data/heraldry/de/unit-map-0.json';
import unit1JSON from '../../../public/data/heraldry/de/unit-map-1.json';
import unit2JSON from '../../../public/data/heraldry/de/unit-map-2.json';
import unit3JSON from '../../../public/data/heraldry/de/unit-map-3.json';
import former0UnitJSON from '../../../public/data/heraldry/de/formerUnit-map-0.json';
import former1UnitJSON from '../../../public/data/heraldry/de/formerUnit-map-1.json';
import former2UnitJSON from '../../../public/data/heraldry/de/formerUnit-map-2.json';

const unitJSON = {
  ...unit0JSON,
  ...unit1JSON,
  ...unit2JSON,
  ...unit3JSON,
};

const formerUnitJSON = {
  ...former0UnitJSON,
  ...former1UnitJSON,
  ...former2UnitJSON,
};

getSprites({
  mapJSON: unitJSON,
  type: 'unit',
  lang: 'de',
});

getSprites({
  mapJSON: formerUnitJSON,
  type: 'formerUnit',
  lang: 'de',
});
