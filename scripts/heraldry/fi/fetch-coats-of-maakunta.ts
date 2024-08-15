import unitFromJSON from '../../../public/data/heraldry/fi/maakunta.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'maakunta',
	lang: 'fi',
	subpage: 'suomalainen-heraldikka',
});
