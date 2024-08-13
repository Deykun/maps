import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.miastaByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['miasto'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldry/pl/miasta.json',
});
