import chalk from 'chalk';

import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { fetchImages } from '../utils/fetch-images';

import { chunkSize } from './constants';

const units = unitFromJSON as AdministrativeUnit[];

const chunkArg = process.argv.find((arg) => arg.startsWith('chunk='));
const chunkIndex = chunkArg ? Number(chunkArg.replace('chunk=', '')) : undefined;

if (typeof chunkIndex !== 'number') {
	console.log(`${chalk.red('Missing chunk data.')} Add chunk=0 to generate first chunk data.`);

	process.exit();
}

const startIndex = chunkIndex * chunkSize;
const endIndex = startIndex + chunkSize;

console.log(`${chalk.green(`Generating chunk ${chunkIndex}`)} (${startIndex} - ${endIndex}) (${units.length} total)`);

fetchImages({
	administrativeDivisions: units.slice(startIndex, endIndex),
	path: 'unit',
	country: 'de',
	chunkIndex,
});
