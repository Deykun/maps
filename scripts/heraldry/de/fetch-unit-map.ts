import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'unit',
	lang: 'de',
	subpage: 'deutsche-heraldik',
});
