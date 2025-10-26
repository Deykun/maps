import { existsSync, writeFileSync, mkdirSync } from "fs";
import * as fsExtra from "fs-extra";
import sharp from "sharp";
import chalk from "chalk";
import { resolve } from "path";
import { clearLastLines } from "./helpers/console";
import { getImageHash, getImageFileName } from "./helpers/images";

import {
  AdministrativeUnit,
  CoatOfArmsDetailsData,
} from "../../../src/topic/Heraldry/types";

import { getMarkers } from "../../../src/topic/Heraldry/utils/markers/getMarkers";

import { getImageColors } from "./helpers/colors";

const start = new Date().getTime();

export const getDetails = async ({
  administrativeDivisions,
  alreadyFetchedDivisions = [],
  path,
  country,
  chunkIndex,
  shouldRemoveTemporaryFiles = true,
}: {
  administrativeDivisions: AdministrativeUnit[];
  alreadyFetchedDivisions?: CoatOfArmsDetailsData[];
  path: string;
  country: string;
  chunkIndex?: number;
  shouldRemoveTemporaryFiles?: boolean;
}) => {
  const contentToSaveForDetails: CoatOfArmsDetailsData[] = [];
  const alreadyFetchedDetailsById = alreadyFetchedDivisions.reduce(
    (
      stack: {
        [id: string]: CoatOfArmsDetailsData;
      },
      item
    ) => {
      stack[item.id] = item;

      return stack;
    },
    {}
  );

  const total = administrativeDivisions.length;

  console.log(" ");
  console.log(`${chalk.blue(total)} coats to fetch (${chalk.yellow(path)}).`);
  console.log(" ");

  if (total === 0) {
    return;
  }

  const getTimeStatus = (i: number) => {
    const progressPercent = (i / total) * 100;
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

    return timeStatus;
  };

  for (let i = 0; i < total; i++) {
    const unit = administrativeDivisions[i];
    const fileName = getImageFileName(unit);

    const expectedFilePath = `./public/images/heraldry/${country}/${path}/${fileName}-320w.webp`;

    if (!existsSync(`./public/images/heraldry/${country}/web/temp/${path}`)) {
      mkdirSync(`./public/images/heraldry/${country}/web/temp/${path}`, {
        recursive: true,
      });
    }

    if (i > 0) {
      clearLastLines(3);
    }

    if (existsSync(expectedFilePath)) {
      // The ID is being added because, if the image is duplicated, sometimes a previous iteration removes it from the current one before it can be used
      const temporaryPngFile = `./public/images/heraldry/${country}/web/temp/${path}/${fileName}-${unit.id}-180.png`;

      let wasColorTakenFromCache = false;
      let colors;
      if (alreadyFetchedDetailsById[unit.id]?.colors) {
        colors = alreadyFetchedDetailsById[unit.id].colors;
        wasColorTakenFromCache = true;
      } else {
        try {
          await sharp(expectedFilePath)
            .resize(180, 180)
            .toFile(temporaryPngFile);

          const imagePath = resolve(temporaryPngFile);

          const imageColors = await getImageColors(imagePath);

          colors = imageColors;
        } catch (error) {
          console.log(chalk.red(`Broken color data ${expectedFilePath}`));
          console.log(error);
        }
      }

      const { animals, items } = getMarkers({
        text: unit?.description || "",
        title: unit?.title || "",
        imageHash: getImageHash(unit),
        country,
      });

      const hasMarkers = animals.length > 0 || items.length > 0;

      contentToSaveForDetails.push({
        id: unit.id,
        ...(colors ? { colors } : {}),
        ...(hasMarkers
          ? {
              markers: {
                ...(animals.length > 0 ? { animals } : {}),
                ...(items.length > 0 ? { items } : {}),
              },
            }
          : {}),
      });

      console.log(
        [
          chalk.green("✓"),
          chalk.gray(`validating "${chalk.white(unit.title)}"`),
          chalk.gray(`(index: ${chalk.white(unit.index)})`),
          wasColorTakenFromCache
            ? chalk.gray(`- color from cache.`)
            : undefined,
        ]
          .filter(Boolean)
          .join(" ")
      );
    }

    console.log(" ");
    console.log(
      [
        chalk.yellow(
          `  Progress ${chalk.green(`${((i / total) * 100).toFixed(1)}%`)}.`
        ),
        `${chalk.white(i)} out of ${chalk.white(total)}.`,
        getTimeStatus(i),
        typeof chunkIndex === "number"
          ? chalk.gray(`(chunk ${chunkIndex})`)
          : "",
      ]
        .filter(Boolean)
        .join(" ")
    );
    console.log(" ");
  }

  console.log(" ");
  console.log(
    [
      chalk.green("✓"),
      chalk.white(`path "${chalk.green(path)}" finished.`),
    ].join(" ")
  );
  console.log(" ");

  const chunkSuffix = typeof chunkIndex === "number" ? `-${chunkIndex}` : "";

  if (shouldRemoveTemporaryFiles) {
    fsExtra.emptyDirSync(
      `./public/images/heraldry/${country}/web/temp/${path}/`
    );
  }

  writeFileSync(
    `./public/data/heraldry/${country}/${path}${chunkSuffix}-details-data.json`,
    JSON.stringify(contentToSaveForDetails, null, 1)
  );
};
