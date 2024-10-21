import { useMemo } from 'react';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { queryClient } from '@/main';

type Props = {
  id: string,
  country: string,
}

const UnitsPaneUnitDescription = ({ id, country }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const description = useMemo(() => {
    if (!isFiltersDevModeActive) {
      return undefined;
    }

    const data = queryClient.getQueryData(['dev', country]);

    if (data) {
      return Object.values(data).find(({ id: idToCheck }) => idToCheck === id)?.description;
    }

    return undefined;
  }, [id, country]);

  if (!isFiltersDevModeActive || !description) {
    return null;
  }

  return (
    <div className="mt-4 text-ui-dark-contrast">
      <h3 className="text-[14px]">
        Description
      </h3>
      <div
        className="my-2 sans text-[10px] text-justify hyphens-auto line-clamp-6"
        dangerouslySetInnerHTML={{
          __html: description.includes('||||') ?
          (description as string).split('||||').map((paragraph) => `<p class="mb-2 last:mb-0">${paragraph}</p>`).join('')
          : `<p class="mb-2 last:mb-0">${description}<p>`,
        }}
      />
    </div>
  );
};

export default UnitsPaneUnitDescription;
