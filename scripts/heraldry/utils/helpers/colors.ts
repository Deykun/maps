import chalk from "chalk";
// import sharp from "sharp";
import nearestColor from "nearest-color";

import { Greyscale, ColorStatus } from "../../../../src/topic/Heraldry/types";

type RGB = [r: number, g: number, b: number];

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

const colorMatchers = {
  red: {
    getters: [
      {
        color: "#f00",
        get: nearestColor.from({ color: "#f00" }),
        thresholdDistance: 80,
      },
      {
        color: "#fe3940",
        get: nearestColor.from({ color: "#fe3940" }),
        thresholdDistance: 30,
      },
      {
        color: "#c13338",
        get: nearestColor.from({ color: "#c13338" }),
        thresholdDistance: 30,
      },
      {
        color: "#d55943",
        get: nearestColor.from({ color: "#d55943" }),
        thresholdDistance: 15,
      },
    ],
  },
  green: {
    getters: [
      {
        color: "#0f0",
        get: nearestColor.from({ color: "#0f0" }),
        thresholdDistance: 90,
      },
      {
        color: "#006f00",
        get: nearestColor.from({ color: "#006f00" }),
        thresholdDistance: 90,
      },
      {
        color: "#00824a",
        get: nearestColor.from({ color: "#00824a" }),
        thresholdDistance: 60,
      },
      {
        color: "#07923f",
        get: nearestColor.from({ color: "#07923f" }),
        thresholdDistance: 60,
      },
    ],
  },
  blue: {
    getters: [
      {
        color: "#00f",
        get: nearestColor.from({ color: "#00f" }),
        thresholdDistance: 60,
      },
      {
        color: "#0059c7",
        get: nearestColor.from({ color: "#0059c7" }),
        thresholdDistance: 60,
      },
      {
        color: "#1d7dc0",
        get: nearestColor.from({ color: "#1d7dc0" }),
        thresholdDistance: 60,
      },
      {
        color: "#5596c3",
        get: nearestColor.from({ color: "#5596c3" }),
        thresholdDistance: 80,
      },
      {
        color: "#0000bf",
        get: nearestColor.from({ color: "#0000bf" }),
        thresholdDistance: 60,
      },
      {
        color: "#0099ff",
        get: nearestColor.from({ color: "#0099ff" }),
        thresholdDistance: 60,
      },
      {
        color: "#243b7f",
        get: nearestColor.from({ color: "#243b7f" }),
        thresholdDistance: 60,
      },
      {
        color: "#2e3192",
        get: nearestColor.from({ color: "#2e3192" }),
        thresholdDistance: 60,
      },
      {
        color: "#98d9f1",
        get: nearestColor.from({ color: "#98d9f1" }),
        thresholdDistance: 30,
      },
    ],
  },
  gold: {
    getters: [
      {
        color: "#bfa14e",
        get: nearestColor.from({ color: "#bfa14e" }),
        thresholdDistance: 60,
      },
      {
        color: "#e6c633",
        get: nearestColor.from({ color: "#e6c633" }),
        thresholdDistance: 60,
      },
      {
        color: "#b68f5e",
        get: nearestColor.from({ color: "#b68f5e" }),
        thresholdDistance: 60,
      },
      {
        color: "#ffff00",
        get: nearestColor.from({ color: "#ffff00" }),
        thresholdDistance: 50,
      },
      {
        color: "#eee1a8",
        get: nearestColor.from({ color: "#eee1a8" }),
        thresholdDistance: 30,
      },
    ],
  },
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

  if (greyscale.isGreyscale) {
    let name = "grey";
    let matcherColor = "#888";
    if (greyscale.isBlack) {
      name = "black";
      matcherColor = "#000";
    } else if (greyscale.isWhite) {
      name = "white";
      matcherColor = "#fff";
    }

    return [
      {
        didMatch: true,
        color: hexColor,
        name,
        matcherColor,
        distanceToThreshold: -1,
        thresholdDistance: 0,
        distance: 0,
        ...greyscale,
      },
    ];
  }

  const colorStatuses = Object.keys(colorMatchers).reduce(
    (stack: ColorStatus[], colorName) => {
      const colorMatches: ColorStatus[] = (
        colorMatchers[colorName]?.getters || []
      ).map(({ get, thresholdDistance, color: matcherColor }) => {
        const match = get(hexColor);

        const didMatch = (match.distance || 0) < thresholdDistance;

        return {
          didMatch,
          color: hexColor,
          name: colorName,
          distanceToThreshold: thresholdDistance - match.distance,
          matcherColor,
          thresholdDistance,
          distance: match?.distance,
          ...greyscale,
        };
      });

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
