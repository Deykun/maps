import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.valdByMaakond).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['vald'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldry/vald.json',
	lang: 'et',
});
