import nearestColor from "nearest-color";
import { RGB } from "../../../../../src/topic/Heraldry/types";
import { convertRgbToHex } from "./convert-rgb-to-hex";
import { getGreyscaleStatus } from "./get-greyscale-status";

type NearestColorCallback = (hex: string) => { distance?: number };

const colorMatchers: {
  [colorName: string]: {
    getters: {
      color: string;
      get: NearestColorCallback;
      thresholdDistance: number;
    }[];
  };
} = {
  red: {
    getters: [
      {
        color: "#f00",
        get: nearestColor.from({ color: "#f00" }) as NearestColorCallback,
        thresholdDistance: 80,
      },
      {
        color: "#fe3940",
        get: nearestColor.from({ color: "#fe3940" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#c13338",
        get: nearestColor.from({ color: "#c13338" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#8a3035",
        get: nearestColor.from({ color: "#8a3035" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#ab0001",
        get: nearestColor.from({ color: "#ab0001" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#800000",
        get: nearestColor.from({ color: "#800000" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#eb551d",
        get: nearestColor.from({ color: "#eb551d" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#c8481b",
        get: nearestColor.from({ color: "#c8481b" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
    ],
  },
  green: {
    getters: [
      {
        color: "#0f0",
        get: nearestColor.from({ color: "#0f0" }) as NearestColorCallback,
        thresholdDistance: 80,
      },
      {
        color: "#006f00",
        get: nearestColor.from({ color: "#006f00" }) as NearestColorCallback,
        thresholdDistance: 50,
      },
      {
        color: "#00824a",
        get: nearestColor.from({ color: "#00824a" }) as NearestColorCallback,
        thresholdDistance: 50,
      },
      {
        color: "#07923f",
        get: nearestColor.from({ color: "#07923f" }) as NearestColorCallback,
        thresholdDistance: 50,
      },
      {
        color: "#32ac61",
        get: nearestColor.from({ color: "#32ac61" }) as NearestColorCallback,
        thresholdDistance: 50,
      },
      {
        color: "#80c241",
        get: nearestColor.from({ color: "#80c241" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#77b567",
        get: nearestColor.from({ color: "#77b567" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#4f8a0d",
        get: nearestColor.from({ color: "#4f8a0d" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
      {
        color: "#5e9437",
        get: nearestColor.from({ color: "#5e9437" }) as NearestColorCallback,
        thresholdDistance: 30,
      },
    ],
  },
  blue: {
    getters: [
      {
        color: "#00f",
        get: nearestColor.from({ color: "#00f" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#0059c7",
        get: nearestColor.from({ color: "#0059c7" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#1d7dc0",
        get: nearestColor.from({ color: "#1d7dc0" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#5596c3",
        get: nearestColor.from({ color: "#5596c3" }) as NearestColorCallback,
        thresholdDistance: 80,
      },
      {
        color: "#0000bf",
        get: nearestColor.from({ color: "#0000bf" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#0099ff",
        get: nearestColor.from({ color: "#0099ff" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#243b7f",
        get: nearestColor.from({ color: "#243b7f" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#2e3192",
        get: nearestColor.from({ color: "#2e3192" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#0066d2",
        get: nearestColor.from({ color: "#0066d2" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#033578",
        get: nearestColor.from({ color: "#033578" }) as NearestColorCallback,
        thresholdDistance: 40,
      },
      {
        color: "#b2e1fd",
        get: nearestColor.from({ color: "#b2e1fd" }) as NearestColorCallback,
        thresholdDistance: 40,
      },
    ],
  },
  gold: {
    getters: [
      {
        color: "#bfa14e",
        get: nearestColor.from({ color: "#bfa14e" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#e6c633",
        get: nearestColor.from({ color: "#e6c633" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#b68f5e",
        get: nearestColor.from({ color: "#b68f5e" }) as NearestColorCallback,
        thresholdDistance: 60,
      },
      {
        color: "#ffff00",
        get: nearestColor.from({ color: "#ffff00" }) as NearestColorCallback,
        thresholdDistance: 50,
      },
      {
        color: "#fffa5f",
        get: nearestColor.from({ color: "#fffa5f" }) as NearestColorCallback,
        thresholdDistance: 40,
      },
      {
        color: "#fafe02",
        get: nearestColor.from({ color: "#fafe02" }) as NearestColorCallback,
        thresholdDistance: 40,
      },
    ],
  },
};

export const getColorsNames = (rgbColor: RGB): string[] => {
  const hexColor = convertRgbToHex(rgbColor);
  const greyscale = getGreyscaleStatus(rgbColor);

  if (greyscale.isGreyscale) {
    const colorNames: string[] = [];

    if (greyscale.isBlack) {
      colorNames.push("black");
    } else if (greyscale.isWhite) {
      colorNames.push("white");
    } else {
      colorNames.push("grey");
    }

    return colorNames;
  }

  const colorNames = ["red", "blue", "green", "gold"].filter((colorName) => {
    const matcherGetters = colorMatchers[colorName].getters;

    return matcherGetters.some((getter) => {
      return (getter.get(hexColor)?.distance || 255) < getter.thresholdDistance;
    });
  });

  return colorNames;
};
