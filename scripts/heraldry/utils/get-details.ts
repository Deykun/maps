import {
  existsSync,
  writeFileSync,
  mkdirSync,
} from "fs";
import * as fsExtra from "fs-extra";
import sharp from 'sharp';
import chalk from 'chalk';
import { resolve } from 'path';
import { clearLastLines } from './helpers/console';
import { getImageFileName } from './helpers/images';

import { AdministrativeUnit, CoatOfArmsDetailsData } from '../../../src/topic/Heraldry/types';


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
  const contentToSaveForDetails: CoatOfArmsDetailsData[] = [];

  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(`${chalk.blue(total)} coats to fetch (${chalk.yellow(path)}).`);
  console.log(' ');

  if (total === 0) {
    return;
  }

  for (let i = 0; i < total; i++) {
    const unit = administrativeDivisions[i];
    const fileName = getImageFileName(unit);

    const expectedFilePath = `./public/images/heraldry/${lang}/${path}/${fileName}-320w.webp`;

    if (!existsSync(`./public/images/heraldry/${lang}/web/temp/${path}`)){
      mkdirSync(`./public/images/heraldry/${lang}/web/temp/${path}`);
    }

    if (i > 0) {
      clearLastLines(3);
    }

    if (existsSync(expectedFilePath)) {
      const temporaryPngFile = `./public/images/heraldry/${lang}/web/temp/${path}/${fileName}-320w.png`;

      let colors;
      
      try {
        await sharp(expectedFilePath).toFile(temporaryPngFile);

        const image = resolve(temporaryPngFile);

        const colorData = await getImageColors(image);

        const {
          hexPalette,
          byNames,
          byNamesRejected,
        } = colorData;

        colors = {
          hexPalette,
          byNames,
          byNamesRejected,
        }
      } catch (error) {
        console.log(chalk.red(`Broken color data ${expectedFilePath}`))
        console.log(error);
      }

      const {
        animals,
        items,
      } = getMarkers({
        text: unit?.description || '',
        title: unit?.title || '',
        lang,
      });

      const hasMarkers = animals.length > 0 || items.length > 0;

      contentToSaveForDetails.push({
        id: unit.id,
        ...(colors ? { colors } : {}),
        ...(hasMarkers ? {
          markers: {
            ...(animals.length > 0 ? { animals } : {}),
            ...(items.length > 0 ? { items } : {}),
          }
        }: {}),
      });

      console.log([
        chalk.green('✓'),
        chalk.gray(`validating "${chalk.white(unit.title)}"`),
        chalk.gray(`(index: ${chalk.white(unit.index)})`),
      ].join(' '));
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

  fsExtra.emptyDirSync(`./public/images/heraldry/${lang}/web/temp/${path}/`);

  writeFileSync(
    `./public/data/heraldry/${lang}/${path}${chunkSuffix}-details-data.json`,
    JSON.stringify(contentToSaveForDetails, null, 1),
  );
};
