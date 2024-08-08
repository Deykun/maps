import fs from 'fs';
import path from 'path';
import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

const getColorName = nearestColor.from({
  // white: '#fff',
  // black: '#000',
  // gray: '#848484',
  yellow: '#ffdf00',
  red: '#da251d',
  orange: '#fe6632',
  lightblue: '#0096d8',
  blue: '#0000ff',
  green: '#009241',
});

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const image = fs.readFileSync('./public/images/heraldyka/gminy/herb-bodzanowa.png');
// const image = path.resolve('./diffle-28.07.2024074153.jpeg');

const primary = await ColorThief.getColor(image).then(color => {
  const hexColor = rgbToHex(color);
  const near = getColorName(hexColor);

  return {
    color: hexColor,
    name: near.name,
    distanceToName: near.distance,
  };
});

const palette = await ColorThief.getPalette(image, 5).then(palette => palette.map(color => {
  const hexColor = rgbToHex(color);
  const near = getColorName(hexColor);

  return {
    color: hexColor,
    name: near.name,
    distanceToName: near.distance,
  };
}));

console.log({
  primary,
  palette,
});