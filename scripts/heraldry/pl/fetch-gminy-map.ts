import gminyFromJSON from '../../../public/data/heraldry/pl/gminy.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const gminy = gminyFromJSON as AdministrativeUnit[];

fetchImages({
	administrativeDivisions: gminy,
	path: 'gminy',
  lang: 'pl',
});
