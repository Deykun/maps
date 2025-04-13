import { Colors } from './types'

export const WITH_ANIMAL = 'withAnimal';
export const WITHOUT_ANIMAL = 'withoutAnimals';

export const colorsByNames: Colors = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
};

export const colorsByNamesShift: Colors = {
  yellow: '#ff0',
  pink: '#f0f',
  cyan: '#0ff',
};

export const colorsByNamesGrayscale: Colors = {
  white: '#fff',
  gray: '#888',
  black: '#000',
};

export const colorsMarkersByNames: Colors = {
  black: '#000',
  grey: '#888',
  white: '#fff',
  gold: '#bfa14e',
  red: '#d61e27',
  green: '#299649',
  blue: '#1d7dc0',

  // new
  orange: '#f99208',
};

export const numberOfColumnsPerSprite = 50;
export const numberOfRowsPerSprite = 30;

export const spriteSize = 80;
export const spriteOffset = 4;

export const mapPadding = 40;

export const maxSelectedWithClick = 50;
