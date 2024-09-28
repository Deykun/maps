import { getSprites } from '../utils/web';

import unitJSON from '../../../public/data/heraldry/de/unit-map.json';
import formerUnitJSON from '../../../public/data/heraldry/de/formerUnit-map.json';

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
