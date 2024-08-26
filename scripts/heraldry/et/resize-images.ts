import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesUnit = fs.readdirSync('./public/images/heraldry/ee/unit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/ee/unit/${imageFile}`, imageFile, type: 'unit' }),
);

const imagesFormerUnit = fs.readdirSync('./public/images/heraldry/ee/formerUnit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/ee/formerUnit/${imageFile}`, imageFile, type: 'formerUnit' }),
);

const images = [...imagesUnit, ...imagesFormerUnit];

resizeImages({
  images,
  lang: 'et',
});