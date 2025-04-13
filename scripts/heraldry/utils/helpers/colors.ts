import chalk from "chalk";
// import sharp from "sharp";

import { Greyscale, ColorStatus } from "../../../../src/topic/Heraldry/types";
import { Saturation } from "react-color-palette";

type RGB = [r: number, g: number, b: number];
type HSV = [hue: number, saturation: number, value: number];

const hexToRGB = (hexRaw: string): RGB => {
  let hex = hexRaw.replace(/^#/, "");

  // If it's a shorthand (3 characters), expand it to 6
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
};

const convertRGBToHSV = ([r, g, b]: RGB): HSV => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0,
    s = 0,
    v = max;

  if (delta !== 0) {
    s = delta / max;

    switch (max) {
      case r:
        h = 60 * (((g - b) / delta) % 6);
        break;
      case g:
        h = 60 * ((b - r) / delta + 2);
        break;
      case b:
        h = 60 * ((r - g) / delta + 4);
        break;
    }
  }

  if (h < 0) h += 360;

  return [h, s, v];
};

const power = {
  hue: 100,
  saturation: 10,
  value: 40,
};

const powerSum = Object.values(power).reduce(
  (stack, value) => stack + value,
  0
);

type DistanceBetweenColors = {
  total: number;
  hue: number;
  saturation: number;
  value: number;
};

const cache: {
  [hexAhexB: string]: DistanceBetweenColors;
} = {};

const getDistanceBetweenColors = (
  hexA: string,
  hexB: string
): DistanceBetweenColors => {
  if (cache[`${hexA}${hexB}`]) {
    return cache[`${hexA}${hexB}`];
  }

  const rgbA = hexToRGB(hexA);
  const rgbB = hexToRGB(hexB);

  const hsvA = convertRGBToHSV(rgbA);
  const hsvB = convertRGBToHSV(rgbB);

  const distances = {
    hue: Math.abs(hsvA[0] - hsvB[0]),
    saturation: Math.abs(hsvA[1] - hsvB[1]),
    value: Math.abs(hsvA[2] - hsvB[2]),
  };

  if (distances.hue > 180) {
    distances.hue = 360 - distances.hue;
  }

  // as percentage
  distances.hue = distances.hue / 360;

  const result = {
    total:
      power.hue * distances.hue +
      power.saturation * distances.saturation +
      (power.value * distances.value) / powerSum,
    ...distances,
  };

  cache[`${hexA}${hexB}`] = result;

  return result;
};

export const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
};

export const rgbToHex = ([r, g, b]: RGB) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const getGreyscale = ([r, g, b]: RGB): Greyscale => {
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

const colorMatchers: {
  [colorName: string]: {
    hexColor: string;
    thresholdDistance: number;
  }[];
} = {
  red: [
    {
      hexColor: "#f00",
      thresholdDistance: 5,
    },
  ],
  green: [
    {
      hexColor: "#0f0",
      thresholdDistance: 5,
    },
  ],
  orange: [
    {
      hexColor: "#ffa000",
      thresholdDistance: 5,
    },
  ],
  blue: [
    {
      hexColor: "#00f",
      thresholdDistance: 5,
    },
  ],
  // gold: [
  //   {
  //     hexColor: "#bfa14e",
  //     thresholdDistance: 1,
  //   },
  // ],
};

const allSupportedColors = [
  "white",
  "grey",
  "white",
  "transparent",
  ...Object.keys(colorMatchers),
];

export const getColorStatus = (color: RGB): ColorStatus[] => {
  const hexColor = rgbToHex(color);

  const greyscale = getGreyscale(color);

  // if (greyscale.isGreyscale) {
  //   let name = "grey";
  //   let matcherColor = "#888";
  //   if (greyscale.isBlack) {
  //     name = "black";
  //     matcherColor = "#000";
  //   } else if (greyscale.isWhite) {
  //     name = "white";
  //     matcherColor = "#fff";
  //   }

  //   return [
  //     {
  //       didMatch: true,
  //       color: hexColor,
  //       name,
  //       matcherColor,
  //       distanceToThreshold: -1,
  //       thresholdDistance: 0,
  //       distance: 0,
  //       ...greyscale,
  //     },
  //   ];
  // }

  const colorStatuses = Object.keys(colorMatchers).reduce(
    (stack: ColorStatus[], colorName) => {
      const colorMatches: ColorStatus[] = colorMatchers[colorName].map(
        ({ thresholdDistance, hexColor: matcherHex }) => {
          const response = getDistanceBetweenColors(matcherHex, hexColor);
          const distanceFromTopSaturation = Math.sqrt(
            response.saturation ** 2 + response.value ** 2
          );
          const isStrongColor = distanceFromTopSaturation < 0.6;
          console.log(
            "isStrongColor",
            isStrongColor,
            distanceFromTopSaturation
          );

          const didMatch =
            isStrongColor && (response.total || 0) < thresholdDistance;

          return {
            didMatch,
            color: hexColor,
            name: colorName,
            distanceToThreshold: thresholdDistance - response.total,
            matcherColor: matcherHex,
            thresholdDistance,
            distance: response.total,
            ...greyscale,
          };
        }
      );

      const bestMatchForColor = colorMatches.sort(
        (a: ColorStatus, b: ColorStatus) =>
          b.distanceToThreshold - a.distanceToThreshold
      )[0];

      stack.push({
        didMatch: bestMatchForColor.didMatch,
        color: hexColor,
        name: colorName,
        distanceToThreshold: bestMatchForColor.distanceToThreshold,
        matcherColor: bestMatchForColor.matcherColor,
        thresholdDistance: bestMatchForColor.thresholdDistance,
        distance: bestMatchForColor?.distance,
        ...greyscale,
      });

      return stack;
    },
    []
  );

  const didNotMatchAnything =
    colorStatuses.some(({ didMatch }) => didMatch) === false;
  if (didNotMatchAnything && greyscale.isLowSaturation === false) {
    console.log(`Missing match for color ${chalk.white(hexColor)}`);
  }

  return colorStatuses;
};

export const getImageColors = async (imagePath: string) => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const imageColors = allSupportedColors.reduce(
    (stack: { [colorName: string]: number }, colorName) => {
      stack[colorName] = 0;

      return stack;
    },
    {}
  );

  // tl;dr; it checks each pixel individually
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const pixel = data.subarray(index, index + channels);

      const RGB: [number, number, number] = [pixel[0], pixel[1], pixel[2]];
      const alpha = pixel[3];

      if (alpha < 40) {
        imageColors.transparent += 1;
      } else {
        const statuses = getColorStatus(RGB);

        statuses.forEach(({ didMatch, name }) => {
          if (didMatch) {
            imageColors[name] = imageColors[name] ? imageColors[name] + 1 : 1;
          }
        });
      }
    }
  }

  const total = height * width;

  const imageColorsAsPercentage: {
    [name: string]: number;
  } = Object.entries(imageColors).reduce((stack, [name, value]) => {
    stack[name] = Math.round((1000 * value) / total) / 10;

    return stack;
  }, {});

  return imageColorsAsPercentage;
};
