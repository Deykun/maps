import { urls } from './constants';
import { AdministrativeUnit, UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { fetchData } from '../utils/fetch-data';

// import alreadyFetchedJSON from '../../../public/data/heraldry/no/fylker.json';

// const alreadyFetchedDivisions = alreadyFetchedJSON as AdministrativeUnit[];

const administrativeDivisions: UserScriptDivisionData[] = Object.values(urls.fylkerBySource).flatMap(division => division).map((unit) => ({
	...unit,
	locationName: unit.locationName.replace('svåpen', ''),
	locationUrl: unit.locationUrl.replace('sv%C3%A5pen', '').replace('s_', '_'),
}));

const administrativeDivisionsCurrent = administrativeDivisions.filter((unit) => unit.type.some(v => !v.startsWith('former')));
const administrativeDivisionsFormer = administrativeDivisions.filter((unit) => unit.type.every(v => v.startsWith('former')));

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsCurrent,
	// alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/no/fylker.json',
	unitNames: ['fylker'],
	lang: 'no',
});

fetchData({
  isFromUserScript: true,
	administrativeDivisions: administrativeDivisionsFormer,
	// alreadyFetchedDivisions: alreadyFetchedDivisions,
	path: './public/data/heraldry/no/formerFylker.json',
	unitNames: ['formerFylker'],
	lang: 'no',
});
