import { getSprites } from '../utils/web';

import unitJSON from '../../../public/data/heraldry/et/unit-map.json';
import formerUnitJSON from '../../../public/data/heraldry/et/formerUnit-map.json';

getSprites({
  mapJSON: unitJSON,
  type: 'unit',
  lang: 'et',
});

getSprites({
  mapJSON: formerUnitJSON,
  type: 'formerUnit',
  lang: 'et',
});
