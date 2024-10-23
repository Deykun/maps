import chalk from 'chalk';

import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit, CoatOfArmsDetailsData } from '../../../src/topic/Heraldry/types';
import unitsJSON from '../../../public/data/heraldry/de/unit-details-data.json';
import formerUnitJSON from '../../../public/data/heraldry/de/formerUnit-details-data.json';

import { getDetails } from '../utils/get-details';

import { chunkSize } from './constants';

const chunkArg = process.argv.find((arg) => arg.startsWith('chunk='));
const chunkIndex = chunkArg ? Number(chunkArg.replace('chunk=', '')) : undefined;

if (typeof chunkIndex !== 'number') {
	console.log(`${chalk.red('Missing chunk data.')} Add chunk=0 to generate first chunk data.`);

	process.exit();
}

const startIndex = chunkIndex * chunkSize;
const endIndex = startIndex + chunkSize;

console.log(`${chalk.green(`Generating chunk ${chunkIndex}`)} (${startIndex} - ${endIndex})`);

const units = unitFromJSON as AdministrativeUnit[]
const formerUnits = formerUnitFromJSON as AdministrativeUnit[]

getDetails({
	administrativeDivisions: units.slice(startIndex, endIndex),
	alreadyFetchedDivisions: unitsJSON as CoatOfArmsDetailsData[],
	path: 'unit',
	lang: 'de',
	chunkIndex,
});

getDetails({
	administrativeDivisions: formerUnits.slice(startIndex, endIndex),
	alreadyFetchedDivisions: formerUnitJSON as CoatOfArmsDetailsData[],
	path: 'formerUnit',
	lang: 'de',
	chunkIndex,
});
