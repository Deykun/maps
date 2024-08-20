import unitFromJSON from '../../../public/data/heraldry/ee/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/ee/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'unit',
	lang: 'ee',
	subpage: 'eesti-heraldika',
});

fetchImages({
	administrativeDivisions: formerUnits,
	path: 'formerUnit',
	lang: 'ee',
	subpage: 'eesti-heraldika',
});