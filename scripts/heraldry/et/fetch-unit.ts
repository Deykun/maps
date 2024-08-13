import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-new';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.unitBySource).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['unit'], partOf: title }
	),
));

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicUnitBySource).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['formerUnit'], partOf: title }
	),
));

fetchData({
	administrativeDivisions: [...formerAdministrativeDivisions, ...administrativeDivisions],
	path: './public/data/heraldry/et/unit.json',
	lang: 'et',
});
