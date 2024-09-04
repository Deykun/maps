import { getSprites } from '../utils/web';

import gminyJson from '../../../public/data/heraldry/pl/gminy-map.json';
import miastaJson from '../../../public/data/heraldry/pl/miasta-map.json';
import powiatyJSON from '../../../public/data/heraldry/pl/powiaty-map.json';
import wojewodztwaJSON from '../../../public/data/heraldry/pl/wojewodztwa-map.json';

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