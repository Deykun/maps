import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import { queryClient } from '@/main';
import { CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

type Props = {
  id: string,
  country: string,
}

const UnitsPaneUnitColors = ({ id, country }: Props) => {
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

  const colors = details.colors;

  return (
   <div className="mt-2 -mb-[12px] ml-auto p-[12px] bg-ui-dark-contrast rounded-t-[12px] empty:hidden flex gap-1 justify-center">
      {Object.entries(colors?.byNames || {}).map(([colorName, colors = []]) => {
        const title = [
          `${colors.sort((a, b) => a.distance - b.distance)?.[0]?.distance?.toFixed(1)} p.`,
          t(`heraldry.color.${colorName}`),
        ].filter(Boolean).join(' - ');

        return (
          <span
            key={colorName}
            className="inline-flex mr-1 size-3 rounded-full bg-[#eee] group overflow-hidden"
            title={title} 
            style={{ backgroundColor: colorsMarkersByNames[colorName] }}
          >
            {colors.map((item) => <span
              key={item.color}
              className="color size-full opacity-0 group-hover:opacity-100 duration-300"
              style={{ backgroundColor: item.color }}
            />)}
          </span>
        )
      })}
    </div>
  );
};

export default UnitsPaneUnitColors;
