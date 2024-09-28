import { urls } from './constants';
import { UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

// import alreadyFetchedJSON from '../../../public/data/heraldry/de/unit.json';
// import alreadyFetchedFormerJSON from '../../../public/data/heraldry/de/formerUnit.json';

// const alreadyFetchedDivisions = alreadyFetchedJSON as UserScriptDivisionData[];
// const alreadyFetchedFormerDivisions = alreadyFetchedFormerJSON as UserScriptDivisionData[];

const administrativeDivisions: UserScriptDivisionData[] = Object.values(urls.unitBySource).flatMap(division => division);

// Not former units
// const administrativeDivisionsToCheck = administrativeDivisions.filter(({ type }) => type.some((v) => !v.startsWith('former')));

// TODO: remove
const administrativeDivisionsToCheck = administrativeDivisions;

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsToCheck,
	// alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/de/unit.json',
	unitNames: ['unit'],
	lang: 'de',
});
