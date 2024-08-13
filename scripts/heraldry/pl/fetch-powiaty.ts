import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.powiatyByWojewodztwo).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['powiat'], partOf: title }
	),
));

fetchData({
	administrativeDivisions,
	path: './public/data/heraldry/pl/powiaty.json',
});
