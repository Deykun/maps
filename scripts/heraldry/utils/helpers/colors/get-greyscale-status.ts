import { Greyscale, RGB } from "../../../../../src/topic/Heraldry/types";

export const getGreyscaleStatus = ([r, g, b]: RGB): Greyscale => {
  const isGreyscale =
    Math.abs(r - g) <= 20 && Math.abs(g - b) <= 20 && Math.abs(b - r) <= 20;
  const isLowSaturation =
    isGreyscale ||
    (Math.abs(r - g) <= 40 && Math.abs(g - b) <= 40 && Math.abs(b - r) <= 40);

  if (isGreyscale) {
    const isBlack = Math.min(r, g, b) <= 20;
    const isWhite = Math.max(r, g, b) >= 235;

    return {
      isGreyscale: true,
      isLowSaturation,
      isGrey: !isBlack && !isWhite,
      isBlack,
      isWhite,
    };
  }

  return {
    isGreyscale: false,
    isLowSaturation,
    isGrey: false,
    isBlack: false,
    isWhite: false,
  };
};
