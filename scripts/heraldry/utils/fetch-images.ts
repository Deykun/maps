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

import { removeDiacratics } from '../../../src/utils/text';

import { colorsByNames } from '../../../src/topic/Heraldry/constants';
import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { getMarkers } from './get-markers';

const getColorName = nearestColor.from(colorsByNames);

const getCompressedImageSrc = (imageUrl: string) => {
  const [imageSrcWithoutFormat] = imageUrl.split('.');

  const compressedImageSrcWithoutFormat = imageSrcWithoutFormat
    .replace('/miasta/', '/web-miasta/')
    .replace('/gminy/', '/web-gminy/')
    .replace('/powiaty/', '/web-powiaty/')
    .replace('/unit/', '/web-unit/');

  const srcSet = [
    { name: 'x2', width: '200w' },
    { name: 'x3', width: '300w' },
    { name: 'x4', width: '400w' },
  ].map(({ name, width }) => `${compressedImageSrcWithoutFormat}-${name}.webp ${width}`).join(',')

  return {
    srcSet,
    src: imageUrl
  }
}

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const download = async (url: string, fileName: string, format: string, path: string, lang: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const bos = Buffer.from(await blob.arrayBuffer())
  // const bos = blob.stream();

  await writeFile(`./public/images/heraldry/${lang}/${path}/${fileName}.${format}`, bos);
};

const contentToSave = {};

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
  console.log(path);
  const total = administrativeDivisions.length;

  console.log(' ');
  console.log(chalk.blue(`${total} coats to fetch.`));
  console.log(' ');

  for (let i = 0; i < administrativeDivisions.length; i++) {
      const unit = administrativeDivisions[i];
      // let fileName = removeDiacratics(unit.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');
      let fileName = removeDiacratics(unit.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

      // flattening collisions
      if (unit.title === 'Herb gminy Miedźna') {
        /*
          - Herb gminy Miedzna - https://pl.wikipedia.org/wiki/Herb_gminy_Miedzna
          - Herb gminy Miedźna - https://pl.wikipedia.org/wiki/Herb_gminy_Mied%C5%BAna
        */
        fileName += '-with-special-z';
      }

      if (unit.title === 'Õru valla vapp') {
        /*
          - Oru valla vapp - https://et.wikipedia.org/wiki/Oru_valla_vapp
          - Õru valla vapp - https://et.wikipedia.org/wiki/%C3%95ru_valla_vapp
        */
        fileName += '-with-special-o';
      }

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
              console.log(chalk.gray(`Skipping ${fileName}.${format} already exists.`));
          }

          const image = resolve(`./public/images/heraldry/${lang}/${path}/${fileName}.${format}`);

          try {
              const primary = await ColorThief.getColor(image).then(color => {
                  const hexColor = rgbToHex(color);
                  const near = getColorName(hexColor);
                  const distance = typeof near === 'string' ? 255 : (near?.distance || 255) as number;

                  return {
                      color: hexColor,
                      name: typeof near === 'string' ? near : near?.name,
                      distance,
                  };
              });

              const palette = await ColorThief.getPalette(image, 3).then(palette => palette.map(color => {
                  const hexColor = rgbToHex(color);
                  const near = getColorName(hexColor);
                  const distance = typeof near === 'string' ? 255 : (near?.distance || 255) as number;

                  return {
                      color: hexColor,
                      name: typeof near === 'string' ? near : near?.name,
                      distance,
                  };
              }));

              const uniqPalette: {
                color: string,
                name: string,
                distance: number,
              }[] = Object.values(palette.reduce((stack: {
                [name: string]: {
                  color: string,
                  name: string,
                  distance: number,
                },
              }, color: {
                color: string,
                name: string,
                distance: number,
              }) => {
                  if (!stack[color.name]) {
                      stack[color.name] = color;
                  } else if (stack[color.name].distance > color.distance) {
                      stack[color.name] = color;
                  }

                  return stack;
              }, {
                  [primary.name]: primary,
              }));

              const {
                animals,
                items,
              } = getMarkers({
                text: unit?.description || '',
                title: unit?.title || '',
                lang,
              })
              
              contentToSave[fileName] = {
                ...unit,
                description: '', // not needed
                colors: {
                  primary,
                  palette: uniqPalette.filter(({ name, distance }) => {
                    if (name === 'blue') {
                      return distance < 200;
                    }

                    if (name === 'green') {
                      return distance < 180;
                    }

                    return distance < 110;
                  }),
                },
                imageUrl: `images/heraldry/${lang}/${path}/${fileName}.${format}`,
                imageSrcSet: getCompressedImageSrc(`images/heraldry/${lang}/${path}/${fileName}.${format}`).srcSet,
                shortTitle: unit.title.replace('Herb gminy', 'Herb g.').replace('Herb powiatu', 'Herb p.').replace('Herb miasta', 'Herb').replace(/\((.*)\)/g, ''),
                markers: {
                  animals,
                  items,
                }
              }
          } catch {
              console.log(chalk.red('Missing colors for ', unit.title));
          }
      } else {
          console.log('Missng image for ', unit.title)
      }
  }

  writeFileSync(`./src/pages/${subpage}/${path}-map.json`, JSON.stringify(contentToSave, null, 4));
};
