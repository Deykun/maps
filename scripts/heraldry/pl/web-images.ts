import fs from 'fs';
import sharp from 'sharp';
import chalk from 'chalk';
import { joinImages } from 'join-images';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

import { chunkArray } from '../../../src/utils/array';

import gminyJson from '../../../src/pages/heraldyka/gminy-map.json';
import miastaJson from '../../../src/pages/heraldyka/miasta-map.json';
import powiatyJSON from '../../../src/pages/heraldyka/powiaty-map.json';
import wojewodztwaJSON from '../../../src/pages/heraldyka/wojewodztwa-map.json';

type ImagesByIndex = {
  [index: string]: string,
}

const numberOfSpriteImages = 200;

const getSprites = ({
  mapJSON,
  type,
  lang,
}) => {
  const imagesByIndex = Object.values(mapJSON).reduce((stack: ImagesByIndex, { index, imagesList }: AdministrativeUnit) => {
    const imagePath = imagesList.find(({ width }) => width === '80w')?.path;
  
    if (imagePath) {
      stack[index] = `./public/${imagePath}`;
    }
  
    return stack;
  }, {}) as ImagesByIndex;

  const total = Object.keys(imagesByIndex).length;
  const totalSprites = Math.max(total / numberOfSpriteImages);

  const sprites = {};

  for (let i = 0; i < totalSprites; i++) {
    sprites[i] = Array(numberOfSpriteImages).fill('./public/images/heraldry/blank-80w.png')
  }

  for (let i = 0; i < total; i++) {
    const spriteIndex = Math.floor(i / numberOfSpriteImages);

    if (imagesByIndex[i]) {
      sprites[spriteIndex][i % numberOfSpriteImages] = imagesByIndex[i];
    }
  }

  for (let i = 0; i < totalSprites; i++) {
    const spriteData = sprites[i].map((path) => path || './public/images/heraldry/blank-80w.png');

    joinImages(spriteData).then((sprite) => {
      sprite.toFile(`./public/images/heraldry/${lang}/web/sprites/${type}-${i}.png`);
    });
  }
}

getSprites({
  mapJSON: gminyJson,
  type: 'gminy',
  lang: 'pl',
});

getSprites({
  mapJSON: powiatyJSON,
  type: 'powiaty',
  lang: 'pl',
});

getSprites({
  mapJSON: miastaJson,
  type: 'miasta',
  lang: 'pl',
});

getSprites({
  mapJSON: wojewodztwaJSON,
  type: 'wojewodztwa',
  lang: 'pl',
});