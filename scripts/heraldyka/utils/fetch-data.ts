import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';

import { AdministrativeUnit } from '../../../src/pages/heraldyka/constants';

export const fetchData = async ({
  administrativeDivisions,
  path,
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
}) => {
  wiki.setLang('pl');

  const total = administrativeDivisions.length;

  console.log(chalk.blue(`${total} units to check.`))

  const contentToSave: AdministrativeUnit[] = [];

  for (let i = 0; i < administrativeDivisions.length; i++) {
    const division = administrativeDivisions[i];

    if (i % 1 === 0) {
      console.log(`Progress ${chalk.yellow((i / total * 100).toFixed(1))}%. ${i} out of ${total}. - ${division.title}`);
    }

    try {
      const page = await wiki.page(division.title);
      // console.log(page);
      //Response of type @Page object
      const summary = await page.summary();
      // console.log(summary);
      const content = await page.content();
      const categories = await page.categories();
      // const images = await page.images()

      const maindivisionCategory = path.includes('miasta')
        ? categories.find((category) => !category.includes('województwa'))
        : categories.find((category) => category.includes('(gmina)') || category.includes('(gmina wiejska)'))

      if (maindivisionCategory) {
        const divisionPage = await wiki.page(maindivisionCategory.replace('Kategoria:', ''));
        // console.log(divisionPage);
        // const divisionSummary = await page.summary();
        // console.log(divisionSummary);
        const coordinates = await divisionPage.coordinates();

        division.place = {
          name: divisionPage.title,
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lon,
          }
        }

        if (!coordinates.lon) {
          console.log(chalk.red(`Missing corrdinates for ${page.title}.`));
        }
      } else {
        console.log(chalk.red(`Missing corrdinates for ${page.title}.`));
      }

      contentToSave.push({
        ...division,
        description: content.substring(0, 3000),
        image: summary.thumbnail,
      });
  // 		//Response of type @wikiSummary - contains the intro and the main image
    } catch (error) {
      // console.log(error);
  // 		//=> Typeof wikiError
    }
  }

  fs.writeFileSync(path, JSON.stringify(contentToSave, null, 4));
};