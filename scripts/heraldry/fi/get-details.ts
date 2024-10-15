import kuntaFromJSON from '../../../public/data/heraldry/fi/kunta.json'
import formerKuntaFromJSon from '../../../public/data/heraldry/fi/formerKunta.json'
import maakuntaFromJSon from '../../../public/data/heraldry/fi/maakunta.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getDetails } from '../utils/get-details';

const kunta = kuntaFromJSON as AdministrativeUnit[];
const formerKunta = formerKuntaFromJSon as AdministrativeUnit[];
const maakunta = maakuntaFromJSon as AdministrativeUnit[];

getDetails({
	administrativeDivisions: kunta,
	path: 'kunta',
	lang: 'fi',
});

getDetails({
	administrativeDivisions: formerKunta,
	path: 'formerKunta',
	lang: 'fi',
});

getDetails({
	administrativeDivisions: maakunta,
	path: 'maakunta',
	lang: 'fi',
});
