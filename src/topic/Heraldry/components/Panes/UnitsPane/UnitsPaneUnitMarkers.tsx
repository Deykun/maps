import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { queryClient } from '@/main';
import { CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

type Props = {
  id: string,
  country: string,
}

const UnitsPaneUnitMarkers = ({ id, country }: Props) => {
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

  const hasContent = (details?.markers?.animals?.length || 0) > 0 || (details?.markers?.items?.length || 0);

  if (!hasContent) {
    return null;
  }

  return (
    <p className="flex flex-wrap justify-center gap-1 text-[12px] text-ui-dark-contrast">
      {details?.markers?.animals?.map((animal) => <span className="text-nowrap">#{t(`heraldry.animal.${animal}`)}</span>)}
      {details?.markers?.items?.map((items) => <span className="text-nowrap">#{t(`heraldry.item.${items}`)}</span>)}
    </p>
  );
};

export default UnitsPaneUnitMarkers;
