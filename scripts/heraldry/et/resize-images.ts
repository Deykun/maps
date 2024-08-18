import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesUnit = fs.readdirSync('./public/images/heraldry/et/unit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/et/unit/${imageFile}`, imageFile, type: 'unit' }),
);

const imagesFormerUnit = fs.readdirSync('./public/images/heraldry/et/formerUnit').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/et/formerUnit/${imageFile}`, imageFile, type: 'formerUnit' }),
);

const images = [...imagesUnit, ...imagesFormerUnit];

resizeImages({
  images,
  lang: 'et',
});