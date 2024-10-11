import {
  existsSync,
  writeFileSync,
  mkdirSync,
} from "fs";
import sharp from 'sharp';
import chalk from 'chalk';
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
  }).toFile(`./public/images/heraldry/${lang}/${path}/${fileName}-80w.webp`).catch((e) => {
    console.log(e);
  });

  await sharp(bos).trim(trimOptions).resize(320, 320, {
    fit: 'contain',
    position: 'center',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).toFile(`./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`).catch((error) => {
    console.log(error);
  });
};

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

  for (let i = 0; i < total; i++) {
    const unit = administrativeDivisions[i];
    const fileName = getImageFileName(unit);

    const expectedFilePath = `./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`;

    const format = unit.image?.source?.split('.')?.at(-1)?.toLowerCase() || 'png';

    if (i > 0) {
      clearLastLines(3);
    }

    if (unit.image?.source) {
      if (!existsSync(expectedFilePath)) {
        await download(unit.image?.source, fileName, format, path, lang)

        console.log([
          chalk.green('✓'),
          `fetched "${chalk.white(unit.title)}"`,
          chalk.gray(`(${format} - index: ${chalk.white(unit.index)})`),
        ].join(' '));
      } else {
        console.log([
          chalk.green('✓'),
          chalk.gray(`skipping "${chalk.white(unit.title)}"`),
          chalk.gray(`(${format} - index: ${chalk.white(unit.index)})`),
        ].join(' '));
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
    }

    console.log(' ');
    console.log([
      chalk.yellow(`  Progress ${chalk.green(`${(i / total * 100).toFixed(1)}%`)}.`),
      `${chalk.white(i)} out of ${chalk.white(total)}.`,
    ].join(' '));
    console.log(' ');
  }

  console.log(' ');
  console.log([
    chalk.green('✓'),
    chalk.white(`path "${chalk.green(path)}" finished.`),
  ].join(' '));
  console.log(' ');

  const chunkSuffix = typeof chunkIndex === 'number' ? `-${chunkIndex}` : '';

  writeFileSync(
    `./public/data/heraldry/${lang}/${path}${chunkSuffix}-map-data.json`,
    JSON.stringify(contentToSaveForMap, null, 1),
  );
  writeFileSync(
    `./public/data/heraldry/${lang}/${path}${chunkSuffix}-dev-data.json`,
    JSON.stringify(contentToSaveForDevMode, null, 1),
  );
};
