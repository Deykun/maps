import { urls, AdministrativeUnit } from '../../src/pages/heraldyka/constants';

import { fetchData } from './utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.miastaByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: 'miasto', partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldyka/miasta.json',
});
