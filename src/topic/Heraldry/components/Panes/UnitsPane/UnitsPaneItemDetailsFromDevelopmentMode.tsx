import { useMemo } from 'react';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { queryClient } from '@/main';

type Props = {
  id: string,
  country: string,
}

const UnitsPaneItemDetailsFromDevelopmentMode = ({ id, country }: Props) => {
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const description = useMemo(() => {
    if (!isFiltersDevelopmentModeActive) {
      return undefined;
    }

    const data = queryClient.getQueryData(['dev', country]);

    if (data) {
      return Object.values(data).find(({ id: idToCheck }) => idToCheck === id)?.description;
    }

    return undefined;
  }, [id, country]);

  if (!isFiltersDevelopmentModeActive || !description) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-[14px]">
        Description
      </h3>
      <p className="my-2 sans text-[12px] tracking-wider opacity-70">
        {description}
      </p>
    </div>
  );
};

export default UnitsPaneItemDetailsFromDevelopmentMode;
