import { getSprites } from '../utils/web';

import kuntaJson from '@/pages/suomalainen-heraldikka/kunta-map.json';
import formerKuntaJson from '@/pages/suomalainen-heraldikka/formerKunta-map.json';
import maakuntaJson from '@/pages/suomalainen-heraldikka/maakunta-map.json';

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
