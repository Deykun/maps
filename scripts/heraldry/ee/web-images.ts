import { getSprites } from '../utils/web';

import unitJSON from '@/pages/eesti-heraldika/unit-map.json';
import formerUnitJSON from '@/pages/eesti-heraldika/formerUnit-map.json';

getSprites({
  mapJSON: unitJSON,
  type: 'unit',
  lang: 'ee',
});

getSprites({
  mapJSON: formerUnitJSON,
  type: 'formerUnit',
  lang: 'ee',
});
