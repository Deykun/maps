import { getSprites } from '../utils/web';

import kuntaJson from '../../../public/data/heraldry/fi/kunta-map.json';
import formerKuntaJson from '../../../public/data/heraldry/fi/formerKunta-map.json';
import maakuntaJson from '../../../public/data/heraldry/fi/maakunta-map.json';

getSprites({
  mapJSON: kuntaJson,
  type: 'kunta',
  lang: 'fi',
});

getSprites({
  mapJSON: formerKuntaJson,
  type: 'formerKunta',
  lang: 'fi',
});

getSprites({
  mapJSON: maakuntaJson,
  type: 'maakunta',
  lang: 'fi',
});
