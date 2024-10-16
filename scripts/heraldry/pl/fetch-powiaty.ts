import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

import alreadyFetchedJSON from '../../../public/data/heraldry/pl/powiaty.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.powiatyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['powiaty'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	alreadyFetchedDivisions,
	unitNames: ['powiaty'],
	path: './public/data/heraldry/pl/powiaty.json',
});
