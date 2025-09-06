import { getSprites } from '../utils/web';

import kuntaJson from '../../../public/data/heraldry/fi/kunta-map-data.json';
import formerKuntaJson from '../../../public/data/heraldry/fi/formerKunta-map-data.json';
import maakuntaJson from '../../../public/data/heraldry/fi/maakunta-map-data.json';

getSprites({
  mapJSON: kuntaJson,
  type: 'kunta',
  country: 'fi',
});

getSprites({
  mapJSON: formerKuntaJson,
  type: 'formerKunta',
  country: 'fi',
});

getSprites({
  mapJSON: maakuntaJson,
  type: 'maakunta',
  country: 'fi',
});
