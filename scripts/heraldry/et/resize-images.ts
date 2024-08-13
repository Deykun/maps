import fs from 'fs';
import sharp from 'sharp';
import chalk from 'chalk';

const imagesUnit = fs.readdirSync('./public/images/heraldry/et/unit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/et/unit/${imageFile}`, imageFile, type: 'unit' }),
);

const images = [...imagesUnit];

const start = (new Date()).getTime();
const total = images.length;
console.log(chalk.blue(`${total} images to compress.`))

images.forEach(({ type, imageSrc, imageFile }, index) => {
  const imageName = imageFile.split('.')[0];

  const trimOptions = {
    threshold: 0,
  }

  sharp(imageSrc).trim(trimOptions).resize(null, 200).toFile(`./public/images/heraldry/et/web-${type}/${imageName}-x2.webp`);
  sharp(imageSrc).trim(trimOptions).resize(null, 300).toFile(`./public/images/heraldry/et/web-${type}/${imageName}-x3.webp`);
  sharp(imageSrc).trim(trimOptions).resize(null, 400).toFile(`./public/images/heraldry/et/web-${type}/${imageName}-x4.webp`);

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
