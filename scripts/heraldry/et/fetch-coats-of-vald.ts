import valdFromJSON from '../../../public/data/heraldry/et/vald.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const vald = valdFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: vald,
	path: 'vald',
	lang: 'et',
	subpage: 'eesti-heraldika',
});
