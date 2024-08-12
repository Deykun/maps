import { urls, AdministrativeUnit } from '../../src/pages/heraldyka/constants';

import { fetchData } from './utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.powiatyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['powiat'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldyka/powiaty.json',
});
