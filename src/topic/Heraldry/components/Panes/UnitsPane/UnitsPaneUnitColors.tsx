import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import { queryClient } from '@/main';
import { CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

type Props = {
  id: string,
  country: string,
  shouldShowOnlyRejected?: boolean,
}

const UnitsPaneUnitColors = ({ id, country, shouldShowOnlyRejected = false }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const { t } = useTranslation();

  const data = queryClient.getQueryData([country, 'details']);

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

        const bestMatch = colors.sort((a, b) => a.distanceToTreshold - b.distanceToTreshold)?.[0];

        const title = isFiltersDevModeActive ? [
          t(`heraldry.color.${colorName}`),
          bestMatch?.distanceToTreshold && !['black', 'grey', 'white'].includes(colorName) ? `(distance: ${bestMatch?.distanceToTreshold.toFixed(1)})` : '',
        ].filter(Boolean).join(' ') : t(`heraldry.color.${colorName}`);

        return (
          <span
            key={colorName}
            className="inline-flex size-[8px] rounded-full bg-[#eee] shadow-md group overflow-hidden"
            title={title} 
            style={{ backgroundColor: colorsMarkersByNames[colorName] }}
          >
            {colors.map((item) => <span
              key={item.color}
              className="color size-full opacity-0 group-hover:opacity-100 duration-300"
              style={{ backgroundColor: item.color }}
              data-color-from-image={item.color}
            />)}
          </span>
        )
      })}
    </>
  );
};

export default UnitsPaneUnitColors;
