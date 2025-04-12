import { ColorStatus } from "@/topic/Heraldry/types";
import { colorsMarkersByNames } from "@/topic/Heraldry/constants";

type Props = {
  status: ColorStatus;
};

const ColorMatchDescription = ({ status }: Props) => {
  const { name, matcherColor, distanceToThreshold } = status;
  return (
    <li className="flex gap-2 items-end">
      <span
        className="inline-flex size-7 rounded-sm relative"
        style={{ backgroundColor: matcherColor }}
        title={matcherColor}
      >
        <span
          className="absolute top-0 left-0 h-full w-3/5 rounded-l-sm"
          style={{ backgroundColor: colorsMarkersByNames[name] }}
          title={colorsMarkersByNames[name]}
        ></span>
      </span>
      <strong>{name}</strong>
      <small>{distanceToThreshold.toFixed(1)}pt</small>
    </li>
  );
};

export default ColorMatchDescription;
