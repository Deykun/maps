import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/fi/maakunta.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.maakuntaBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['maakunta'], partOf: title }
	),
)).filter((unit) => unit.title.endsWith('vaakuna'));

fetchData({
	administrativeDivisions: administrativeDivisions,
	alreadyFetchedDivisions,
	unitNames: ['maakunta'],
	path: './public/data/heraldry/fi/maakunta.json',
	lang: 'fi',
});
