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
import { getImageHash, getImageFileName } from './helpers/images';

import { AdministrativeUnit, CoatOfArmsDetailsData, ColorStatus, ColorStatusInDetails } from '../../../src/topic/Heraldry/types';

import { getMarkers } from '../../../src/topic/Heraldry/utils/markers/getMarkers';

import { getImageColors, getNewImageColors } from './helpers/colors'

const start = (new Date()).getTime();

const getColorsDataToSaveFromColor = (color: ColorStatusInDetails | ColorStatus) => {
  const colorToSave: ColorStatusInDetails = {
    distanceToThreshold: color.distanceToThreshold,
    matcherColor: color.matcherColor,
  }

  return colorToSave;
}

const transformColorsByIds = (colorsByIds: {
  [id: string]: (ColorStatusInDetails | ColorStatus)[],
}) => Object.fromEntries(
  Object.entries(colorsByIds).map(([key, values]) => [key, values.map(value => getColorsDataToSaveFromColor(value))])
);

export const getDetails = async ({
  administrativeDivisions,
  alreadyFetchedDivisions = [],
  path,
  country,
  chunkIndex,
  shouldRemoveTemporaryFiles = true,
}: {
  administrativeDivisions: AdministrativeUnit[],
  alreadyFetchedDivisions?: CoatOfArmsDetailsData[],
  path: string,
  country: string,
  chunkIndex?: number,
  shouldRemoveTemporaryFiles?: boolean,
}) => {
  const contentToSaveForDetails: CoatOfArmsDetailsData[] = [];
  const alreadyFetchedDetailsById = alreadyFetchedDivisions.reduce((stack: {
    [id: string]: CoatOfArmsDetailsData,
  }, item) => {
    stack[item.id] = item;

    return stack;
  }, {})

  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(`${chalk.blue(total)} coats to fetch (${chalk.yellow(path)}).`);
  console.log(' ');

  if (total === 0) {
    return;
  }

  const getTimeStatus = (i: number) => {
    const progressPercent = (i / total) * 100;
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

  for (let i = 0; i < total; i++) {
    const unit = administrativeDivisions[i];
    const fileName = getImageFileName(unit);

    const expectedFilePath = `./public/images/heraldry/${country}/${path}/${fileName}-320w.webp`;

    if (!existsSync(`./public/images/heraldry/${country}/web/temp/${path}`)){
      mkdirSync(`./public/images/heraldry/${country}/web/temp/${path}`);
    }

    if (i > 0) {
      clearLastLines(3);
    }

    if (existsSync(expectedFilePath)) {
      // The ID is being added because, if the image is duplicated, sometimes a previous iteration removes it from the current one before it can be used
      const temporaryPngFile = `./public/images/heraldry/${country}/web/temp/${path}/${fileName}-${unit.id}-320w.png`;

      let wasColorTakenFromCache = false;
      let colors;
      if (alreadyFetchedDetailsById[unit.id]?.colors) {
        colors = {
          hexPalette: alreadyFetchedDetailsById[unit.id].colors?.hexPalette,
          byNames: transformColorsByIds(alreadyFetchedDetailsById[unit.id].colors?.byNames || {}),
          byNamesRejected: transformColorsByIds(alreadyFetchedDetailsById[unit.id].colors?.byNames || {}),
        }
        wasColorTakenFromCache = true;
      } else {
        try {
          await sharp(expectedFilePath).toFile(temporaryPngFile);
  
          const image = resolve(temporaryPngFile);
  
          const colorData = await getImageColors(image);
          const colorDataNew = await getNewImageColors(image);

          console.log(' ');
          console.log(colorDataNew);
          console.log(' ');
          // console.log({
          //   colorData,
          //   colorDataNew,
          // })
  
          const {
            hexPalette,
            byNames,
            byNamesRejected,
          } = colorData;
  
          colors = {
            hexPalette,
            byNames: transformColorsByIds(byNames),
            byNamesRejected: transformColorsByIds(byNamesRejected),
          }
        } catch (error) {
          console.log(chalk.red(`Broken color data ${expectedFilePath}`))
          console.log(error);
        }
      }

      const {
        animals,
        items,
      } = getMarkers({
        text: unit?.description || '',
        title: unit?.title || '',
        imageHash: getImageHash(unit),
        country,
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
        wasColorTakenFromCache ? chalk.gray(`- color from cache.`) : undefined,
      ].filter(Boolean).join(' '));
    }

    console.log(' ');
    console.log([
      chalk.yellow(`  Progress ${chalk.green(`${(i / total * 100).toFixed(1)}%`)}.`),
      `${chalk.white(i)} out of ${chalk.white(total)}.`,
      getTimeStatus(i),
      typeof chunkIndex === 'number' ? chalk.gray(`(chunk ${chunkIndex})`) : '',
    ].filter(Boolean).join(' '));
    console.log(' ');
  }

  console.log(' ');
  console.log([
    chalk.green('✓'),
    chalk.white(`path "${chalk.green(path)}" finished.`),
  ].join(' '));
  console.log(' ');

  const chunkSuffix = typeof chunkIndex === 'number' ? `-${chunkIndex}` : '';

  if (shouldRemoveTemporaryFiles) {
    fsExtra.emptyDirSync(`./public/images/heraldry/${country}/web/temp/${path}/`);
  }

  writeFileSync(
    `./public/data/heraldry/${country}/${path}${chunkSuffix}-details-data.json`,
    JSON.stringify(contentToSaveForDetails, null, 1),
  );
};
