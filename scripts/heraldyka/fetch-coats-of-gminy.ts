import {
  existsSync,
  writeFileSync,
  unlink,
} from "fs";
import { writeFile } from "fs/promises";
import chalk from 'chalk';
import path from 'path';
import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

import { removeDiacratics } from '../../src/utils/text';

import gminyFromJSON from '../../public/data/heraldyka/gminy.json'
import { colorsByNames, AdministrativeUnit } from '../../src/pages/heraldyka/constants';

const gminy = gminyFromJSON as AdministrativeUnit[]
const total = gminy.length;

const getColorName = nearestColor.from(colorsByNames);

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const download = async (url: string, fileName: string, format: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const bos = Buffer.from(await blob.arrayBuffer())
  // const bos = blob.stream();

  await writeFile(`./public/images/heraldyka/gminy/${fileName}.${format}`, bos);
};

console.log(' ');
console.log(chalk.blue(`${total} coats to fetch.`));
console.log(' ');

const contentToSave = {};

(async () => {
  for (let i = 0; i < gminy.length; i++) {
    const gmina = gminy[i];
    // const oldFileName = gmina.title.toLowerCase().replace(/[^\w\s]/gi, '').replaceAll(' ', '-');
    const fileName = removeDiacratics(gmina.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

    const format = gmina.image?.source.split('.').at(-1)?.toLowerCase() || 'png';
    if (format !== 'png' && existsSync(`./public/images/heraldyka/gminy/${fileName}.png`)) {
      unlink(`./public/images/heraldyka/gminy/${fileName}.png`, () => {});
      console.log(chalk.red(`Removed ${fileName}.png`));
    }

    // if (oldFileName !== fileName) {
    //   unlink(`./public/images/heraldyka/gminy/${oldFileName}.png`, () => {});
    //   console.log(chalk.red(`${oldFileName}.png was removed, will be replaced with ${fileName}.png`));
    // }

    if (gmina.image?.source) {
      if (!existsSync(`./public/images/heraldyka/gminy/${fileName}.${format}`)) {
        await download(gmina.image?.source, fileName, format)
        console.log(`Fetched ${fileName}.${format}`);

        if (i % 20 === 0) {
          console.log(' ');
          console.log(chalk.yellow(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}.`))
          console.log(' ');
        }
      } else {
        console.log(chalk.gray(`Skipping ${fileName}.${format} already exists.`));
      }

      const image = path.resolve(`./public/images/heraldyka/gminy/${fileName}.${format}`);

      try {
        const primary = await ColorThief.getColor(image).then(color => {
          const hexColor = rgbToHex(color);
          const near = getColorName(hexColor);

          return {
            color: hexColor,
            name: typeof near === 'string' ? near : near?.name,
            // distance: typeof near === 'string' ? undefined : near?.distance,
          };
        });

        const palette = await ColorThief.getPalette(image, 5).then(palette => palette.map(color => {
          const hexColor = rgbToHex(color);
          const near = getColorName(hexColor);

          return {
            color: hexColor,
            name: typeof near === 'string' ? near : near?.name,
            // distance: typeof near === 'string' ? undefined : near?.distance,
          };
        }));

        contentToSave[fileName] = {
          ...gmina,
          colors: {  
            primary,
            palette,
          },
          imageUrl: `images/heraldyka/gminy/${fileName}.${format}`,
        }
      } catch {
        console.log(chalk.red('Missng colors for ', gmina.title));
      }
    } else {
      console.log('Missng image for ', gmina.title)
    }
  }

  // console.log(contentToSave);

  writeFileSync(`./public/data/heraldyka/gminy-images.json`, JSON.stringify(contentToSave, null, 4));
})();
