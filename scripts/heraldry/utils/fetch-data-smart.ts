import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';
import pLimit from 'p-limit'

import { AdministrativeUnit } from '../../../src/topic/Heraldry/types';

import { locationTitleByCoatOfArmsTitle } from './constants';

const start = (new Date()).getTime();
const errors: { title: string, url: string, details?: string[] }[] = [];

const safeFetchLoop = async ({ page, title }: { page: string, title: string }) => {
  try {
    const response = await wiki.page(page);

    const coordinates = await response.coordinates();

    if (coordinates?.lat) {
      return {
        isSucces: true,
        response,
        coordinates,
      }
    }

    return {
      isSucces: false,
      errorMessge: `Missing corrdinates for "${page}". Page exists but without location.`
    }
  } catch (error) {
    return {
      isSucces: false,
      errorMessge: `Missing corrdinates for "${page}". No page.`,
      errorFromCatch: error,
    }
  }
};

const fetchDivision = async (division: AdministrativeUnit, path: string, lang: string) => {
  let locationPages: string[] = locationTitleByCoatOfArmsTitle[division.title]
    ? [locationTitleByCoatOfArmsTitle[division.title]]
    : [];

  try {
    const page = await wiki.page(division.title);
    const summary = await page.summary();
    const content = await page.content();

    division.description = content.substring(0, 3000);
    division.image = summary.thumbnail;

    const categories = await page.categories();
    // const images = await page.images();
  
    if (lang === 'fi') {
        const name = division.title.replace(' vaakuna', '');

        if (name) {
          locationPages.push(name);

          const nameRoot = name.slice(0, -3);
          if (nameRoot) {
            division.description.slice(0, 160).split(' ').forEach((word) => {
              if (word.startsWith(nameRoot)) {
                locationPages.push(word);
              }
            })
          }

          categories.find((category) => {
            if (category.split(' ').length <= 2) {
              // All categories with less than two words
              locationPages.push(category);
            }
          });

          if (name.endsWith('n')) {
            if (name.endsWith('en')) {
              locationPages.push(`${name.slice(0, -2)}i`);
            }

            locationPages.push(`${name.slice(0, -1)} (kunta)`);

            if (name.endsWith('gon')) {
              locationPages.push(`${name.slice(-3)}ko`);
            }
          }

          locationPages.push(`${name} (kunta)`);
          locationPages = Array.from(new Set(locationPages.map((item) => item?.replace('Luokka:', '')).filter(Boolean)));
        }
    }

    let didFetch = false;
    let divisionPage;
    const divisionError: string[] = [];
    let divisionCoordinates;
    let divisionErrorFromApi: any[] = [];
    
    for (let i = 0; i < locationPages.length; i++) {
      const {
        isSucces,
        response,
        coordinates,
        errorMessge,
        errorFromCatch,
      } = await safeFetchLoop({ page: locationPages[i], title: division.title });
      if (errorMessge) {
        divisionError.push(errorMessge);
      }

      if (isSucces) {
        didFetch = true;
        divisionPage = response;
        divisionCoordinates = coordinates;
  
        break;
      }

      if (errorFromCatch) {
        divisionErrorFromApi.push(errorFromCatch);
      }
    }

    if (!didFetch) {
      console.log(`${chalk.red(`No location was found "${division.title}"`)}. Page with the location not found.`);
      console.log(`Tried: ${chalk.yellow(locationPages.join(', '))}`);
      console.log('Those errors are saved to errors.json at the end.');
      console.log(' ')
      console.log(chalk.red(division.url));
      console.log(' ')
      console.log(divisionError.join(', '));
      divisionErrorFromApi.forEach((error) => {
        console.log(chalk.red(error));
      })
      errors.push({
        title: `Missing corrdinates for "${division.title}". Page with the location not found.`,
        details: [`Tried pages: ${locationPages.join(', ')}.`,
          'You can check if there is a potential way to automate it: scripts/heraldry/utils/fetch-data-smart.ts.',
          'Or just tell the tool which page name to use in scripts/heraldry/utils/constants.ts.',
          'You will find the proper name of the page in the URL, make sure it has lat and lon.',
          `List of errors:`,
          ...divisionError
        ],
        url: division.url,
      });
    }

    if (divisionPage) {
      const coordinates = divisionCoordinates;

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
    }
  } catch (error) {
    console.log(chalk.red(`Error fetching "${chalk.white(division.title)}" with "${chalk.yellow(locationPages.join(','))}".`));
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
  alreadyFetchedDivisions,
  path,
  lang = 'pl',
}: {
  administrativeDivisions: AdministrativeUnit[],
  alreadyFetchedDivisions: AdministrativeUnit[],
  path: string,
  lang?: string,
}) => {
  wiki.setLang(lang);

  const total = administrativeDivisions.length;

  console.log(chalk.blue(`${total} units to check.`))
  console.log(' ');

  const contentToSave: AdministrativeUnit[] = [];

  let processed = 0;
  const limit = pLimit(2);

  const progressStatus = () => {
    if (processed % 3 === 0) {
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

      const fetchedDivision = alreadyFetchedDivisions.find(
        ({ title, place }) => title === division.title && place?.coordinates?.lat
      );

      if (fetchedDivision) {
        contentToSave.push(fetchedDivision);
        console.log(chalk.gray(`Skipping ${division.title}. Already fetched.`));

        processed = processed + 1;
  
        progressStatus();
  
        resolve(true);
      } else {
        const divisionUpdate = await fetchDivision(division, path, lang)
  
        contentToSave.push({
          ...divisionUpdate,
        });
  
        processed = processed + 1;
  
        progressStatus();
  
        resolve(true);
      }
    }

    fetchAndProcess();
  })));

  await Promise.all(promises);

  fs.writeFileSync(path, JSON.stringify(contentToSave, null, 4));
  fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 4));
}