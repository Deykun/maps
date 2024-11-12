import unitFromJSON from '../../../public/data/heraldry/fi/kunta.json'
import formerUnitFromJSON from '../../../public/data/heraldry/fi/formerKunta.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'kunta',
	country: 'fi',
});

fetchImages({
	administrativeDivisions: formerUnits,
	path: 'formerKunta',
	country: 'fi',
});