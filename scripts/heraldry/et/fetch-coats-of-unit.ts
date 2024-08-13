import valdFromJSON from '../../../public/data/heraldry/et/unit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const vald = valdFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: vald,
	path: 'unit',
	lang: 'et',
	subpage: 'eesti-heraldika',
});
