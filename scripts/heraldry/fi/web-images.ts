import { getSprites } from '../utils/web';

import kuntaJson from '../../../src/pages/suomalainen-heraldikka/kunta-map.json';
import formerKuntaJson from '../../../src/pages/suomalainen-heraldikka/formerKunta-map.json';
import maakuntaJson from '../../../src/pages/suomalainen-heraldikka/maakunta-map.json';

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
