import { RGB } from "../../../../../src/topic/Heraldry/types";

const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
};

export const convertRgbToHex = ([r, g, b]: RGB) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
