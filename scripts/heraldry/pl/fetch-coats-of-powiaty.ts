import powiatyFromJSON from '../../../public/data/heraldyka/powiaty.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const powiaty = powiatyFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: powiaty,
	path: 'powiaty',
});
