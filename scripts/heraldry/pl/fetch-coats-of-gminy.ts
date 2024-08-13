import gminyFromJSON from '../../../public/data/heraldyka/gminy.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const gminy = gminyFromJSON as AdministrativeUnit[];

fetchImages({
	administrativeDivisions: gminy,
	path: 'gminy',
});
