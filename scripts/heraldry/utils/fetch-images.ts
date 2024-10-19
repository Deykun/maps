import {
  existsSync,
  writeFileSync,
  mkdirSync,
} from "fs";
import sharp from 'sharp';
import chalk from 'chalk';
import pLimit from 'p-limit';

import { AdministrativeUnit, CoatOfArmsMapData } from '../../../src/topic/Heraldry/types';

import { clearLastLines } from './helpers/console';
import { getImageFileName, getCompressedImageSrc } from './helpers/images';

export const download = async (url: string, fileName: string, format: string, path: string, lang: string) => {
  const response = await fetch(url);

  const blob = await response.blob();
  const bos = Buffer.from(await blob.arrayBuffer())

  const trimOptions = {
    threshold: 0,
  };

  await sharp(bos).trim(trimOptions).resize(80, 80, {
    fit: 'contain',
    position: 'center',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).toFile(`./public/images/heraldry/${lang}/${path}/${fileName}-80w.webp`).catch((error) => {
    console.log(chalk.bgRedBright([
      '✘',
      `resize and save downloaded image error ${url}`,
      `(expected filename: ${`./public/images/heraldry/${lang}/${path}/${fileName}-80w.webp`})`,
    ].join(' ')));
    console.log(error);
  });

  await sharp(bos).trim(trimOptions).resize(320, 320, {
    fit: 'contain',
    position: 'center',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).toFile(`./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`).catch((error) => {
    console.log(chalk.bgRedBright([
      '✘',
      `resize and save downloaded image error ${url}`,
      `(expected filename: ${`./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`})`,
    ].join(' ')));
    console.log(error);
  });
};

const start = (new Date()).getTime();
global.processed = typeof global.processed === 'object' ? global.processed : {};

export const fetchImages = async ({
  administrativeDivisions,
  path,
  lang,
  chunkIndex,
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
  lang: string,
  chunkIndex?: number,
}) => {
  const contentToSaveForMap: CoatOfArmsMapData[] = [];
  const contentToSaveForDevMode = {};
  global.processed[path] = 0;
  let failed = 0;

  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(`${chalk.blue(total)} coats to fetch (${chalk.yellow(path)}).`);
  console.log(' ');

  if (total === 0) {
    return;
  }

  if (!existsSync(`./public/images/heraldry/${lang}/${path}`)) {
    mkdirSync(`./public/images/heraldry/${lang}/${path}`);
  }

  const getTimeStatus = () => {
    const progressPercent = (global.processed[path] / total) * 100;
    const now = (new Date()).getTime();
    const timeDiffrenceInSeconds = Math.floor((now - start) / 1000);
    const timePerPercentage = timeDiffrenceInSeconds / progressPercent;
    const expectedTimeInSeconds = Math.floor(timePerPercentage * 100);
    const timeLeftSeconds = Math.floor(expectedTimeInSeconds - timeDiffrenceInSeconds);
    const timeLeftMinutes = Math.floor(timeLeftSeconds / 60);
    const timeLeftSecondsToShow = timeLeftSeconds - (timeLeftMinutes * 60);
    const timeStatus = timeDiffrenceInSeconds === 0 ? '' : `${chalk.blue(`${timeLeftMinutes > 0 ? `${timeLeftMinutes}m `: ''}${timeLeftSecondsToShow}s`)} to finish.`;

    return timeStatus;
  }

  const limit = pLimit(4);

  const promises = administrativeDivisions.map((division: AdministrativeUnit , i) => limit(() => new Promise((resolve) => {
    const fetchAndProcess = async () => {
      const unit = administrativeDivisions[i];
      const fileName = getImageFileName(unit);

      const expectedFilePath = `./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`;

      const format = unit.image?.source?.split('.')?.at(-1)?.toLowerCase() || 'png';

      if (unit.image?.source) {
        if (!existsSync(expectedFilePath)) {
          await download(unit.image?.source, fileName, format, path, lang)

          if (i > 0) {
            clearLastLines(3);
          }

          global.processed[path] = global.processed[path] + 1;

          console.log([
            chalk.green('✓'),
            `fetched "${chalk.white(unit.title)}"`,
            chalk.gray(`(${format} - index: ${chalk.white(unit.index)})`),
          ].join(' '));
        } else {
          if (i > 0) {
            clearLastLines(3);
          }

          console.log([
            chalk.green('✓'),
            chalk.gray(`skipping "${chalk.white(unit.title)}"`),
            chalk.gray(`(${format} - index: ${chalk.white(unit.index)})`),
          ].join(' '));

          global.processed[path] = global.processed[path] + 1;
        }

        const {
          imagesList,
        } = getCompressedImageSrc(`images/heraldry/${lang}/${path}/${fileName}.webp`, path);

        if (!unit.place?.coordinates?.lat || !unit.place?.coordinates?.lon) {
          console.log(`${chalk.yellow(unit.title)} doesn't have the ${chalk.red('location')}.`);
        }

        // TODO: move to separate process
        contentToSaveForDevMode[unit.id] = {
          id: unit.id || '',
          title: unit.title,
          url: unit.url || '',
          description:  unit.description || '',
          imageUrl: `images/heraldry/${lang}/${path}/${fileName}.${format}`,
        };

        contentToSaveForMap.push({
          lang: unit.lang,
          index: unit.index,
          id: unit.id,
          title: unit.title,
          url: unit.url,
          type: unit.type,
          ...(unit.spriteRoot ? { spriteRoot: unit.spriteRoot } : {}),
          place: unit.place,
          imagesList,
        });
      } else {
        console.log(chalk.bgRedBright([
          '✘',
          `missing url to image "${chalk.bold(unit.title)}"`,
          `(${format} - index: ${chalk.bold(unit.index)})`,
        ].join(' ')));

        failed += failed;
      }

      console.log(' ');
      console.log([
        chalk.yellow(`  Progress ${chalk.green(`${(global.processed[path] / total * 100).toFixed(1)}%`)}.`),
        `${chalk.white(global.processed[path])} out of ${chalk.white(total)}.`,
        getTimeStatus(),
      ].join(' '));
      console.log(' ');

      resolve(true);
    }
    
    fetchAndProcess();
  })));

  console.log(' ');
  console.log([
    chalk.green('✓'),
    chalk.white(`path "${chalk.green(path)}" finished.`),
  ].join(' '));
  console.log(' ');

  await Promise.all(promises);

  const chunkSuffix = typeof chunkIndex === 'number' ? `-${chunkIndex}` : '';

  chalk.white(`Saving .json files for path.`),

  writeFileSync(
    `./public/data/heraldry/${lang}/${path}${chunkSuffix}-map-data.json`,
    JSON.stringify(contentToSaveForMap, null, 1),
  );
  writeFileSync(
    `./public/data/heraldry/${lang}/${path}${chunkSuffix}-dev-data.json`,
    JSON.stringify(contentToSaveForDevMode, null, 1),
  );
};
