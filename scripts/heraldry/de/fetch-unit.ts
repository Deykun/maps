import { urls } from './constants';
import { AdministrativeUnit, UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

import alreadyFetchedJSON from '../../../public/data/heraldry/de/unit.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: UserScriptDivisionData[] = Object.values(urls.unitBySource).flatMap(division => division);

const administrativeDivisionsToCheck = administrativeDivisions.filter(({ type }) => type.some((v) => !v.startsWith('former')));

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsToCheck,
	alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/de/unit.json',
	unitNames: ['unit'],
	country: 'de',
});
