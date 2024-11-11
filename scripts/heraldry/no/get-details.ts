import flykerFromJSON from '../../../public/data/heraldry/no/fylker.json';
import formerFlykerFromJSON from '../../../public/data/heraldry/no/formerFylker.json';
import kommuneFromJSON from '../../../public/data/heraldry/no/kommune.json';

import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getDetails } from '../utils/get-details';

const fylker = flykerFromJSON as AdministrativeUnit[]
const formerFylker = formerFlykerFromJSON as AdministrativeUnit[]
const kommune = kommuneFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: fylker,
	path: 'fylker',
	lang: 'no',
});

getDetails({
	administrativeDivisions: formerFylker,
	path: 'formerFylker',
	lang: 'no',
});

getDetails({
	administrativeDivisions: kommune,
	path: 'kommune',
	lang: 'no',
});
