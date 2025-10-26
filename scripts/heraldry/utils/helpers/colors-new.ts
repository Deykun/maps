import nearestColor from "nearest-color";
import { ImageColors } from "../../../../src/topic/Heraldry/types";
import getPixels from "get-pixels";
import sharp from "sharp";
import { getColorsNames } from "./colors/get-colors-names";

export const getNewImageColors = async (imagePath: string): Promise<ImageColors> => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // console.log(data);
  // console.log(info);

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

  const colorsByNamesAsPercentages = Object.fromEntries(
    Object.entries(imageColorsByNames).map(
      ([colorName, numberOfPixelsWithColor]) => {
        return [colorName, numberOfPixelsWithColor / size];
      }
    )
  );

  return {
    hasTransparent: (imageColorsByNames.transparent || 0) > 0,
    colorsByNames: colorsByNamesAsPercentages,
  };
};
