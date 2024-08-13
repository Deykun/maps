import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';
import pLimit from 'p-limit'

import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { locationTitleByCoatOfArmsTitle } from './constants';

const start = (new Date()).getTime();
const errors: { title: string, url: string, details?: string }[] = [];

const fetchDivision = async (division: AdministrativeUnit, path: string, lang: string) => {
  let locationPage: string | undefined = locationTitleByCoatOfArmsTitle[division.title];

  try {
    const page = await wiki.page(division.title);
    // console.log(page);
    //Response of type @Page object
    const summary = await page.summary();
    // console.log(summary);
    const content = await page.content();

    division.description = content.substring(0, 3000);
    division.image = summary.thumbnail;

    const categories = await page.categories();
    // const images = await page.images();

 

    if (!locationPage) {
      if (path.includes('miasta') || path.includes('powiat')) {
        locationPage = categories.find((category) => !['przypisami', 'herby', 'artykuły', 'herbach', 'błędne dane', 'szablon', 'brak numeru'].some((subcat) => category.toLowerCase().includes(subcat)));
      } else if (lang === 'et') {
        locationPage = division.title.replace(' valla vapp', '').replace(' vapp', '');
      } else {
        locationPage = categories.find((category) => category.includes('(gmina') || category.includes('(gmina wiejska'))
      }
    }

    if (locationPage) {
      try {
        locationPage = locationPage?.replace('Kategoria:', '');

        const divisionPage = await wiki.page(locationPage);
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
      } catch {
        console.log(chalk.red(`Missing corrdinates for "${division.title}". No data for locatoion.`));
        console.log(chalk.red(division.url));
        errors.push({
          title: `Missing corrdinates for "${division.title}". No data for locatoion.`,
          url: division.url,
        });
      }
    } else {
      console.log(chalk.red(`Missing page for "${division.title}". - No page.`));
      console.log('Missing page', locationPage);
      console.log(chalk.red(division.url));

      errors.push({
        title: `Missing corrdinates for "${division.title}". No page.`,
        url: division.url,
      });
    }
  } catch (error) {
    console.log(chalk.red(`Error fetching "${chalk.white(division.title)}" with "${chalk.yellow(locationPage)}".`));
    console.log(chalk.red(division.url));
    console.log(error);

    errors.push({
      title: `Error fetching ${division.title}`,
      url: division.url,
      details: error?.title,
    });
  }

  return division;
};

export const fetchData = async ({
  administrativeDivisions,
  path,
  lang = 'pl',
}: {
  administrativeDivisions: AdministrativeUnit[]
  path: string,
  lang?: string,
}) => {
  wiki.setLang(lang);

  const total = administrativeDivisions.length;

  console.log(chalk.blue(`${total} units to check.`))
  console.log(' ');

  const contentToSave: AdministrativeUnit[] = [];

  let processed = 0;
  const limit = pLimit(4);

  const progressStatus = () => {
    if (processed % 10 === 0) {
      const progressPercent = (processed / total) * 100;
      const now = (new Date()).getTime();
      const timeDiffrenceInSeconds = Math.floor((now - start) / 1000);
      const timePerPercentage = timeDiffrenceInSeconds / progressPercent;
      const expectedTimeInSeconds = Math.floor(timePerPercentage * 100);
      const timeLeftSeconds = Math.floor(expectedTimeInSeconds - timeDiffrenceInSeconds);
      const timeLeftMinutes = Math.floor(timeLeftSeconds / 60);
      const timeLeftSecondsToShow = timeLeftSeconds - (timeLeftMinutes * 60);
      const timeStatus = timeDiffrenceInSeconds === 0 ? '' : `- ${chalk.blue(timeLeftMinutes)}m ${chalk.blue(timeLeftSecondsToShow)}s to finish.`;
  
      console.log(`Progress ${chalk.yellow((processed / total * 100).toFixed(1))}%. ${processed} out of ${total}. ${timeStatus}`);
    }
  }

  const promises = administrativeDivisions.map((division) => limit(() => new Promise((resolve) => {
    const fetchAndProcess = async () => {
      const divisionUpdate = await fetchDivision(division, path, lang)
  
      contentToSave.push({
        ...divisionUpdate,
      });

      processed = processed + 1;

      progressStatus();

      resolve(true);
    }

    fetchAndProcess();
  })));

  await Promise.all(promises);

  fs.writeFileSync(path, JSON.stringify(contentToSave, null, 4));
  fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 4));
}