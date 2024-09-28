import { UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { urls as urlBadenWurttemberg } from './constantsForRegions/baden-wurttemberg';
import { urls as urlsBayern } from './constantsForRegions/bayern';

export const urls: {
  unitBySource: {
    [source: string]: UserScriptDivisionData[],
  },
} = {
  unitBySource: {},
};

urls.unitBySource = {
  ...urlBadenWurttemberg.unitBySource,
  ...urlsBayern.unitBySource,
};
