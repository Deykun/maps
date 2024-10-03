import chalk from 'chalk';
import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesUnit = fs.readdirSync('./public/images/heraldry/de/unit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/de/unit/${imageFile}`, imageFile, type: 'unit' }),
);

const imagesFormerUnit = fs.readdirSync('./public/images/heraldry/de/formerUnit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/de/formerUnit/${imageFile}`, imageFile, type: 'formerUnit' }),
);

const images = [...imagesUnit, ...imagesFormerUnit];

const chunkSize = 2500;

const chunkArg = process.argv.find((arg) => arg.startsWith('chunk='));
const chunkIndex = chunkArg ? Number(chunkArg.replace('chunk=', '')) : undefined;

if (typeof chunkIndex !== 'number') {
	console.log(`${chalk.red('Missing chunk data.')} Add chunk=0 to generate first chunk data.`);

	process.exit();
}

const startIndex = chunkIndex * chunkSize;
const endIndex = startIndex + chunkSize;

resizeImages({
	images: images.slice(startIndex, endIndex),
  lang: 'de',
});