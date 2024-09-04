import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import clxs from 'clsx';

import { MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Button from '@/components/UI/Button';
import Pane from '@/components/UI/Pane';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type FetchParmas = {
  country: string,
}

const fetchData = async ({ country }: FetchParmas) => {
  const response = await fetch(`/maps/data/heraldry/${country}/filters.json`).then((response) => response.json());

  const animals = (response.animals || []) as MarkerParams[];
  const items = (response.animals || []) as MarkerParams[];

  return {
    animals,
    items,
  };
};

type Props = FetchParmas & {
  setCustomFilter: (filter?: MarkerParamsWithResult) => void
};

const DevelopmentPaneAppFilters = ({
  country,
  setCustomFilter,
}: Props) => {
  const [pickedFilter, setPickedFilter] = useState<MarkerParams | undefined>(undefined);
  const { t } = useTranslation();

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryFn: () => fetchData({ country }),
    queryKey: ['filter', country],
    staleTime: 5 * 60 * 1000,
  });

  const handleClick = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target.value || '');
    const [type, indexString] = value.split('-');
    const index = Number(indexString);

    if (data && type === 'animal') {
      setPickedFilter(data.animals[index]);
    } else if (data && type === 'item') {
      setPickedFilter(data.items[index]);
    } else {
      setPickedFilter(undefined);
    }
  }, [data]);

  if (isError) {
    console.log('error', error);
  }

  return (
    <Pane className="fixed left-12 mt-3 w-[400px] max-h-[calc(100%_-_1.5rem)] overflow-auto top-0 ml-6">
      <h3 className="flex gap-3 items-center">
        <IconSelected className="size-5" />
        <span>
          App filters
        </span>
      </h3>
      <div className="sans text-[14px] flex flex-col gap-2 text-right">
        <p>
          You can read about the filters
          {' '}
          <a
            href="https://github.com/Deykun/maps/blob/main/docs/FILTERS.md"
            target="_blank"
            className="font-[500] text-[#d2543a]"
          >
            here
          </a>
          {'. '}
        </p>
      </div>
        <select
          disabled={isLoading}
          onChange={handleClick}
          className={clxs('sans w-full p-1 px-2 text-[14px] bg-white border', {
            'rounded-b-[4px]': !pickedFilter
          })}
        >
          <option>Pick filter</option>
          {data && <>
            {data.animals.map(({ name }, index) => (
              <option
                key={name}
                value={`animal-${index}`}
              >
                {t('heraldry.animal.filterTitle')}: {t(`heraldry.animal.${name}`)}
              </option>
            ))}
            {data.items.map(({ name }, index) => (
              <option
                key={name}
                value={`item-${index}`}
              >
                {t('heraldry.item.filterTitle')}: {t(`heraldry.item.${name}`)}
              </option>
            ))}
          </>}
        </select>
        
        <div className="flex gap-2">
          <Button
            onClick={() => pickedFilter ? setCustomFilter(pickedFilter) : {}}
            wrapperClassName="ml-auto"
            isDisabled={!pickedFilter}
          >
            <span>Use</span>
            <IconSelectNew />
          </Button>
      </div>
        {pickedFilter && <DevelopmentPaneSnippet {...pickedFilter} />}
    </Pane>
  );
}

export default DevelopmentPaneAppFilters;
