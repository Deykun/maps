import unitsFromJSON from '../../../public/data/heraldry/no/fylker.json'
import formerUnitsFromJSON from '../../../public/data/heraldry/no/formerFylker.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

const units = unitsFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitsFromJSON as AdministrativeUnit[]

fetchImages({
	administrativeDivisions: units,
	path: 'fylker',
  country: 'no',
});

fetchImages({
	administrativeDivisions: formerUnits,
	path: 'formerFylker',
  country: 'no',
});

