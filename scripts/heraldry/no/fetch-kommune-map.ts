import unitsFromJSON from '../../../public/data/heraldry/no/kommune.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitsFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'kommune',
  lang: 'no',
});
