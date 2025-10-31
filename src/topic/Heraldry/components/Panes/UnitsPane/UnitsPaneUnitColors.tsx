import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { useFiltersDevelopmentStore } from "@/topic/Heraldry/stores/filtersDevelopmentStore";

import {
  colorsMarkersByNames,
  MINIMAL_COLOR_PERCENTAGE,
} from "@/topic/Heraldry/constants";

import queryClient from "@/providers/utils/queryClient";
import { CoatOfArmsDetailsData } from "@/topic/Heraldry/types";

type Props = {
  id: string;
  country: string;
  shouldShowOnlyRejected?: boolean;
  labelPosition: "bottomLeft" | "bottomRight";
};

const UnitsPaneUnitColorsMatched = ({
  id,
  country,
  shouldShowOnlyRejected = false,
  labelPosition,
}: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore(
    (state) => state.isModeActive
  );

  const { t } = useTranslation();

  const data = queryClient.getQueryData(["details", country]);

  const details = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const unitDetails = (
      data as {
        detailsForUnitsById: {
          [id: string]: CoatOfArmsDetailsData;
        };
      }
    ).detailsForUnitsById?.[id];

    if (unitDetails) {
      return unitDetails;
    }

    return undefined;
  }, [data]);

  const hasContent = details?.colors;

  if (!hasContent) {
    return null;
  }

  const colorsByNames = details.colors?.colorsByNames || {};

  const colorNames = Object.entries(colorsByNames)
    .filter(
      ([colorName, percentage = 0]) =>
        colorName !== "transparent" && percentage > MINIMAL_COLOR_PERCENTAGE
    )
    .sort(
      ([, aPercentage = 0], [, bPercentage = 0]) => bPercentage - aPercentage
    )
    .map(([colorName]) => colorName);

  return (
    <>
      {colorNames.map((colorName) => (
        <span
          key={colorName}
          className={clsx(
            "group inline-flex size-[8px] rounded-full shadow-md",
            "relative ui-tooltip-wrapper ui-tooltip-wrapper--small"
          )}
          style={{ backgroundColor: colorsMarkersByNames[colorName] }}
        >
          <span
            className={clsx(`ui-tooltip ui-tooltip--${labelPosition}`, {
              "!left-[-1px]": labelPosition === "bottomRight",
              "!right-[-1px]": labelPosition === "bottomLeft",
            })}
          >
            <strong className="capitalize">
              {t(`heraldry.color.${colorName}`)}
            </strong>
            <small>
              {" - "}
              {(colorsByNames[colorName] * 100).toFixed(2)}%
            </small>
          </span>
        </span>
      ))}
    </>
  );
};

export default UnitsPaneUnitColorsMatched;
