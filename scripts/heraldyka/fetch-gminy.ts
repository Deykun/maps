import { urls, AdministrativeUnit } from '../../src/pages/heraldyka/constants';

import { fetchData } from './utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.gminyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['gmina'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldyka/gminy.json',
});
