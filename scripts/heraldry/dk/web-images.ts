import * as fsExtra from "fs-extra";

import { getSprites } from '../utils/web';

import unitJSON from '../../../public/data/heraldry/dk/unit-map-data.json';
import formerUnitJSON from '../../../public/data/heraldry/dk/formerUnit-map-data.json';

fsExtra.emptyDirSync(`./public/images/heraldry/dk/web/temp/`);

getSprites({
  mapJSON: unitJSON,
  type: 'unit',
  lang: 'dk',
});

getSprites({
  mapJSON: formerUnitJSON,
  type: 'formerUnit',
  lang: 'dk',
});
