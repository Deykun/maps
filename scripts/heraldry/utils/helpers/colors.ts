import chalk from 'chalk';
import sharp from 'sharp';
import nearestColor from 'nearest-color';
import { extractColors } from 'extract-colors'
import getPixels from 'get-pixels';

import { Greyscale, ColorStatus } from '../../../../src/topic/Heraldry/types';

type RGB = [r: number, g: number, b: number];

export const componentToHex = (color: number) => {
  const hex = color.toString(16);

  return hex.padStart(2, "0");
};

export const rgbToHex = ([r,g,b]: RGB) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


export const getGreyscale = ([r,g,b]: RGB): Greyscale => {
  const isGreyscale = Math.abs(r - g) <= 20 && Math.abs(g - b) <= 20 && Math.abs(b - r) <= 20;
  const isLowSaturation = isGreyscale || (Math.abs(r - g) <= 40 && Math.abs(g - b) <= 40 && Math.abs(b - r) <= 40);

  if (isGreyscale) {
    const isBlack = Math.min(r,g,b) <= 20;
    const isWhite = Math.max(r,g,b) >= 235;

    return {
      isGreyscale: true,
      isLowSaturation,
      isGrey: !isBlack && !isWhite,
      isBlack,
      isWhite,
    }
  }

  return {
    isGreyscale: false,
    isLowSaturation,
    isGrey: false,
    isBlack: false,
    isWhite: false,
  }
};


const colorMatchers = {
  red: {
    getters: [{
      color: '#f00',
      get: nearestColor.from({ color: '#f00' }),
      thresholdDistance: 80,
    }, {
      color: '#fe3940',
      get: nearestColor.from({ color: '#fe3940' }),
      thresholdDistance: 30,
    }],
  },
  green: {
    getters: [{
      color: '#0f0',
      get: nearestColor.from({ color: '#0f0' }),
      thresholdDistance: 90,
    }, {
      color: '#006f00',
      get: nearestColor.from({ color: '#006f00' }),
      thresholdDistance: 90,
    }, {
      color: '#00824a',
      get: nearestColor.from({ color: '#00824a' }),
      thresholdDistance: 60,
    }, {
      color: '#07923f', 
      get: nearestColor.from({ color: '#07923f' }),
      thresholdDistance: 60,
    }],
  },
  blue: {
    getters: [{
      color: '#00f',
      get: nearestColor.from({ color: '#00f' }),
      thresholdDistance: 60,
    }, {
      color: '#0059c7',
      get: nearestColor.from({ color: '#0059c7' }),
      thresholdDistance: 60,
    }, {
      color: '#1d7dc0',
      get: nearestColor.from({ color: '#1d7dc0' }),
      thresholdDistance: 60,
    }, {
      color: '#5596c3',
      get: nearestColor.from({ color: '#5596c3' }),
      thresholdDistance: 80,
    }, {
      color: '#0000bf',
      get: nearestColor.from({ color: '#0000bf' }),
      thresholdDistance: 60,
    }, {
      color: '#0099ff',
      get: nearestColor.from({ color: '#0099ff' }),
      thresholdDistance: 60,
    }, {
      color: '#243b7f',
      get: nearestColor.from({ color: '#243b7f' }),
      thresholdDistance: 60,
    }, {
      color: '#2e3192',
      get: nearestColor.from({ color: '#2e3192' }),
      thresholdDistance: 60,
    }],
  },
  gold:{
    getters: [{
      color: '#bfa14e',
      get: nearestColor.from({ color: '#bfa14e' }),
      thresholdDistance: 60,
    }, {
      color: '#e6c633',
      get: nearestColor.from({ color: '#e6c633' }),
      thresholdDistance: 60,
    }, {
      color: '#b68f5e', 
      get: nearestColor.from({ color: '#b68f5e' }),
      thresholdDistance: 60,
    }, {
      color: '#ffff00', 
      get: nearestColor.from({ color: '#ffff00' }),
      thresholdDistance: 50,
    }],
  },
};

export const getColorStatus = (color: RGB): ColorStatus[] => {
  const hexColor = rgbToHex(color);

  const greyscale = getGreyscale(color);

  if (greyscale.isGreyscale) {
    let name = 'grey';
    let matcherColor = '#888';
    if (greyscale.isBlack) {
      name = 'black';
      matcherColor = '#000';
    } else if (greyscale.isWhite) {
      name = 'white';
      matcherColor = '#fff';
    }

    return [{
      didMatch: true,
      color: hexColor,
      name,
      matcherColor,
      distanceToThreshold: -1,
      thresholdDistance: 0,
      distance: 0,
      ...greyscale,
    }];
  }

  const statusesToReturn: ColorStatus[] = [];

  ['red', 'blue', 'green', 'gold'].forEach((colorName) => {
    const colorMatches: ColorStatus[] = (colorMatchers[colorName]?.getters || []).map(({ get, thresholdDistance, color: matcherColor }) => {
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

    const bestMatch = colorMatches.sort((a: ColorStatus, b: ColorStatus) => b.distanceToThreshold - a.distanceToThreshold)[0];

    statusesToReturn.push({
      didMatch: bestMatch.didMatch,
      color: hexColor,
      name: colorName,
      distanceToThreshold: bestMatch.distanceToThreshold,
      matcherColor: bestMatch.matcherColor,
      thresholdDistance: bestMatch.thresholdDistance,
      distance: bestMatch?.distance,
      ...greyscale,
    });
  });

  return statusesToReturn;
};

export const getImageColors = async (image: string) => {
  const colorsPaletteRGB: RGB[] = await new Promise((resolve, reject) => {
    try {
      getPixels(image, (error, pixels) => {
        if (error) {
          console.log(`${chalk.red('getPixels error from:')} ${chalk.yellow(image)}`);

          reject([]);

          return;
        }

        const data = [...pixels.data]
        const [width, height] = pixels.shape
    
        resolve(extractColors({ data, width, height }, {
          pixels: 400,
          distance: 0.3,
          saturationDistance: 0.5,
          lightnessDistance: 0.3,
          hueDistance: 0
        }).then(res => res.map(({ red, green, blue}) => [red, green, blue])));
      });
    } catch (error) {
      console.log('EERRR');
      console.error(error);
      reject([]);
    }
  });

  const hexPalette = colorsPaletteRGB.map(rgbToHex);
  const colorsPalette = colorsPaletteRGB.flatMap(getColorStatus);

  const {
    byNames,
    byNamesRejected,
  } = colorsPalette.reduce(
    (stack, color) => {
      if (color.name) {
        const propName = color.didMatch ? 'byNames' : 'byNamesRejected';
        if (Array.isArray(stack[color.name])) {
          stack[propName][color.name].push(color);
        } else {
          stack[propName][color.name] = [color];
        }
      }
      return stack;
    }, {
      byNames: {},
      byNamesRejected: {},
    },
  );

  return {
    colorsPalette,
    hexPalette,
    byNames,
    byNamesRejected,
  };
};
