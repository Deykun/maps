import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { useFiltersDevelopmentStore } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import queryClient from '@/providers/utils/queryClient';
import { CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

type Props = {
  id: string,
  country: string,
  shouldShowOnlyRejected?: boolean,
  labelPosition: 'bottomLeft' | 'bottomRight',
}

const UnitsPaneUnitColors = ({ id, country, shouldShowOnlyRejected = false, labelPosition }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const { t } = useTranslation();

  const data = queryClient.getQueryData(['details', country]);

  const details = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const unitDetails = (data as {
      detailsForUnitsById: {
        [id: string]: CoatOfArmsDetailsData,
      }
    }).detailsForUnitsById?.[id];

    if (unitDetails) {
      return unitDetails;
    }

    return undefined;
  }, [data]);

  const hasContent = details?.colors;

  if (!hasContent) {
    return null;
  }

  const matchedColorsNames = Object.keys(details.colors?.byNames || {});

  const colors = shouldShowOnlyRejected ? details.colors?.byNamesRejected : details.colors?.byNames;

  return (
    <>
      {Object.entries(colors || {}).map(([colorName, colors = []]) => {
        if (shouldShowOnlyRejected && matchedColorsNames.includes(colorName)) {
          return false;
        }

        const bestMatch = colors.sort((a, b) => a.distanceToThreshold - b.distanceToThreshold)?.[0];
        const shouldShowThreshold = isFiltersDevModeActive && bestMatch && bestMatch.distanceToThreshold && !['black', 'grey', 'white'].includes(colorName);

        return (
          <span
            key={colorName}
            className={clsx(
              'group inline-flex size-[8px] rounded-full bg-[#eee] shadow-md',
              'relative ui-tooltip-wrapper ui-tooltip-wrapper--small',
            )}
            style={{ backgroundColor: colorsMarkersByNames[colorName] }}
          >
            {colors.map((item) => <span
              key={item.matcherColor}
              className="color size-full rounded-full opacity-0 group-hover:opacity-100 duration-300"
              style={{ backgroundColor: item.color }}
              data-color-from-image={item.color}
            />)}
            <span className={clsx(
              `ui-tooltip ui-tooltip--${labelPosition}`,{
                '!left-[-1px]': labelPosition === 'bottomRight',
                '!right-[-1px]': labelPosition === 'bottomLeft',
              }
            )}>
              <strong className="capitalize">{t(`heraldry.color.${colorName}`)}</strong>
              {shouldShowThreshold && 
                <small><br />Distance: <strong>{bestMatch?.distanceToThreshold.toFixed(1)}</strong></small>
              }
            </span>
          </span>
        )
      })}
    </>
  );
};

export default UnitsPaneUnitColors;
