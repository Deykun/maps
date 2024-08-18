import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesGiminy = fs.readdirSync('./public/images/heraldry/pl/gminy').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/gminy/${imageFile}`, imageFile, type: 'gminy' }),
);
const imagesMiasta = fs.readdirSync('./public/images/heraldry/pl/miasta').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/miasta/${imageFile}`, imageFile, type: 'miasta' }),
);
const imagesPowiaty = fs.readdirSync('./public/images/heraldry/pl/powiaty').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/powiaty/${imageFile}`, imageFile, type: 'powiaty' }),
);

const wojewodztwaPowiaty = fs.readdirSync('./public/images/heraldry/pl/wojewodztwa').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/pl/wojewodztwa/${imageFile}`, imageFile, type: 'wojewodztwa' }),
);

const images = [...imagesGiminy, ...imagesMiasta, ...imagesPowiaty, ...wojewodztwaPowiaty];

resizeImages({
  images,
  lang: 'pl',
});