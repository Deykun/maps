import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/fi/kunta.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.kuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['kunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicKuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['formerKunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));

fetchData({
	administrativeDivisions: [...formerAdministrativeDivisions, ...administrativeDivisions],
	alreadyFetchedDivisions,
	unitNames: ['kunta'],
	path: './public/data/heraldry/fi/kunta.json',
	lang: 'fi',
});
