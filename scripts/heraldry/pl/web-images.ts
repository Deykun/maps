import { getSprites } from '../utils/web';

import gminyJson from '../../../src/pages/heraldyka/gminy-map.json';
import miastaJson from '../../../src/pages/heraldyka/miasta-map.json';
import powiatyJSON from '../../../src/pages/heraldyka/powiaty-map.json';
import wojewodztwaJSON from '../../../src/pages/heraldyka/wojewodztwa-map.json';

getSprites({
  mapJSON: gminyJson,
  type: 'gminy',
  lang: 'pl',
});

getSprites({
  mapJSON: powiatyJSON,
  type: 'powiaty',
  lang: 'pl',
});

getSprites({
  mapJSON: miastaJson,
  type: 'miasta',
  lang: 'pl',
});

getSprites({
  mapJSON: wojewodztwaJSON,
  type: 'wojewodztwa',
  lang: 'pl',
});