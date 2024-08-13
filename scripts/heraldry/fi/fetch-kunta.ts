import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.kuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['kunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));

// const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicUnitBySource).flatMap(
// 	({ title, urls }) => urls.map(
// 		(gmina) => ({ ...gmina, type: ['formerUnit'], partOf: title }
// 	),
// ));

const formerAdministrativeDivisions: AdministrativeUnit[] = [];

fetchData({
	administrativeDivisions: [...formerAdministrativeDivisions, ...administrativeDivisions],
	path: './public/data/heraldry/fi/kunta.json',
	lang: 'fi',
});
