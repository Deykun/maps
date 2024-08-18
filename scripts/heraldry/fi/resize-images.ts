import fs from 'fs';
import { resizeImages } from '../utils/web';

const imagesKunta = fs.readdirSync('./public/images/heraldry/fi/kunta').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/fi/kunta/${imageFile}`, imageFile, type: 'kunta' }),
);

const imagesFormerKunta = fs.readdirSync('./public/images/heraldry/fi/formerKunta').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/fi/formerKunta/${imageFile}`, imageFile, type: 'formerKunta' }),
);

const imagesMaakunta = fs.readdirSync('./public/images/heraldry/fi/maakunta').map(
  (imageFile) => ({ imageSrc: `./public/images/heraldry/fi/maakunta/${imageFile}`, imageFile, type: 'maakunta' }),
);

const images = [...imagesKunta, ...imagesFormerKunta, ...imagesMaakunta];

resizeImages({
  images,
  lang: 'fi',
});
