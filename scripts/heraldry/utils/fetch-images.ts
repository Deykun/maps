import {
  existsSync,
  writeFileSync,
  unlink,
} from "fs";
import { writeFile } from "fs/promises";
import chalk from 'chalk';
import { resolve } from 'path';
import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

import { colorsByNames, colorsByNamesShift, colorsByNamesGrayscale } from '../../../src/topic/Heraldry/constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getImageFileName, getCompressedImageSrc } from './get-image-file-name';
import { getMarkers } from './get-markers';

import { rgbToHex, getGreyscale, getImageColors } from './helpers/colors'

const getColorName = nearestColor.from(colorsByNames);
const getColorNameShift = nearestColor.from(colorsByNamesShift);
const getColorNameGrayscale = nearestColor.from(colorsByNamesGrayscale);

const colorMatchers = {
  red: {
    get: nearestColor.from({ color: '#f00' }),
    thresholdDistance: 110,
  },
  green: {
    get: nearestColor.from({ color: '#f00' }),
    thresholdDistance: 180,
  },
  blue: {
    get: nearestColor.from({ color: '#f00' }),
    thresholdDistance: 200,
  },
  white: {
    get: nearestColor.from({ color: '#fff' }),
    thresholdDistance: 30,
  },
  black: {
    get: nearestColor.from({ color: '#000' }),
    thresholdDistance: 15,
  },
  gold:{
     get: nearestColor.from({ color: '#bfa14e' }),
     thresholdDistance: 60,
  },
  yellow: {
    get: nearestColor.from({ color: '#fbf105' }),
    thresholdDistance: 30,
  },
};

const colorMatchersList = Object.entries(colorMatchers); 

export const download = async (url: string, fileName: string, format: string, path: string, lang: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const bos = Buffer.from(await blob.arrayBuffer())
  // const bos = blob.stream();

  await writeFile(`./public/images/heraldry/${lang}/${path}/${fileName}.${format}`, bos);
};

export const fetchImages = async ({
  administrativeDivisions,
  path,
  subpage = 'heraldyka',
  lang = 'pl',
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
  subpage?: string,
  lang?: string,
}) => {
  const contentToSave = {};

  console.log(path);
  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(chalk.blue(`${total} coats to fetch.`));
  console.log(' ');

  for (let i = 0; i < administrativeDivisions.length; i++) {
      const unit = administrativeDivisions[i];
      let fileName = getImageFileName(unit.title);

      const format = unit.image?.source.split('.').at(-1)?.toLowerCase() || 'png';
      if (format !== 'png' && existsSync(`./public/images/heraldry/${lang}/${path}/${fileName}.png`)) {
          unlink(`./public/images/heraldry/${lang}/${path}/${fileName}.png`, () => {});
          console.log(chalk.red(`Removed ${fileName}.png`));
      }

      if (unit.image?.source) {
          if (!existsSync(`./public/images/heraldry/${lang}/${path}/${fileName}.${format}`)) {
            if (unit.image?.source) {
              await download(unit.image?.source, fileName, format, path, lang)
              console.log(`Fetched ${fileName}.${format}`);

              if (i % 20 === 0) {
                  console.log(' ');
                  console.log(chalk.yellow(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}.`))
                  console.log(' ');
              }
            } else {
              console.log(chalk.red(`Missing ${fileName}.${format}.`));
            }
          } else {
              // console.log(chalk.gray(`Skipping ${fileName}.${format} already exists.`));
          }

          const image = resolve(`./public/images/heraldry/${lang}/${path}/${fileName}.${format}`);

          const {
            animals,
            items,
          } = getMarkers({
            text: unit?.description || '',
            title: unit?.title || '',
            lang,
          })

          const {
            srcSet,
            imagesList,
          } = getCompressedImageSrc(`images/heraldry/${lang}/${path}/${fileName}.${format}`, path);

          if (!unit.place?.coordinates?.lat || !unit.place?.coordinates?.lon) {
            console.log(`${chalk.yellow(unit.title)} doesn't have the ${chalk.red('location')}.`)
          }

          try {
              const {
                colorsPalette,
                hexPalette,
                byNames,
                byNamesRejected,
              } = await getImageColors(image);

              contentToSave[fileName] = {
                ...unit,
                description: '', // not needed
                colors: {
                  colorsPalette,
                  byNames,
                  byNamesRejected,
                  hexPalette,
                },
                imageUrl: `images/heraldry/${lang}/${path}/${fileName}.${format}`,
                imageSrcSet: srcSet,
                imagesList,
                shortTitle: unit.title.replace('Herb gminy', 'Herb g.').replace('Herb powiatu', 'Herb p.').replace('Herb miasta', 'Herb').replace(/\((.*)\)/g, ''),
                markers: {
                  animals,
                  items,
                }
              }
          } catch (error) {
            console.log(`${chalk.red('Missing colors for:')} ${chalk.yellow(unit.title)}`);
            console.error(error);

            contentToSave[fileName] = {
              ...unit,
              description: '',
              imageUrl: `images/heraldry/${lang}/${path}/${fileName}.${format}`,
              imageSrcSet: srcSet,
              imagesList,
              shortTitle: unit.title.replace('Herb gminy', 'Herb g.').replace('Herb powiatu', 'Herb p.').replace('Herb miasta', 'Herb').replace(/\((.*)\)/g, ''),
              markers: {
                animals,
                items,
              }
            }
          }
      } else {
        console.log(chalk.red(`Missng image for: ${chalk.yellow(unit.title)}`));
      }
  }

  writeFileSync(`./src/pages/${subpage}/${path}-map.json`, JSON.stringify(contentToSave, null, 4));
};
