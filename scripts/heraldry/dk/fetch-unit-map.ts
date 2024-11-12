import unitFromJSON from '../../../public/data/heraldry/dk/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/dk/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'unit',
	lang: 'dk',
});

fetchImages({
	administrativeDivisions: formerUnits,
	path: 'formerUnit',
	lang: 'dk',
});
