import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';

import { AdministrativeUnit } from '../../../src/pages/heraldyka/constants';

import { locationTitleByHerbTitle } from './constants';

export const fetchData = async ({
  administrativeDivisions,
  path,
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
}) => {
  const errors: { title: string, url: string }[] = [];
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

      let locationPage: string | undefined = locationTitleByHerbTitle[division.title];

      if (!locationPage) {
        if (path.includes('miasta')) {
          locationPage = categories.find((category) => !category.includes('województwa'))
        } else {
          locationPage = categories.find((category) => category.includes('(gmina') || category.includes('(gmina wiejska'))
        }
      }
      
      path.includes('miasta')
        ? categories.find((category) => !category.includes('województwa'))
        : categories.find((category) => category.includes('(gmina') || category.includes('(gmina wiejska'))

      if (locationPage) {
        const divisionPage = await wiki.page(locationPage.replace('Kategoria:', ''));
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
          console.log(chalk.red(`Missing corrdinates for "${division.title}". No data.`));
          console.log(chalk.red(division.url));
          errors.push({
            title: `Missing corrdinates for "${division.title}". No data.`,
            url: division.url,
          });
        }
      } else {
        console.log(chalk.red(`Missing corrdinates for "${division.title}". - No category.`));
        console.log(chalk.red(division.url));
        errors.push({
          title: `Missing corrdinates for "${division.title}". No category.`,
          url: division.url,
        });
      }

      contentToSave.push({
        ...division,
        description: content.substring(0, 3000),
        image: summary.thumbnail,
      });
    } catch (error) {
      console.log(chalk.red(`Error fetching ${division.title}.`));
      console.log(chalk.red(division.url));
      console.log(error);
      errors.push({
        title: `Error fetching ${division.title}`,
        url: division.url,
      });
    }
  }

  fs.writeFileSync(path, JSON.stringify(contentToSave, null, 4));
  fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 4));
};