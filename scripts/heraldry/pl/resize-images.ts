import fs from 'fs';
import sharp from 'sharp';
import chalk from 'chalk';

const imagesGiminy = fs.readdirSync('./public/images/heraldry/pl/gminy').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/gminy/${imageFile}`, imageFile, type: 'gminy' }),
);
const imagesMiasta = fs.readdirSync('./public/images/heraldry/pl/miasta').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/miasta/${imageFile}`, imageFile, type: 'miasta' }),
);
const imagesPowiaty = fs.readdirSync('./public/images/heraldry/pl/powiaty').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/powiaty/${imageFile}`, imageFile, type: 'powiaty' }),
);

// const images = [...imagesGiminy, ...imagesMiasta, ...imagesPowiaty];
const images = imagesPowiaty;

const start = (new Date()).getTime();
const total = images.length;
console.log(chalk.blue(`${total} images to compress.`))

images.forEach(({ type, imageSrc, imageFile }, index) => {
  const imageName = imageFile.split('.')[0];

  const trimOptions = {
    threshold: 0,
  }

  // sharp(imageSrc).trim(trimOptions).resize(null, 50).toFile(`./public/images/heraldry/pl/web-${type}/${imageName}-w50.webp`);
  // sharp(imageSrc).trim(trimOptions).resize(null, 200).toFile(`./public/images/heraldry/pl/web-${type}/${imageName}-x2.webp`);
  // sharp(imageSrc).trim(trimOptions).resize(null, 400).toFile(`./public/images/heraldry/pl/web/${type}/${imageName}-x4.webp`);
  sharp(imageSrc).trim(trimOptions).resize(80, 80, {
    fit: 'contain',
    position: 'center',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).toFile(`./public/images/heraldry/pl/web/${type}/${index}.png`);

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
});
