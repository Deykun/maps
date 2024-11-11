import { urls } from './constants';
import { AdministrativeUnit, UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

import alreadyFetchedJSON from '../../../public/data/heraldry/no/kommune.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: UserScriptDivisionData[] = Object.values(urls.kommuneBySource).flatMap(division => division);

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/no/kommune.json',
	unitNames: ['kommune'],
	lang: 'no',
});
