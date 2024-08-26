import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/ee/unit.json';
import alreadyFetchedFormerJSON from '../../../public/data/heraldry/ee/formerUnit.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];
const alreadyFetchedFormerDivisions = alreadyFetchedFormerJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.unitBySource).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['unit'], partOf: title }
	),
));

fetchData({
	administrativeDivisions: administrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/ee/unit.json',
	unitNames: ['unit'],
	lang: 'et',
});

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicUnitBySource).flatMap(
	({ title, urls }) => urls.map(
		(gmina) => ({ ...gmina, type: ['formerUnit'], partOf: title }
	),
));

fetchData({
	administrativeDivisions: formerAdministrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedFormerDivisions,
	path: './public/data/heraldry/ee/formerUnit.json',
	unitNames: ['formerUnit'],
	lang: 'et',
});