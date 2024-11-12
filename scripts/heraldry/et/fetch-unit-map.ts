import unitFromJSON from '../../../public/data/heraldry/et/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/et/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'unit',
	country: 'et',
});

fetchImages({
	administrativeDivisions: formerUnits,
	path: 'formerUnit',
	country: 'et',
});
