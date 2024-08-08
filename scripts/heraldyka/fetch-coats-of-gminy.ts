import {
  existsSync,
  // unlink,
} from "fs";
import { writeFile } from "fs/promises";
import chalk from 'chalk';

import { removeDiacratics } from '../../src/utils/text';


import { AdministrativeUnit } from './constants';
import gminyFromJSON from '../../public/data/heraldyka/gminy.json'

const gminy = gminyFromJSON as AdministrativeUnit[]

export const download = async (url: string, fileName: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const bos = Buffer.from(await blob.arrayBuffer())
  // const bos = blob.stream();

  await writeFile(`./public/images/heraldyka/gminy/${fileName}.png`, bos);
};

const total = gminy.length;

console.log(' ');
console.log(chalk.blue(`${total} coats to fetch.`));
console.log(' ');

(async () => {
  for (let i = 0; i < gminy.length; i++) {
    const gmina = gminy[i];
    // const oldFileName = gmina.title.toLowerCase().replace(/[^\w\s]/gi, '').replaceAll(' ', '-');
    const fileName = removeDiacratics(gmina.title.toLowerCase()).replace(/[^\w\s]/gi, '').replaceAll(' ', '-');

    // if (oldFileName !== fileName) {
    //   unlink(`./public/images/heraldyka/gminy/${oldFileName}.png`, () => {});
    //   console.log(chalk.red(`${oldFileName}.png was removed, will be replaced with ${fileName}.png`));
    // }

    if (gmina.image?.source) {
      if (!existsSync(`./public/images/heraldyka/gminy/${fileName}.png`)) {
        await download(gmina.image?.source, fileName)
        console.log(`Fetched ${fileName}.png`);

        if (i % 20 === 0) {
          console.log(' ');
          console.log(chalk.yellow(`Progress ${(i / total * 100).toFixed(1)}%. ${i} out of ${total}.`))
          console.log(' ');
        }
      } else {
        console.log(chalk.gray(`Skipping ${fileName}.png already exists.`));
      }
    } else {
      console.log('Missng image for ', gmina.title)
    }
  }
})();