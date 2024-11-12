import unitFromJSON from '../../../public/data/heraldry/dk/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/dk/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getDetails } from '../utils/get-details';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: units,
	path: 'unit',
	country: 'dk',
});

getDetails({
	administrativeDivisions: formerUnits,
	path: 'formerUnit',
	country: 'dk',
});
