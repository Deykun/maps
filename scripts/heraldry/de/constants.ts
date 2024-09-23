import { AdministrativeUnitsGroup } from '../../../src/topic/Heraldry/types';

export const urls: {
  unitBySource: {
    [source: string]: AdministrativeUnitsGroup,
  },
  historicUnitBySource: {
    [source: string]: AdministrativeUnitsGroup,
  }
} = {
  unitBySource: {},
  historicUnitBySource: {},
};