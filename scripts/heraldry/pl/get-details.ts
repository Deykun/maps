import gminyFromJSON from '../../../public/data/heraldry/pl/gminy.json'
import miastaFromJSON from '../../../public/data/heraldry/pl/miasta.json'
import powiatyFromJSON from '../../../public/data/heraldry/pl/powiaty.json'
import wojewodztwaFromJSON from '../../../public/data/heraldry/pl/wojewodztwa.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getDetails } from '../utils/get-details';

const gminy = gminyFromJSON as AdministrativeUnit[]
const miasta = miastaFromJSON as AdministrativeUnit[]
const powiaty = powiatyFromJSON as AdministrativeUnit[]
const wojewodztwa = wojewodztwaFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: gminy,
	path: 'gminy',
	lang: 'pl',
});

getDetails({
	administrativeDivisions: miasta,
	path: 'miasta',
	lang: 'pl',
});

getDetails({
	administrativeDivisions: powiaty,
	path: 'powiaty',
	lang: 'pl',
});

getDetails({
	administrativeDivisions: wojewodztwa,
	path: 'wojewodztwa',
	lang: 'pl',
});
