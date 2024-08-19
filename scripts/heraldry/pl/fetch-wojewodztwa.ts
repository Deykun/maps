import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/pl/wojewodztwa.json';
// 
const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values([urls.herbyWojewodztw]).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['wojewodztwa'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	alreadyFetchedDivisions,
	unitNames: ['wojewodztwa'],
	path: './public/data/heraldry/pl/wojewodztwa.json',
});
