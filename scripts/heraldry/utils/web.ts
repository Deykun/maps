import { joinImages } from "join-images";
import chalk from "chalk";
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import * as fsExtra from "fs-extra";
import { getSpriteLocation } from "../../../src/topic/Heraldry/utils/getSpriteDataFromUnit";
import { CoatOfArmsMapData } from "../../../src/topic/Heraldry/types";
import {
  numberOfColumnsPerSprite,
  numberOfRowsPerSprite,
  spriteOffset,
} from "../../../src/topic/Heraldry/constants";

type ImagesByIndex = {
  [index: string]: string;
};

export const getSprites = async ({ mapJSON, type, country }) => {
  const { imagesByIndex, maxIndex } = mapJSON.reduce(
    (
      stack: {
        imagesByIndex: ImagesByIndex;
        maxIndex: number;
      },
      { index, imagesList = [] }: CoatOfArmsMapData
    ) => {
      const imagePath = imagesList.find(({ width }) => width === "80w")?.path;

      if (imagePath && existsSync(`./public/${imagePath}`)) {
        stack.imagesByIndex[index] = `./public/${imagePath}`;
      }

      if (index > stack.maxIndex) {
        stack.maxIndex = index;
      }

      return stack;
    },
    {
      imagesByIndex: {},
      maxIndex: 0,
    }
  ) as {
    imagesByIndex: ImagesByIndex;
    maxIndex: number;
  };

  const numberOfImagesPerSprite =
    numberOfColumnsPerSprite * numberOfRowsPerSprite;

  const total = maxIndex;
  const totalSprites = Math.ceil(total / numberOfImagesPerSprite);

  console.log(
    `${type}: ${chalk.green(
      `Generating temp files for ${totalSprites} sprites`
    )}.`
  );
  console.log(" ");

  const sprites = {};

  for (let i = 0; i <= total; i++) {
    const { spriteIndex, spriteColumn, spriteRow } = getSpriteLocation(i);

    if (!sprites[spriteIndex]) {
      sprites[spriteIndex] = {
        columnCount: 0,
      };
    }

    if (!sprites[spriteIndex][spriteColumn]) {
      if (sprites[spriteIndex].columnCount < spriteColumn) {
        sprites[spriteIndex].columnCount = spriteColumn;
      }

      sprites[spriteIndex][spriteColumn] = {};
    }

    sprites[spriteIndex][spriteColumn][spriteRow] =
      imagesByIndex[i] || "./public/images/heraldry/blank-80w.png";
  }

  if (!existsSync(`./public/images/heraldry/${country}/web/temp/${type}`)) {
    mkdirSync(`./public/images/heraldry/${country}/web/temp/${type}`, {
      recursive: true,
    });
  }

  fsExtra.emptyDirSync(`./public/images/heraldry/${country}/web/temp/${type}`);
  fsExtra.emptyDirSync(`./public/images/heraldry/${country}/web/sprites/`);

  console.log(`${type}: ${chalk.gray("Current images were removed.")}`);
  console.log(" ");

  /*
    Columns merged:
    [1][4][7]
    [2][5][8]
    [3][6][9]
  */

  for (let spriteIndex = 0; spriteIndex <= totalSprites; spriteIndex++) {
    const columnsSprites: string[] = [];

    for (
      let spriteColumn = 0;
      spriteColumn <= (sprites[spriteIndex]?.columnCount || 0);
      spriteColumn++
    ) {
      const file = `./public/images/heraldry/${country}/web/temp/${type}/${type}-sprite-${spriteIndex}-column-${spriteColumn}.png`;

      if (sprites[spriteIndex] && sprites[spriteIndex][spriteColumn]) {
        const columnSprites = await joinImages(
          Object.values(sprites[spriteIndex][spriteColumn]),
          {
            direction: "vertical",
            offset: spriteOffset,
            color: { r: 0, g: 0, b: 0, alpha: 0 },
          }
        )
          .then((sprite) => sprite.toFile(file))
          .then(() => file);

        columnsSprites.push(columnSprites);
      } else {
        columnsSprites.push("./public/images/heraldry/blank-80w.png");
      }
    }

    const isNotEmptySprite =
      sprites[spriteIndex] &&
      Array.isArray(columnsSprites) &&
      columnsSprites.length > 0 &&
      columnsSprites.some((filename) => !filename.includes("blank-80vw.png"));

    if (isNotEmptySprite) {
      await joinImages(columnsSprites, {
        direction: "horizontal",
        offset: spriteOffset,
        color: { r: 0, g: 0, b: 0, alpha: 0 },
      }).then((sprite) => {
        sprite.toFile(
          `./public/images/heraldry/${country}/web/sprites/${type}-${spriteIndex}.webp`
        );
      });

      console.log(`${type}: sprite ${chalk.green(spriteIndex)} saved.`);
    } else {
      console.log(
        `${type}: sprite ${chalk.yellow(spriteIndex)} was created as empty.`
      );

      await sharp("./public/images/heraldry/blank-80w.png").toFile(
        `./public/images/heraldry/${country}/web/sprites/${type}-${spriteIndex}.webp`
      );
    }
  }

  console.log(
    `${type}: ${chalk.gray(
      "temporary files removed (you can uncomment next line to keep it)."
    )}`
  );
  fsExtra.emptyDirSync(`./public/images/heraldry/${country}/web/temp/${type}`);
  console.log("");
};
