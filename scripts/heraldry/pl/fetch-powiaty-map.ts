import powiatyFromJSON from '../../../public/data/heraldry/pl/powiaty.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const powiaty = powiatyFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: powiaty,
	path: 'powiaty',
  country: 'pl',
});
