import { getSprites } from '../utils/web';

import gminyJson from '../../../public/data/heraldry/pl/gminy-map-data.json';
import miastaJson from '../../../public/data/heraldry/pl/miasta-map-data.json';
import powiatyJSON from '../../../public/data/heraldry/pl/powiaty-map-data.json';
import wojewodztwaJSON from '../../../public/data/heraldry/pl/wojewodztwa-map-data.json';

getSprites({
  mapJSON: gminyJson,
  type: 'gminy',
  country: 'pl',
});

getSprites({
  mapJSON: powiatyJSON,
  type: 'powiaty',
  country: 'pl',
});

getSprites({
  mapJSON: miastaJson,
  type: 'miasta',
  country: 'pl',
});

getSprites({
  mapJSON: wojewodztwaJSON,
  type: 'wojewodztwa',
  country: 'pl',
});