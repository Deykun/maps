import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/pl/gminy.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.gminyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['gmina'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	alreadyFetchedDivisions,
	path: './public/data/heraldry/pl/gminy.json',
});
