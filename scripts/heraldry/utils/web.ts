
import { joinImages } from 'join-images';
import sharp from 'sharp';
import chalk from 'chalk';
import { existsSync } from 'fs';
import * as fsExtra from "fs-extra";
import { AdministrativeUnit } from '@/topic/Heraldry/types';
import { numberOfImagesPerSprite, spriteOffset } from '@/topic/Heraldry/constants'

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

export const getSprites = ({
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

  const total = maxIndex;
  const totalSprites = Math.max(total / numberOfImagesPerSprite);

  const sprites = {};

  for (let i = 0; i <= totalSprites; i++) {
    sprites[i] = Array(numberOfImagesPerSprite).fill('./public/images/heraldry/blank-80w.png')
  }

  for (let i = 0; i <= total; i++) {
    const spriteIndex = Math.floor(i / numberOfImagesPerSprite);

    if (imagesByIndex[i]) {
      sprites[spriteIndex][i % numberOfImagesPerSprite] = imagesByIndex[i];
    }
  }

  fsExtra.emptyDirSync(`./public/images/heraldry/${lang}/web/sprites/`);

  for (let i = 0; i <= totalSprites; i++) {
    const spriteData = sprites[i].map((path) => path || './public/images/heraldry/blank-80w.png');

    joinImages(spriteData, {
        offset: spriteOffset,
        color: { r: 0, g: 0, b: 0, alpha: 0 },
    }).then((sprite) => {
      sprite.toFile(`./public/images/heraldry/${lang}/web/sprites/${type}-${i}.webp`);
    });
  }
}
