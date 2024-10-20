import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit, CoatOfArmsDetailsData } from '../../../src/topic/Heraldry/types';
import unitsJSON from '../../../public/data/heraldry/de/unit-details-data.json';
import formerUnitJSON from '../../../public/data/heraldry/de/formerUnit-details-data.json';

import { getDetails } from '../utils/get-details';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: units,
	alreadyFetchedDivisions: unitsJSON as CoatOfArmsDetailsData[],
	path: 'unit',
	lang: 'de',
});

getDetails({
	administrativeDivisions: formerUnits,
	alreadyFetchedDivisions: formerUnitJSON as CoatOfArmsDetailsData[],
	path: 'formerUnit',
	lang: 'de',
});
