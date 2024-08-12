import powiatyFromJSON from '../../public/data/heraldyka/powiaty.json'
import { AdministrativeUnit } from '../../src/pages/heraldyka/constants';

import { fetchImages } from './utils/fetch-images';

const powiaty = powiatyFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: powiaty,
	path: 'powiaty',
});
