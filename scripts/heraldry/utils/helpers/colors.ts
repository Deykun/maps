import { ImageColors } from "../../../../src/topic/Heraldry/types";
import sharp from "sharp";
import { getColorsNames } from "./colors/get-colors-names";

export const roundWithPrecision = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
};

export const getImageColors = async (
  imagePath: string
): Promise<ImageColors> => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const imageColorsByNames: {
    [name: string]: number;
  } = {};

  // tl;dr; it checks each pixel individually
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const pixel = data.subarray(index, index + channels);

      const rgbColor: [number, number, number] = [pixel[0], pixel[1], pixel[2]];
      const alpha = pixel[3];

      if (alpha < 40) {
        imageColorsByNames.transparent =
          (imageColorsByNames.transparent || 0) + 1;
      } else {
        const matchedColorsNames = getColorsNames(rgbColor);

        matchedColorsNames.forEach((name: string) => {
          imageColorsByNames[name] = (imageColorsByNames[name] || 0) + 1;
        });
      }
    }
  }

  const size = height * width;
  const sizeWithoutTransparent = size - (imageColorsByNames.transparent || 0);

  const colorsByNamesAsPercentages = Object.fromEntries(
    Object.entries(imageColorsByNames).map(
      ([colorName, numberOfPixelsWithColor]) => {
        const percentage =
          colorName === "transparent"
            ? numberOfPixelsWithColor / size
            : numberOfPixelsWithColor / sizeWithoutTransparent;

        return [colorName, roundWithPrecision(percentage, 4)];
      }
    )
  );

  return {
    hasTransparent: (imageColorsByNames.transparent || 0) > 0,
    colorsByNames: colorsByNamesAsPercentages,
  };
};
