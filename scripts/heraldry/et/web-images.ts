import * as fsExtra from "fs-extra";

import { getSprites } from '../utils/web';

import unitJSON from '../../../public/data/heraldry/et/unit-map-data.json';
import formerUnitJSON from '../../../public/data/heraldry/et/formerUnit-map-data.json';

fsExtra.emptyDirSync(`./public/images/heraldry/et/web/temp/`);

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
