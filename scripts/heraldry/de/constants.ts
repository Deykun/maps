import { UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { urls as urlRegion0 } from './constantsForRegions/baden-wurttemberg';
import { urls as urlRegion1 } from './constantsForRegions/bayern';
import { urls as urlRegion2 } from './constantsForRegions/berlin';
import { urls as urlRegion3 } from './constantsForRegions/brandenburg';
import { urls as urlRegion4 } from './constantsForRegions/freie-hansestadt-bremen';
import { urls as urlRegion5 } from './constantsForRegions/hamburg';
import { urls as urlRegion6 } from './constantsForRegions/hessen';
import { urls as urlRegion7 } from './constantsForRegions/mecklenburg-vorpommern';
import { urls as urlRegion8 } from './constantsForRegions/niedersachsen';
import { urls as urlRegion9 } from './constantsForRegions/nordrhein-westfalen';
import { urls as urlRegion10 } from './constantsForRegions/rheinland-pfalz';
import { urls as urlRegion11 } from './constantsForRegions/saarland';
import { urls as urlRegion12 } from './constantsForRegions/sachsen-anhalt';
import { urls as urlRegion13 } from './constantsForRegions/sachsen';
import { urls as urlRegion14 } from './constantsForRegions/schleswig-holstein';
import { urls as urlRegion15 } from './constantsForRegions/thuringen';

export const chunkSize = 2500;

export const urls: {
  unitBySource: {
    [source: string]: UserScriptDivisionData[],
  },
} = {
  unitBySource: {},
};

urls.unitBySource = {
  ...urlRegion0.unitBySource,
  ...urlRegion1.unitBySource,
  ...urlRegion2.unitBySource,
  ...urlRegion3.unitBySource,
  ...urlRegion4.unitBySource,
  ...urlRegion5.unitBySource,
  ...urlRegion6.unitBySource,
  ...urlRegion7.unitBySource,
  ...urlRegion8.unitBySource,
  ...urlRegion9.unitBySource,
  ...urlRegion10.unitBySource,
  ...urlRegion11.unitBySource,
  ...urlRegion12.unitBySource,
  ...urlRegion13.unitBySource,
  ...urlRegion14.unitBySource,
  ...urlRegion15.unitBySource,
};
