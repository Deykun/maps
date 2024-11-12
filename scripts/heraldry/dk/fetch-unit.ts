import { urls } from './constants';
import { AdministrativeUnit, UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

import alreadyFetchedCurrentJSON from '../../../public/data/heraldry/dk/unit.json';
import alreadyFetchedFormerJSON from '../../../public/data/heraldry/dk/formerUnit.json';

const alreadyFetchedDivisionsCurrent = alreadyFetchedCurrentJSON as AdministrativeUnit[];
const alreadyFetchedDivisionsFormer = alreadyFetchedFormerJSON as AdministrativeUnit[];

const administrativeDivisions: UserScriptDivisionData[] = Object.values(urls.unitBySource).flatMap(division => division).map((unit) => ({
	...unit,
	locationUrl: unit.locationUrl.replace('_(f%C3%B8r_1970)', ''),
}));

const administrativeDivisionsCurrent = administrativeDivisions.filter((unit) => unit.type.some(v => !v.startsWith('former')));
const administrativeDivisionsFormer = administrativeDivisions.filter((unit) => unit.type.every(v => v.startsWith('former')));

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsCurrent,
	alreadyFetchedDivisions: alreadyFetchedDivisionsCurrent,
	path: './public/data/heraldry/dk/unit.json',
	unitNames: ['unit'],
	country: 'dk',
});

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsFormer,
	alreadyFetchedDivisions: alreadyFetchedDivisionsFormer,
	path: './public/data/heraldry/dk/formerUnit.json',
	unitNames: ['formerUnit'],
	country: 'dk',
});
