import { getSprites } from '../utils/web';

import fylkerJSON from '../../../public/data/heraldry/no/fylker-map-data.json';
import formerFylkerJSON from '../../../public/data/heraldry/no/formerFylker-map-data.json';
import kommuneJSON from '../../../public/data/heraldry/no/kommune-map-data.json';

getSprites({
  mapJSON: fylkerJSON,
  type: 'fylker',
  country: 'no',
});

getSprites({
  mapJSON: formerFylkerJSON,
  type: 'formerFylker',
  country: 'no',
});

getSprites({
  mapJSON: kommuneJSON,
  type: 'kommune',
  country: 'no',
});
