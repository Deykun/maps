import unitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'formerUnit',
	lang: 'de',
	subpage: 'deutsche-heraldik',
});
