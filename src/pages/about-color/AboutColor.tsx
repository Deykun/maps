// import { getColorStatus } from "@/utils/color";
import { useMemo } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { getColorStatus } from "@scripts/heraldry/utils/helpers/colors";
import ColorMatchDescription from "./components/ColorMatchDescription";

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

  const matches = useMemo(() => {
    // return {};
    // console.log(color);
    const response = hexToRgb(color.hex as unknown as string);

    if (response) {
      const { r, g, b } = response;

      return getColorStatus([r, g, b]);
    }

    return getColorStatus([0, 0, 0]);
  }, [color]);

  // const

  console.log(matches);
  // console.log(x);

  return (
    <div>
      <div className="p-4">
        <ColorPicker color={color} onChange={setColor} hideAlpha />
      </div>
      <header className="p-4">
        <h1 className="flex gap-2 items-end">
          <span
            className="inline-flex size-7 rounded-sm"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          />
          <span>{color.hex}</span>
        </h1>
      </header>
      <div className="flex p-4 gap-5">
        <div className="w-1/3">
          <h2>Matched</h2>
          <ul className="flex flex-col gap-2">
            {matches
              .filter(({ didMatch }) => didMatch)
              .map((status) => (
                <ColorMatchDescription status={status} />
              ))}
          </ul>
        </div>
        <div className="w-1/3">
          <h2>Not matched</h2>
          <ul className="flex flex-col gap-2">
            {matches
              .filter(({ didMatch }) => !didMatch)
              .map((status) => (
                <ColorMatchDescription status={status} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutColor;
