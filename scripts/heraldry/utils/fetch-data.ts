import fs, { existsSync, mkdirSync } from "fs";
import wiki from "wikipedia";
import chalk from "chalk";
import pLimit from "p-limit";

import {
  AdministrativeUnit,
  UserScriptDivisionData,
} from "../../../src/topic/Heraldry/types";

import { getImageFromThumbnailUrl } from "./helpers/images";
import {
  locationTitleByCoatOfArmsTitle,
  locationTitleByImages,
} from "./constants";
import { getVerifiedImageUrl } from "./helpers/data/overrides/get-verified-image-url";
import { getLocationData } from "./helpers/data/get-location-data";

const start = new Date().getTime();
const errors: { title: string; url: string; details?: string[] }[] = [];

global.processed = typeof global.processed === "object" ? global.processed : {};
let failed = 0;

const safeFetchLoop = async ({
  country,
  page,
  title,
}: {
  country: string;
  page: string;
  title: string;
}) => {
  try {
    const response = await wiki.page(page);

    let coordinates = await response.coordinates();

    if (coordinates?.lat) {
      return {
        isSuccess: true,
        response,
        coordinates,
      };
    }

    if (country === "fi") {
      const references = await response.infobox();

      // fi: keskus -> en: center
      if (references.keskus) {
        try {
          const responseSubpage = await wiki.page(references.keskus);

          coordinates = await responseSubpage.coordinates();

          if (coordinates?.lat) {
            return {
              isSuccess: true,
              response,
              coordinates,
            };
          }
        } catch {
          //
        }

        return {
          isSuccess: false,
          errorMessage: `Page '${page}' exists but without location, tried related "${references.keskus}". But it failed.`,
        };
      }
    }

    if (country === "nl") {
      const references = await response.infobox();
      const { latDeg, latMin, lonDeg, lonMin } = references;

      if (latDeg && lonDeg) {
        return {
          isSuccess: true,
          response,
          coordinates: {
            lat: Number(`${latDeg}.${latMin || 0}`),
            lon: Number(`${lonDeg}.${lonMin || 0}`),
          },
        };
      }
    }

    return {
      isSuccess: false,
      errorMessage: `Page '${page}' exists but without location, no location.`,
    };
  } catch (error) {
    return {
      isSuccess: false,
      errorMessage: `Page '${page}' does not exist.`,
      errorFromCatch: error,
    };
  }
};

const fetchDivisionFromAdministrativeUnit = async (
  division: AdministrativeUnit,
  path: string,
  country: string,
  unitNames: string[]
) => {
  let locationPages: string[] = [];
  try {
    const page = await wiki.page(division.title);
    const { place, locationPages: locationPagesRaw } = await getLocationData(
      {
        country,
        division,
        unitNames,
      },
      page
    );
    locationPages = locationPagesRaw;
    const summary = await page.summary();
    const content = await page.content();

    division.description = content.substring(0, 3000);
    division.image = getVerifiedImageUrl(summary.thumbnail, { country });

    if (!division.image) {
      console.log(
        `${chalk.red(`Missing thumbnail for:`)} ${chalk.yellow(division.title)}`
      );
    }

    const categories = await page.categories();
    // const images = await page.images();

    if (place) {
      division.place = place;
    } else {
      let didFetch = false;
      let divisionPage;
      const divisionError: string[] = [];
      let divisionCoordinates;
      let divisionErrorFromApi: any[] = [];

      for (let i = 0; i < locationPages.length; i++) {
        const {
          isSuccess,
          response,
          coordinates,
          errorMessage,
          errorFromCatch,
        } = await safeFetchLoop({
          country,
          page: locationPages[i],
          title: division.title,
        });
        if (errorMessage) {
          divisionError.push(errorMessage);
        }

        if (isSuccess) {
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
        console.log(
          `${chalk.red(
            `No location was found for: ${division.title}`
          )}. Page with the location not found.`
        );
        console.log(`Tried: ${chalk.yellow(locationPages.join(", "))}`);
        console.log("Those errors are saved to errors.json at the end.");
        console.log(" ");
        console.log(chalk.red(division.url));
        console.log(" ");
        console.log(divisionError.join(", "));
        divisionErrorFromApi.forEach((error) => {
          console.log(chalk.red(error));
        });
        errors.push({
          title: `Missing coordinates for: ${
            division.title || division?.locationName
          }. Page with the location not found.`,
          details: [
            `Tried pages: ${locationPages.join(", ")}.`,
            "You can check if there is a potential way to automate it: scripts/heraldry/utils/fetch-data.ts.",
            "",
            "Or just tell the tool which page name to use in scripts/heraldry/utils/constants.ts.",
            "",
            "You will find the proper name of the page in the URL, make sure it has lat and lon.",
            "",
            `List of errors:`,
            ...divisionError,
            "",
            "Item categories:",
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
          },
        };

        if (!coordinates.lon) {
          console.log(
            chalk.red(
              `Missing coordinates for '${
                division.title || division?.locationName
              }' No data.`
            )
          );
          console.log(chalk.red(division.url));
          errors.push({
            title: `Missing coordinates for '${
              division.title || division?.locationName
            }' No data.`,
            url: division.url,
          });
        }
      }
    }
  } catch (error) {
    failed = failed + 1;
    console.log(
      chalk.red(
        `Error fetching '${chalk.white(division.title)}'${
          locationPages.length > 0
            ? ` with '${chalk.yellow(locationPages.join(","))}`
            : ""
        }.`
      )
    );
    console.log(chalk.red(division.url));
    console.log(error);

    errors.push({
      title: `Error fetching '${division.title}${
        locationPages.length > 0
          ? ` with '${chalk.yellow(locationPages.join(","))}`
          : ""
      }.`,
      url: division.url,
      details: error?.title,
    });
  }

  return division;
};

const fetchDivisionFromUserScript = async (
  division: UserScriptDivisionData,
  path: string,
  country: string,
  unitNames: string[],
  indexData: {
    country: string;
    id: string;
    index: any;
  }
) => {
  let locationPages: string[] = [];
  if (locationTitleByCoatOfArmsTitle[division.title]) {
    locationPages.push(locationTitleByCoatOfArmsTitle[division.title]);
  }

  if (locationTitleByImages[division.thumbnailUrl]) {
    locationPages.push(locationTitleByImages[division.thumbnailUrl]);
  }

  if (division.locationUrl) {
    const titleOfLocationUrl = (
      (decodeURI(division.locationUrl).split("/").at(-1) as string) || ""
    ).replaceAll("_", " ");
    locationPages.push(titleOfLocationUrl);
  }

  try {
    let didFetch = false;
    let divisionPage;
    const divisionError: string[] = [];
    let divisionCoordinates;
    let divisionErrorFromApi: any[] = [];

    for (let i = 0; i < locationPages.length; i++) {
      const { isSuccess, response, coordinates, errorMessage, errorFromCatch } =
        await safeFetchLoop({
          country,
          page: locationPages[i],
          title: division.title,
        });
      if (errorMessage) {
        divisionError.push(errorMessage);
      }

      if (isSuccess) {
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
      console.log(
        `${chalk.red(
          `No location was found '${division.title || division.locationName}' ${
            division.sourceTitle
          }`
        )}. Page with the location not found.`
      );
      console.log(`Tried: ${chalk.yellow(locationPages.join(", "))}`);
      console.log("Those errors are saved to errors.json at the end.");
      console.log(" ");
      console.log(chalk.red(division.source));
      console.log(" ");
      console.log(divisionError.join(", "));
      divisionErrorFromApi.forEach((error) => {
        console.log(chalk.red(error));
      });
      errors.push({
        title: `Missing coordinates for '${
          division.title || division.locationName
        }' ${division.sourceTitle}. Page with the location not found.`,
        details: [
          `Tried pages: ${locationPages.join(", ")}.`,
          `Images: ${division.thumbnailUrl}`,
          "You can check if there is a potential way to automate it: scripts/heraldry/utils/fetch-data.ts.",
          "",
          "Or just tell the tool which page name to use in scripts/heraldry/utils/constants.ts.",
          "",
          "You will find the proper name of the page in the URL, make sure it has lat and lon.",
          "",
          `List of errors:`,
          ...divisionError,
          "",
        ],
        url: division.source,
      });
    }

    if (divisionPage) {
      const coordinates = divisionCoordinates;

      const divisionToSave: AdministrativeUnit = {
        title: divisionPage.title || division.locationName,
        country: indexData.country,
        id: indexData.id,
        index: indexData.index,
        type: division.type,
        spriteRoot: unitNames[0],
        description: division.description,
        url: division.source,
        ...(division.thumbnailUrl
          ? {
              image: {
                source: getImageFromThumbnailUrl(division.thumbnailUrl),
                sourceAlt: division.thumbnailUrl,
              },
            }
          : {}),
        place: {
          name: division.sourceTitle, // Since location is used as title, sourceTitle will be used as location title
          coordinates: {
            lat: coordinates?.lat,
            lon: coordinates?.lon,
          },
        },
      };

      if (!coordinates?.lon) {
        console.log(
          chalk.red(
            `Missing coordinates for '${
              division.title || division.locationName
            }' ${division.sourceTitle}. No data.`
          )
        );
        console.log(chalk.red(division.source));
        errors.push({
          title: `Missing coordinates for '${
            division.title || division.locationName
          }' ${division.sourceTitle}. No data.`,
          url: division.source,
        });
      }

      return divisionToSave;
    }
  } catch (error) {
    failed = failed + 1;
    console.log(
      chalk.red(
        `Error fetching '${chalk.white(division.locationName)}'${
          locationPages.length > 0
            ? ` with '${chalk.yellow(locationPages.join(","))}`
            : ""
        }.`
      )
    );
    console.log(chalk.red(division.source));
    console.log(error);

    errors.push({
      title: `Error fetching '${division.locationName}${
        locationPages.length > 0
          ? ` with '${chalk.yellow(locationPages.join(","))}`
          : ""
      }.`,
      url: division.source,
      details: error?.title,
    });
  }

  return undefined;
};

type FetchDataParamsShared = {
  alreadyFetchedDivisions?: AdministrativeUnit[];
  unitNames?: string[];
  path: string;
  country?: string;
};

type FetchDataParamsUnit = FetchDataParamsShared & {
  administrativeDivisions: AdministrativeUnit[];
  isFromUserScript?: false;
};

type FetchDataParamsUSUnit = FetchDataParamsShared & {
  administrativeDivisions: UserScriptDivisionData[];
  isFromUserScript: true;
};

type FetchDataParams = FetchDataParamsUnit | FetchDataParamsUSUnit;

const COUNTRY_TO_LANG = {
  dk: "da",
};

export const fetchData = async ({
  administrativeDivisions,
  alreadyFetchedDivisions = [],
  unitNames = [],
  path,
  country = "pl",
  isFromUserScript = false,
}: FetchDataParams) => {
  const unitType = unitNames[0];
  global.processed[unitType] = 0;

  const langOfWikipedia = COUNTRY_TO_LANG[country] || country;
  wiki.setLang(langOfWikipedia);

  const total = administrativeDivisions.length;

  console.log(chalk.blue(`${total} units to check.`));
  console.log(" ");

  const contentToSave: AdministrativeUnit[] = [];

  const limit = pLimit(7);

  const progressStatus = () => {
    if (global.processed[unitType] % 3 === 0) {
      const progressPercent = (global.processed[unitType] / total) * 100;
      const now = new Date().getTime();
      const timeDifferenceInSeconds = Math.floor((now - start) / 1000);
      const timePerPercentage = timeDifferenceInSeconds / progressPercent;
      const expectedTimeInSeconds = Math.floor(timePerPercentage * 100);
      const timeLeftSeconds = Math.floor(
        expectedTimeInSeconds - timeDifferenceInSeconds
      );
      const timeLeftMinutes = Math.floor(timeLeftSeconds / 60);
      const timeLeftSecondsToShow = timeLeftSeconds - timeLeftMinutes * 60;
      const timeStatus =
        timeDifferenceInSeconds === 0
          ? ""
          : `${chalk.blue(
              `${
                timeLeftMinutes > 0 ? `${timeLeftMinutes}m ` : ""
              }${timeLeftSecondsToShow}s`
            )} to finish.`;

      console.log(
        [
          `${chalk.yellow(
            ((global.processed[unitType] / total) * 100).toFixed(1)
          )}% -`,
          `${chalk.green(global.processed[unitType])} out of ${total}${
            failed > 0 ? ` (failed: ${chalk.red(failed)})` : ""
          }.`,
          `${timeStatus}`,
          `(${unitType})`,
        ]
          .filter(Boolean)
          .join(" ")
      );
    }
  };

  const promises = administrativeDivisions.map(
    (division: AdministrativeUnit | UserScriptDivisionData, index) =>
      limit(
        () =>
          new Promise((resolve) => {
            const fetchAndProcess = async () => {
              // Returns if fetched and has needed data
              const fetchedDivision = alreadyFetchedDivisions.find(
                ({ title, description, place, image }) => {
                  if (isFromUserScript) {
                    if (
                      image?.sourceAlt !==
                      (division as UserScriptDivisionData)?.thumbnailUrl
                    ) {
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

                  if (
                    typeof place?.coordinates?.lat !== "number" ||
                    place?.coordinates?.lat === 0
                  ) {
                    return false;
                  }

                  if ((image?.source?.length ?? 0) === 0) {
                    return false;
                  }

                  return true;
                }
              );

              const indexData = {
                country,
                id: `${division.type?.[0] || "unknown"}-${index}`,
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
                  const divisionData = await fetchDivisionFromUserScript(
                    division as UserScriptDivisionData,
                    path,
                    country,
                    unitNames,
                    indexData
                  );

                  if (divisionData) {
                    contentToSave.push({
                      ...divisionData,
                      ...indexData,
                    });
                  }
                } else {
                  const divisionUpdate =
                    await fetchDivisionFromAdministrativeUnit(
                      division as AdministrativeUnit,
                      path,
                      country,
                      unitNames
                    );

                  contentToSave.push({
                    ...divisionUpdate,
                    ...indexData,
                  });
                }

                global.processed[unitType] = global.processed[unitType] + 1;

                progressStatus();

                resolve(true);
              }
            };

            fetchAndProcess();
          })
      )
  );

  await Promise.all(promises);

  const dirToCreate = path.split("/").slice(0, -1).join("/");
  if (!existsSync(dirToCreate)) {
    mkdirSync(dirToCreate);
  }

  fs.writeFileSync(
    path,
    JSON.stringify(
      contentToSave.sort((a, b) => a.index - b.index),
      null,
      4
    )
  );
  fs.writeFileSync("./errors.json", JSON.stringify(errors, null, 4));
};
