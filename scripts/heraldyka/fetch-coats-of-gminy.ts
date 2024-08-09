import gminyFromJSON from '../../public/data/heraldyka/gminy.json'
import { AdministrativeUnit } from '../../src/pages/heraldyka/constants';

import { fetchImages } from './utils/fetch-images';

const gminy = gminyFromJSON as AdministrativeUnit[];

fetchImages({
	administrativeDivisions: gminy,
	path: 'gminy',
});
