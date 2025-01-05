import miastaFromJSON from '../../../public/data/heraldry/pl/miasta.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const miasta = miastaFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: miasta,
	path: 'miasta',
	country: 'pl',
});
