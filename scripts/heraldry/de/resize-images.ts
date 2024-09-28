import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesUnit = fs.readdirSync('./public/images/heraldry/de/unit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/de/unit/${imageFile}`, imageFile, type: 'unit' }),
);

// const imagesFormerUnit = fs.readdirSync('./public/images/heraldry/et/formerUnit').map(
//   (imageFile) => ({ imageSrc: `./public/images/heraldry/et/formerUnit/${imageFile}`, imageFile, type: 'formerUnit' }),
// );

const imagesFormerUnit = [];

const images = [...imagesUnit, ...imagesFormerUnit];

resizeImages({
  images,
  lang: 'de',
});