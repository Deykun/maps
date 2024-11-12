import { urls } from './constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data-smart';

import alreadyFetchedJSON from '../../../public/data/heraldry/et/unit.json';
import alreadyFetchedFormerJSON from '../../../public/data/heraldry/et/formerUnit.json';

const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];
const alreadyFetchedFormerDivisions = alreadyFetchedFormerJSON as AdministrativeUnit[];

const administrativeDivisions: AdministrativeUnit[] = Object.values(urls.unitBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['unit'], partOf: title }
	),
));

await fetchData({
	administrativeDivisions: administrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/et/unit.json',
	unitNames: ['unit'],
	country: 'et',
});

const formerAdministrativeDivisions: AdministrativeUnit[] = Object.values(urls.historicUnitBySource).flatMap(
	({ title, urls }) => urls.map(
		(unit) => ({ ...unit, type: ['formerUnit'], partOf: title }
	),
));

await fetchData({
	administrativeDivisions: formerAdministrativeDivisions,
	alreadyFetchedDivisions: alreadyFetchedFormerDivisions,
	path: './public/data/heraldry/et/formerUnit.json',
	unitNames: ['formerUnit'],
	country: 'et',
});