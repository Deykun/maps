import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getDetails } from '../utils/get-details';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: units,
	path: 'unit',
	lang: 'de',
});

getDetails({
	administrativeDivisions: formerUnits,
	path: 'formerUnit',
	lang: 'de',
});
