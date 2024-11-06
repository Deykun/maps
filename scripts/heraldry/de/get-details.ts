import chalk from 'chalk';

import unitFromJSON from '../../../public/data/heraldry/de/unit.json'
import formerUnitFromJSON from '../../../public/data/heraldry/de/formerUnit.json'
import { AdministrativeUnit, CoatOfArmsDetailsData } from '../../../src/topic/Heraldry/types';
import units0JSON from '../../../public/data/heraldry/de/unit-0-details-data.json';
import units1JSON from '../../../public/data/heraldry/de/unit-1-details-data.json';
import units2JSON from '../../../public/data/heraldry/de/unit-2-details-data.json';
import units3JSON from '../../../public/data/heraldry/de/unit-3-details-data.json';
import units4JSON from '../../../public/data/heraldry/de/unit-4-details-data.json';
import units5JSON from '../../../public/data/heraldry/de/unit-5-details-data.json';
import former0UnitJSON from '../../../public/data/heraldry/de/formerUnit-0-details-data.json';
import former1UnitJSON from '../../../public/data/heraldry/de/formerUnit-1-details-data.json';
import former2UnitJSON from '../../../public/data/heraldry/de/formerUnit-2-details-data.json';
import former3UnitJSON from '../../../public/data/heraldry/de/formerUnit-3-details-data.json';

const unitsJSON: CoatOfArmsDetailsData[] = [
	...units0JSON,
	...units1JSON,
	...units2JSON,
	...units3JSON,
	...units4JSON,
];

const formerUnitJSON: CoatOfArmsDetailsData[] = [
	...former0UnitJSON,
	...former1UnitJSON,
	...former2UnitJSON,
	...former3UnitJSON,
];

import { getDetails } from '../utils/get-details';

import { chunkSize } from './constants';

const chunkArg = process.argv.find((arg) => arg.startsWith('chunk='));
const chunkIndex = chunkArg ? Number(chunkArg.replace('chunk=', '')) : undefined;

const getChunkIndex = async (chunkIndex: number, params?: { shouldRemoveTemporaryFiles?: boolean }) => {
	const startIndex = chunkIndex * chunkSize;
	const endIndex = startIndex + chunkSize;

	console.log(`${chalk.green(`Generating chunk ${chunkIndex}`)} (${startIndex} - ${endIndex})`);
	
	const units = unitFromJSON as AdministrativeUnit[]
	const formerUnits = formerUnitFromJSON as AdministrativeUnit[]
	
	getDetails({
		administrativeDivisions: units.slice(startIndex, endIndex),
		alreadyFetchedDivisions: unitsJSON,
		path: 'unit',
		lang: 'de',
		chunkIndex,
		shouldRemoveTemporaryFiles: params?.shouldRemoveTemporaryFiles,
	});

	getDetails({
		administrativeDivisions: formerUnits.slice(startIndex, endIndex),
		alreadyFetchedDivisions: formerUnitJSON,
		path: 'formerUnit',
		lang: 'de',
		chunkIndex,
		shouldRemoveTemporaryFiles: params?.shouldRemoveTemporaryFiles,
	});
}

if (typeof chunkIndex !== 'number' && chunkArg === 'chunk=all') {
	console.log(`${chalk.red('Missing chunk data.')} Add chunk=0 to generate first chunk data. Or chunk=all to generate all.`);

	process.exit();
}

if (typeof chunkIndex === 'number') {
	getChunkIndex(chunkIndex);
}

if (chunkArg === 'chunk=all') {
	await getChunkIndex(0, { shouldRemoveTemporaryFiles: false });
	await getChunkIndex(1, { shouldRemoveTemporaryFiles: false });
	await getChunkIndex(2, { shouldRemoveTemporaryFiles: false });
	await getChunkIndex(3, { shouldRemoveTemporaryFiles: false });
	await getChunkIndex(4, { shouldRemoveTemporaryFiles: false });
	await getChunkIndex(5, { shouldRemoveTemporaryFiles: true });
}

