// import { getColorStatus } from "@/utils/color";
import { useMemo } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { getColorStatus } from "@scripts/heraldry/utils/helpers/colors";
import ColorMatchDescription from "./components/ColorMatchDescription";
import { colorsMarkersByNames } from "@/topic/Heraldry/constants";
import { ColorStatus } from "@/topic/Heraldry/types";

const emptyColorStatus = {
  ...getColorStatus([255, 255, 255])[0],
  name: "missing",
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove the hash if present
  const sanitizedHex = hex.replace(/^#/, "");

  // Handle shorthand form (#abc)
  const fullHex =
    sanitizedHex.length === 3
      ? sanitizedHex
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitizedHex;

  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) {
    return null; // Invalid format
  }

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return { r, g, b };
};

const AboutColor = () => {
  const [color, setColor] = useColor("#561ecb");

  const { statusesByColorName = {}, matchingColorsNames = [] } = useMemo(() => {
    const response = hexToRgb(color.hex as unknown as string);

    if (!response) {
      return {
        statusesByColorName: {},
        matchingColorsNames: [],
      };
    }

    const { r, g, b } = response;

    return getColorStatus([r, g, b]).reduce(
      (
        stack: {
          statusesByColorName: { [colorName: string]: ColorStatus };
          matchingColorsNames: string[];
        },
        status
      ) => {
        stack.statusesByColorName[status.name] = status;

        if (status.didMatch) {
          stack.matchingColorsNames.push(status.name);
        }

        return stack;
      },
      {
        statusesByColorName: {},
        matchingColorsNames: [],
      }
    );
  }, [color]);

  return (
    <div>
      <div className="p-4">
        <ColorPicker color={color} onChange={setColor} hideAlpha />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <header
          className="flex gap-2 items-center p-4"
          style={{ backgroundColor: color.hex }}
        >
          <h1 className="bg-white p-2 rounded-md">
            <span>{color.hex}</span>
          </h1>
          <ul className="ml-auto flex gap-2 items-center bg-white p-1 rounded-md empty:hidden">
            {matchingColorsNames.map((colorName) => {
              const { matcherColor } = statusesByColorName[colorName];
              return (
                <li
                  className="inline-flex size-7 rounded-sm relative"
                  style={{ backgroundColor: matcherColor }}
                  title={matcherColor}
                />
              );
            })}
          </ul>
        </header>
        <div className="flex flex-col gap-2">
          {Object.keys(colorsMarkersByNames).map((colorName) => {
            if (statusesByColorName[colorName]) {
              return (
                <ColorMatchDescription
                  status={statusesByColorName[colorName]}
                />
              );
            }

            return <ColorMatchDescription status={emptyColorStatus} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutColor;
