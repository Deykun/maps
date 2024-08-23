import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';
import getColors from 'get-image-colors';
import { extractColors } from 'extract-colors'
import getPixels from 'get-pixels';

import { Greyscale, ColorStatus } from '../../../../src/topic/Heraldry/types';


// const path = require('path')
// const getColors = require('get-image-colors')

// getColors(path.join(__dirname, 'double-rainbow.png')).then(colors => {
//   // `colors` is an array of color objects
// })


import { colorsByNames } from '../../../../src/topic/Heraldry/constants';

type RGB = [r: number, g: number, b: number];

const getColorName = nearestColor.from(colorsByNames);

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
      thresholdDistance: 60,
    }, {
      color: '#0000bf',
      get: nearestColor.from({ color: '#0000bf' }),
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
    let distanceColor = '#888';
    if (greyscale.isBlack) {
      name = 'black';
      distanceColor = '#000';
    } else if (greyscale.isWhite) {
      name = 'white';
      distanceColor = '#fff';
    }

    return [{
      didMatch: true,
      color: hexColor,
      name,
      distanceColor,
      distanceToTreshold: -1,
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
        distanceToTreshold: thresholdDistance - match.distance,
        distanceToColor: matcherColor,
        thresholdDistance,
        distance: match?.distance,
        ...greyscale,
      };
    });

    const bestMatch = colorMatches.sort((a: ColorStatus, b: ColorStatus) => b.distanceToTreshold - a.distanceToTreshold)[0];

    statusesToReturn.push({
      didMatch: bestMatch.didMatch,
      color: hexColor,
      name: colorName,
      distanceToTreshold: bestMatch.distanceToTreshold,
      distanceColor: bestMatch.distanceColor,
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
      getPixels(image, (err, pixels) => {
        if(!err) {
          const data = [...pixels.data]
          const [width, height] = pixels.shape
      
          resolve(extractColors({ data, width, height }, {
            pixels: 400,
            distance: 0.3,
            saturationDistance: 0.5,
            lightnessDistance: 0.3,
            hueDistance: 0
          }).then(res => res.map(({ red, green, blue}) => [red, green, blue])));
        }
      });
    } catch (err) {
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
