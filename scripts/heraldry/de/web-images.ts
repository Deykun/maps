import { getSprites } from '../utils/web';

import unit0JSON from '../../../public/data/heraldry/de/unit-0-map.json';
import unit1JSON from '../../../public/data/heraldry/de/unit-1-map.json';
import unit2JSON from '../../../public/data/heraldry/de/unit-2-map.json';
import unit3JSON from '../../../public/data/heraldry/de/unit-3-map.json';
import former0UnitJSON from '../../../public/data/heraldry/de/formerUnit-0-map.json';
import former1UnitJSON from '../../../public/data/heraldry/de/formerUnit-1-map.json';
import former2UnitJSON from '../../../public/data/heraldry/de/formerUnit-2-map.json';
import former3UnitJSON from '../../../public/data/heraldry/de/formerUnit-3-map.json';

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
  ...former3UnitJSON,
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
