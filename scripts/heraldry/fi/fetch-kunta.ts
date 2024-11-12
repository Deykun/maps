import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

import alreadyFetchedJSON from '../../../public/data/heraldry/fi/kunta.json';
import alreadyFetchedFormerJSON from '../../../public/data/heraldry/fi/formerKunta.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];
const alreadyFetchedFormerDivisions = alreadyFetchedFormerJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.kuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['kunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));


fetchData({
	administrativeDivisions: administrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedDivisions,
	unitNames: ['kunta'],
	path: './public/data/heraldry/fi/kunta.json',
	country: 'fi',
});

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicKuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['formerKunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));

fetchData({
	administrativeDivisions: formerAdministrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedFormerDivisions,
	unitNames: ['formerKunta'],
	path: './public/data/heraldry/fi/formerKunta.json',
	country: 'fi',
});
