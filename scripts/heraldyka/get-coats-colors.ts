import fs from 'fs';
import path from 'path';
import ColorThief from 'colorthief';

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
}
function rgbToHex([r,g,b]: [r: number, g: number, b: number]) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// const image = fs.readFileSync('./public/images/heraldyka/gminy/herb-bodzanowa.png');
const image = path.resolve('./diffle-28.07.2024074153.jpeg');

const primary = await ColorThief.getColor(image).then(color => rgbToHex(color));

const palette = await ColorThief.getPalette(image, 3).then(palette => palette.map(color => rgbToHex(color)));

console.log({
  primary,
  palette,
});