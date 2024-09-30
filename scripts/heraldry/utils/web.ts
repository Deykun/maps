
import { joinImages } from 'join-images';
import sharp from 'sharp';
import chalk from 'chalk';
import { existsSync, mkdirSync } from 'fs';
import * as fsExtra from "fs-extra";
import { getSpriteLocation } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { numberOfColumnsPerSprite, numberOfRowsPerSprite, spriteOffset } from '@/topic/Heraldry/constants';


export const resizeImages = ({
  images,
  lang,
}: {
  images: {
    imageSrc: string,
    imageFile: string,
    type: string,
  }[],
  lang: string,
}) => {
  const start = (new Date()).getTime();
  const total = images.length;
  console.log(chalk.blue(`${total} images to compress.`))

  images.forEach(({ type, imageSrc, imageFile }, index) => {
    const imageName = imageFile.split('.')[0];
  
    try {
      const trimOptions = {
        threshold: 0,
      }

      sharp(imageSrc).trim(trimOptions).resize(80, 80, {
        fit: 'contain',
        position: 'center',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }).toFile(`./public/images/heraldry/${lang}/web-${type}/${imageName}-80w.webp`).catch((e) => {
        console.log({
          imageFile,
          e,
        })
      });
      sharp(imageSrc).trim(trimOptions).resize(300, 300, {
        fit: 'contain',
        position: 'center',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }).toFile(`./public/images/heraldry/${lang}/web-${type}/${imageName}-300w.webp`).catch((e) => {
        console.log({
          imageFile,
          e,
        })
      });

      if (index % 5 === 0) {
        const progressPercent = (index / total) * 100;
        const now = (new Date()).getTime();
        const timeDiffrenceInSeconds = Math.floor((now - start) / 1000);
        const timePerPercentage = timeDiffrenceInSeconds / progressPercent;
        const expectedTimeInSeconds = Math.floor(timePerPercentage * 100);
        const timeLeftSeconds = Math.floor(expectedTimeInSeconds - timeDiffrenceInSeconds);
        const timeLeftMinutes = Math.floor(timeLeftSeconds / 60);
        const timeLeftSecondsToShow = timeLeftSeconds - (timeLeftMinutes * 60);

        const timeStatus = timeDiffrenceInSeconds === 0 ? '' : `${timeDiffrenceInSeconds}s passed and ${timeLeftMinutes}m ${timeLeftSecondsToShow}s to finish.`;

        if (timeStatus) {
          console.log(`${index} of ${total} - ${timeStatus}`);
        }
      }  
    } catch (e) {
      console.log(chalk.red(imageFile))
      console.log(e);
    }
  });
};

type ImagesByIndex = {
  [index: string]: string,
}

export const getSprites = async ({
  mapJSON,
  type,
  lang,
}) => {
  const {
    imagesByIndex,
    maxIndex,
  } = Object.values(mapJSON).reduce((stack: {
    imagesByIndex: ImagesByIndex,
    maxIndex: number,
  }, { index, imagesList }: AdministrativeUnit) => {
    const imagePath = imagesList.find(({ width }) => width === '80w')?.path;

    if (imagePath && existsSync(`./public/${imagePath}`)) {
      stack.imagesByIndex[index] = `./public/${imagePath}`;
    }

    if (index > stack.maxIndex) {
      stack.maxIndex = index;
    }
  
    return stack;
  }, {
    imagesByIndex: {},
    maxIndex: 0,
  }) as {
    imagesByIndex: ImagesByIndex,
    maxIndex: number,
  };

  const numberOfImagesPerSprite = numberOfColumnsPerSprite * numberOfRowsPerSprite;

  const total = maxIndex;
  const totalSprites = Math.ceil(total / numberOfImagesPerSprite);

  console.log(`${type}: ${chalk.green(`Generating temp files for ${totalSprites} sprites`)}.`);
  console.log(' ')

  const sprites = {};

  for (let i = 0; i <= total; i++) {
    const {
      spriteIndex,
      spriteColumn,
      spriteRow,
    } = getSpriteLocation(i);

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

    sprites[spriteIndex][spriteColumn][spriteRow] = imagesByIndex[i] || './public/images/heraldry/blank-80w.png';
  }

  if (!existsSync(`./public/images/heraldry/${lang}/web/temp/${type}`)){
    mkdirSync(`./public/images/heraldry/${lang}/web/temp/${type}`);
  }

  fsExtra.emptyDirSync(`./public/images/heraldry/${lang}/web/temp/${type}`);
  fsExtra.emptyDirSync(`./public/images/heraldry/${lang}/web/sprites/`);

  console.log(`${type}: ${chalk.gray('Current images were removed.')}`)
  console.log(' ');

  /*
    Columns merged:
    [1][4][7]
    [2][5][8]
    [3][6][9]
  */

  for (let spriteIndex = 0; spriteIndex <= totalSprites; spriteIndex++) {
    const columnsSprites: string[] = [];

    for (let spriteColumn = 0; spriteColumn <= (sprites[spriteIndex]?.columnCount || 0); spriteColumn++) {
      const file = `./public/images/heraldry/${lang}/web/temp/${type}/${type}-sprite-${spriteIndex}-column-${spriteColumn}.png`;

      if (sprites[spriteIndex] && sprites[spriteIndex][spriteColumn]) {
        const columnSprites = await joinImages(Object.values(sprites[spriteIndex][spriteColumn]), {
          direction: 'vertical', 
          offset: spriteOffset,
          color: { r: 0, g: 0, b: 0, alpha: 0 },
        }).then((sprite) => sprite.toFile(file)).then(() => file);
  
        columnsSprites.push(columnSprites);
      } else {
        columnsSprites.push('./public/images/heraldry/blank-80w.png');
      }
    }

    const isNotEmptySprite = sprites[spriteIndex] && Array.isArray(columnsSprites) && columnsSprites.length > 0 && columnsSprites.some((filename) => !filename.includes('blank-80vw.png'));

    if (isNotEmptySprite) {
      await joinImages(columnsSprites, {
        direction: 'horizontal', 
        offset: spriteOffset,
        color: { r: 0, g: 0, b: 0, alpha: 0 },
      }).then((sprite) => {
          sprite.toFile(`./public/images/heraldry/${lang}/web/sprites/${type}-${spriteIndex}.webp`);
      });
  
      console.log(`${type}: sprite ${chalk.green(spriteIndex)} saved.`);
    } else {
      console.log(`${type}: sprite ${chalk.yellow(spriteIndex)} skipped because empty.`);
    }
  }

  console.log(`${type}: ${chalk.gray('temporary files removed (you can unncomment next line to keep it).')}`);
  fsExtra.emptyDirSync(`./public/images/heraldry/${lang}/web/temp/${type}`);
  console.log('')
}
