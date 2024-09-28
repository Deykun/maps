import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
// import formerUnitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]
// const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'unit',
	lang: 'de',
	subpage: 'deutsche-heraldik',
});

// fetchImages({
// 	administrativeDivisions: formerUnits,
// 	path: 'formerUnit',
// 	lang: 'et',
// 	subpage: 'eesti-heraldika',
// });