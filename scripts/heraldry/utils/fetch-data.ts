import fs from 'fs';
import wiki from 'wikipedia';
import chalk from 'chalk';
import pLimit from 'p-limit';

import { AdministrativeUnit, UserScriptDivisionData } from '../../../src/topic/Heraldry/types';

import { getImageFromThumbnailUrl } from './helpers/images';
import { locationTitleByCoatOfArmsTitle } from './constants';

const start = (new Date()).getTime();
const errors: { title: string, url: string, details?: string[] }[] = [];

global.processed = typeof global.processed === 'object' ? global.processed : {};
let failed = 0;

const safeFetchLoop = async ({ lang, page, title }: { lang: string, page: string, title: string }) => {
  try {
    const response = await wiki.page(page);

    let coordinates = await response.coordinates();

    if (coordinates?.lat) {
      return {
        isSucces: true,
        response,
        coordinates,
      }
    }

    if (lang === 'fi') {
      const references = await response.infobox();

      // fi: keskus -> en: center
      if (references.keskus) {
        try {
          const responseSubpage = await wiki.page(references.keskus);

          coordinates = await responseSubpage.coordinates();
  
          if (coordinates?.lat) {
            return {
              isSucces: true,
              response,
              coordinates,
            }
          }
        } catch {
          // 
        }
        
        return {
          isSucces: false,
          errorMessge: `Page '${page}' exists but without location, tried related "${references.keskus}". But it failed.`
        }
      }
    }

    return {
      isSucces: false,
      errorMessge: `Page '${page}' exists but without location, no location.`
    }
  } catch (error) {
    return {
      isSucces: false,
      errorMessge: `Page '${page}' does not exist.`,
      errorFromCatch: error,
    }
  }
};

const fetchDivisionFromAdministrativeUnit = async (division: AdministrativeUnit, path: string, lang: string, unitNames: string[]) => {
  let locationPages: string[] = [];
  if (locationTitleByCoatOfArmsTitle[division.title]) {
    locationPages.push(locationTitleByCoatOfArmsTitle[division.title]);
  }

  try {
    const page = await wiki.page(division.title);
    const summary = await page.summary();
    const content = await page.content();

    division.description = content.substring(0, 3000);
    division.image = summary.thumbnail;

    if (!division.image) {
      console.log(`${chalk.red(`Missing thumbnail for:`)} ${chalk.yellow(division.title)}`);
      const infobox = await page.infobox();
      console.log('infobox', infobox);
    }

    const categories = await page.categories();
    // const images = await page.images();

    if (lang === 'et') {
      const name = division.title.replace(' valla vapp', '').replace(' vapp', '');

      if (name) {
        locationPages.push(name);
      }
    }
  
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

          categories.forEach((category) => {
            if (category.split(' ').length <= 2) {
              // All categories with less than two words
              locationPages.push(category);
            }
          });

          if (name.endsWith('n')) {
            locationPages.push(`${name.slice(0, -1)}`);

            if (name.endsWith('en')) {
              locationPages.push(`${name.slice(0, -2)}i`);
            }

            if (unitNames.includes('kunta')) {
              locationPages.push(`${name.slice(0, -1)} (kunta)`);
            }

            if (name.endsWith('gon')) {
              locationPages.push(`${name.slice(-3)}ko`);
            }
          }

          if (unitNames.includes('maakunta')) {
            locationPages.push(`${name} maakunta`);
          }

          if (unitNames.includes('kunta')) {
            locationPages.push(`${name} (kunta)`);
          }

          locationPages = Array.from(new Set(locationPages.map((item) => item?.replace('Luokka:', '')).filter(Boolean)));
        }
    }

    if (lang === 'pl') {
      const name = division.title.replace(
        'Herb gminy ', ''
      ).replace(
        'Herp powiatu ', '',
      ).replace(
        'Herb miasta ', ''
      ).replace(
        'Herb ', ''
      ).replace(/\((.*)\)/g, '').trim();

      categories.filter(
        category => ['(gmina', '(powiat', '(województwo', 'powiaty'].some((phrase) => category.includes(phrase))
      ).forEach((category) => {
          locationPages.push(category);
          locationPages.push(category.replace('Kategoria:', ''));

          const categoryWithoutBrackets = category.replace(/\((.*)\)/g, '').trim();

          locationPages.push(categoryWithoutBrackets);

          if (division.type?.includes('gminy')) {
            locationPages.push(`${categoryWithoutBrackets} (gmina)`);
            locationPages.push(`${categoryWithoutBrackets} (gmina wiejska)`);
          }

          if (division.type?.includes('miasta')) {
            locationPages.push(`${categoryWithoutBrackets} (miasto)`);
          }

          if (division.type?.includes('powiaty')) {
            locationPages.push(`${categoryWithoutBrackets} (powiaty)`);
          }
      });

      if (name) {
        if (division.type?.includes('gminy')) {
          locationPages.push(`${name} (gmina)`);
          locationPages.push(`${name} (gmina wiejska)`);
        }

        if (division.type?.includes('miasta')) {
          locationPages.push(`${name} (miasto)`);
          locationPages.push(`${name.slice(0, -1)} (miasto)`);
        }

        if (division.type?.includes('powiaty')) {
          locationPages.push(`${name} (powiat)`);
        }

        if (name.endsWith('ka')) {
          locationPages.push(`${name.slice(0, -2)}ek`);
        }

        if (name.endsWith('owa')) {
          locationPages.push(`${name.slice(0, -3)}ów`);
        }

        if (name.includes('ego')) {
          locationPages.push(name.replace('ego', 'y'));

          if (name.endsWith('a')) {
            locationPages.push(name.replace('ego', 'y').slice(0, -1));
          }
        }

        if (division.type?.includes('gminy')) {
          locationPages.push(`${name.replace(/\((.*)\)/g, '').trim()} (gmina)`);
          locationPages.push(`${name.replace(/\((.*)\)/g, '').trim()} (gmina wiejska)`);
          locationPages.push(`${name.replace(/\((.*)\)/g, '').trim()} (gmina miejsko-wiejska)`);
        }

        if (division.type?.includes('miasta') || division.type?.includes('gminy')) {
          locationPages.push(`${name} (miasto)`);
        }

        if (division.type?.includes('powiaty') || division.type?.includes('gminy')) {
          locationPages.push(`${name} (gmina miejsko-wiejska)`);
        }

        categories.filter(
          category => !['przypisami', 'herby', 'artykuł', 'herbach', 'błędne dane', 'szablon', 'brak numeru'].some(
            (phrase) => category.includes(phrase)
          )
        ).forEach((category) => {
          if (category.replace(/\((.*)\)/g, '').trim().split(' ').length <= 3) {
            // All categories with less than three words
            locationPages.push(category);
          }
        });

        locationPages.push(name);

        locationPages = Array.from(new Set(locationPages.map(
          (item) => item?.replace('Kategoria:', '')?.replaceAll(',', '')?.trim(),
        ))).filter(Boolean);
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
      } = await safeFetchLoop({ lang, page: locationPages[i], title: division.title });
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
      failed = failed + 1;
      console.log(`${chalk.red(`No location was found '${division.title}'`)}. Page with the location not found.`);
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
        title: `Missing corrdinates for '${division.title || division?.locationName}'. Page with the location not found.`,
        details: [`Tried pages: ${locationPages.join(', ')}.`,
          'You can check if there is a potential way to automate it: scripts/heraldry/utils/fetch-data.ts.',
          '',
          'Or just tell the tool which page name to use in scripts/heraldry/utils/constants.ts.',
          '',
          'You will find the proper name of the page in the URL, make sure it has lat and lon.',
          '',
          `List of errors:`,
          ...divisionError,
          '',
          'Item categories:',
          ...categories,
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
        console.log(chalk.red(`Missing corrdinates for '${division.title || division?.locationName}' No data.`));
        console.log(chalk.red(division.url));
        errors.push({
          title: `Missing corrdinates for '${division.title || division?.locationName}' No data.`,
          url: division.url,
        });
      }
    }
  } catch (error) {
    failed = failed + 1;
    console.log(chalk.red(`Error fetching '${chalk.white(division.title)}'${locationPages.length > 0 ? ` with '${chalk.yellow(locationPages.join(','))}`: ''}.`));
    console.log(chalk.red(division.url));
    console.log(error);

    errors.push({
      title: `Error fetching '${division.title}${locationPages.length > 0 ? ` with '${chalk.yellow(locationPages.join(','))}`: ''}.`,
      url: division.url,
      details: error?.title,
    });
  }

  return division;
};

const fetchDivisionFromUserScript= async (division: UserScriptDivisionData, path: string, lang: string, unitNames: string[], indexData: {
  lang: string;
  id: string;
  index: any;
}) => {
  let locationPages: string[] = [];
  if (locationTitleByCoatOfArmsTitle[division.title]) {
    locationPages.push(locationTitleByCoatOfArmsTitle[division.title]);
  }
  if (division.locationUrl) {
    const titleOfLocationUrl = ((decodeURI(division.locationUrl).split('/').at(-1) as string) || '').replaceAll('_', ' ');
    locationPages.push(titleOfLocationUrl);
  }

  try {
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
      } = await safeFetchLoop({ lang, page: locationPages[i], title: division.title });
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
      failed = failed + 1;
      console.log(`${chalk.red(`No location was found '${division.locationName}' ${division.sourceTitle}`)}. Page with the location not found.`);
      console.log(`Tried: ${chalk.yellow(locationPages.join(', '))}`);
      console.log('Those errors are saved to errors.json at the end.');
      console.log(' ')
      console.log(chalk.red(division.source));
      console.log(' ')
      console.log(divisionError.join(', '));
      divisionErrorFromApi.forEach((error) => {
        console.log(chalk.red(error));
      })
      errors.push({
        title: `Missing corrdinates for '${division.locationName}' ${division.sourceTitle}. Page with the location not found.`,
        details: [`Tried pages: ${locationPages.join(', ')}.`,
          'You can check if there is a potential way to automate it: scripts/heraldry/utils/fetch-data.ts.',
          '',
          'Or just tell the tool which page name to use in scripts/heraldry/utils/constants.ts.',
          '',
          'You will find the proper name of the page in the URL, make sure it has lat and lon.',
          '',
          `List of errors:`,
          ...divisionError,
          '',
        ],
        url: division.source,
      });
    }

    if (divisionPage) {
      const coordinates = divisionCoordinates;

      const divisionToSave: AdministrativeUnit = {
        title: divisionPage.title || division.locationName,
        lang: indexData.lang,
        id: indexData.id,
        index: indexData.index,
        type: division.type,
        spriteRoot: unitNames[0],
        description: division.description,
        url: division.source,
        ...(division.thumbnailUrl ? {
          image: {
          source: getImageFromThumbnailUrl(division.thumbnailUrl),
          sourceAlt: division.thumbnailUrl,
        }} : {}),
        place: {
          name: division.sourceTitle, // Since location is used as title, sourceTitle will be used as location title
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lon,
          }
        }
      }

      if (!coordinates.lon) {
        console.log(chalk.red(`Missing corrdinates for '${division.locationName}' ${division.sourceTitle}. No data.`));
        console.log(chalk.red(division.source));
        errors.push({
          title: `Missing corrdinates for '${division.locationName}' ${division.sourceTitle}. No data.`,
          url: division.source,
        });
      }

      return divisionToSave;
    }
  } catch (error) {
    failed = failed + 1;
    console.log(chalk.red(`Error fetching '${chalk.white(division.locationName)}'${locationPages.length > 0 ? ` with '${chalk.yellow(locationPages.join(','))}`: ''}.`));
    console.log(chalk.red(division.source));
    console.log(error);

    errors.push({
      title: `Error fetching '${division.locationName}${locationPages.length > 0 ? ` with '${chalk.yellow(locationPages.join(','))}`: ''}.`,
      url: division.source,
      details: error?.title,
    });
  }

  return undefined;
};

type FetchDataParamsShared = {
  alreadyFetchedDivisions?: AdministrativeUnit[],
  unitNames?: string[],
  path: string,
  lang?: string,
}

type FetchDataParamsUnit = FetchDataParamsShared & {
  administrativeDivisions: AdministrativeUnit[],
  isFromUserScript?: false,
}

type FetchDataParamsUSUnit = FetchDataParamsShared & {
  administrativeDivisions: UserScriptDivisionData[],
  isFromUserScript: true,
}

type FetchDataParams = FetchDataParamsUnit | FetchDataParamsUSUnit;

export const fetchData = async ({
  administrativeDivisions,
  alreadyFetchedDivisions = [],
  unitNames = [],
  path,
  lang = 'pl',
  isFromUserScript = false,
}: FetchDataParams) => {
  const unitType = unitNames[0]
  global.processed[unitType] = 0;

  const landOfWikipedia = lang === 'et' ? 'et' : lang;
  wiki.setLang(landOfWikipedia);

  const total = administrativeDivisions.length;

  console.log(chalk.blue(`${total} units to check.`))
  console.log(' ');

  const contentToSave: AdministrativeUnit[] = [];

  const limit = pLimit(7);

  const progressStatus = () => {
    if (global.processed[unitType] % 3 === 0) {
      const progressPercent = (global.processed[unitType] / total) * 100;
      const now = (new Date()).getTime();
      const timeDiffrenceInSeconds = Math.floor((now - start) / 1000);
      const timePerPercentage = timeDiffrenceInSeconds / progressPercent;
      const expectedTimeInSeconds = Math.floor(timePerPercentage * 100);
      const timeLeftSeconds = Math.floor(expectedTimeInSeconds - timeDiffrenceInSeconds);
      const timeLeftMinutes = Math.floor(timeLeftSeconds / 60);
      const timeLeftSecondsToShow = timeLeftSeconds - (timeLeftMinutes * 60);
      const timeStatus = timeDiffrenceInSeconds === 0 ? '' : `${chalk.blue(`${timeLeftMinutes > 0 ? `${timeLeftMinutes}m `: ''}${timeLeftSecondsToShow}s`)} to finish.`;
  
      console.log([
        `${chalk.yellow((global.processed[unitType] / total * 100).toFixed(1))}% -`,
        `${chalk.green(global.processed[unitType])} out of ${total}${failed > 0 ? ` (failed: ${chalk.red(failed)})` : ''}.`,
        `${timeStatus}`,
        `(${unitType})`,
      ].filter(Boolean).join(' '));
    }
  }

  const promises = administrativeDivisions.map((division: AdministrativeUnit | UserScriptDivisionData, index) => limit(() => new Promise((resolve) => {
    const fetchAndProcess = async () => {
      // Returns if fetched and has needed data
      const fetchedDivision = alreadyFetchedDivisions.find(
        ({ title, description, place, image }) => {
          if (isFromUserScript) {
            if (image?.sourceAlt !== (division as UserScriptDivisionData)?.thumbnailUrl) {
              return false;
            }

            if (description !== division.description) {
              return false;
            }
          } else {
            if (title !== (division as AdministrativeUnit)?.title) {
              return false;
            }
          }

          if (typeof place?.coordinates?.lat !== 'number' || place?.coordinates?.lat === 0) {
            return false;
          }

          if ((image?.source?.length ?? 0) === 0) {
            return false;
          }

          return true;
        }
      );

      const indexData = {
        lang,
        id: `${division.type?.[0] || 'unknown'}-${index}`,
        index,
      };

      if (fetchedDivision) {
        contentToSave.push({
          ...fetchedDivision,
          ...indexData,
        });
        // console.log(chalk.gray(`Skipping ${division.title}. Already fetched.`));

        global.processed[unitType] = global.processed[unitType] + 1;
  
        progressStatus();
  
        resolve(true);
      } else {
        if (isFromUserScript) {
          const divisionData = await fetchDivisionFromUserScript(division as UserScriptDivisionData, path, lang, unitNames, indexData);

          if (divisionData) {
            contentToSave.push({
              ...divisionData,
              ...indexData,
            });
          }
        } else {
          const divisionUpdate = await fetchDivisionFromAdministrativeUnit(division as AdministrativeUnit, path, lang, unitNames);

          contentToSave.push({
            ...divisionUpdate,
            ...indexData,
          });
        }
  
        global.processed[unitType] = global.processed[unitType] + 1;
  
        progressStatus();
  
        resolve(true);
      }
    }

    fetchAndProcess();
  })));

  await Promise.all(promises);

  fs.writeFileSync(path, JSON.stringify(contentToSave.sort((a, b) => a.index - b.index), null, 4));
  fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 4));
}