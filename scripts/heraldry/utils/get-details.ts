import {
  existsSync,
  writeFileSync,
  unlink,
  mkdirSync,
} from "fs";
import sharp from 'sharp';
import * as fsExtra from "fs-extra";
import { writeFile } from "fs/promises";
import chalk from 'chalk';
import { resolve } from 'path';
import { clearLastLines } from './helpers/console';
import { getImageFileName, getCompressedImageSrc } from './helpers/images';

import { AdministrativeUnit, CoatOfArmsMapData, CoatOfArmsDetailsData } from '../../../src/topic/Heraldry/types';


import { getMarkers } from '../../../src/topic/Heraldry/utils/markers/getMarkers';

import { getImageColors } from './helpers/colors'

export const getDetails = async ({
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
  const contentToSaveForDetails: {
    [id: string]: CoatOfArmsDetailsData,
  } = {};

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
        animals,
        items,
      } = getMarkers({
        text: unit?.description || '',
        title: unit?.title || '',
        lang,
      });

      const {
        srcSet,
        imagesList,
      } = getCompressedImageSrc(`images/heraldry/${lang}/${path}/${fileName}.webp`, path);

      if (!unit.place?.coordinates?.lat || !unit.place?.coordinates?.lon) {
        console.log(`${chalk.yellow(unit.title)} doesn't have the ${chalk.red('location')}.`);
      }



      contentToSaveForDetails[unit.id] = {
      }
      // ({
      //   lang: unit.lang,
      //   index: unit.index,
      //   id: unit.id,
      //   title: unit.title,
      //   url: unit.url,
      //   type: unit.type,
      //   ...(unit.spriteRoot ? { spriteRoot: unit.spriteRoot } : {}),
      //   place: unit.place,
      //   imagesList,
      // });
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
};
