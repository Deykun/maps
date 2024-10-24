import { memo, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import IconCopy from '@/components/Icons/IconCopy';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Space from '@/components/UI/Space';
import ButtonText from '@/components/UI/ButtonText';

import { copyText } from '@/utils/text';

import { MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type FetchParmas = {
  country: string,
}

const fetchData = async ({ country }: FetchParmas) => {
  const response = await fetch(`/maps/data/heraldry/${country}/filters.json`).then((response) => response.json());

  const animals = (response.animals || []) as MarkerParams[];
  const items = (response.items || []) as MarkerParams[];

  return {
    animals,
    items,
  };
};

type Props = FetchParmas & {
  setDraftFilter: Dispatch<SetStateAction<MarkerParamsWithResult>>,
};

const DevelopmentPaneSidebarListOfFilters = ({
  country,
  setDraftFilter,
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
    <div className="ui-slide-from-left-sidebar fixed top-0 left-0 z-[-1] w-[400px] max-w-[100vw] max-h-[100dvh] overflow-auto no-scrollbar">
      <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pl-[60px] rounded-br-[18px] flex flex-col gap-[12px] relative">
        <h3 className="flex gap-3 items-center text-[14px]">
          <IconSelected className="size-5 text-white" />
          <span>
            App filters
          </span>
        </h3>
        <p className="text-right text-[12px]">
          You can read about the filters
          {' '}
          <a
            href="https://github.com/Deykun/maps/blob/main/docs/FILTERS.md"
            target="_blank"
            className="font-[500] text-white"
          >
            here
          </a>
          {'. '}
        </p>
        <select
          disabled={isLoading}
          onChange={handleClick}
          className="block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-[8px] py-2 px-4"
        >
          <option>Pick filter</option>
          {data && <>
            {data.animals.sort((a, b) => 
              `${t(`heraldry.animal.${a.name}`)}`.localeCompare(
                `${t(`heraldry.animal.${b.name}`)}`
            )).map(({ name }, index) => (
              <option
                key={name}
                value={`animal-${index}`}
              >
                {t('heraldry.animal.filterTitle')}: {t(`heraldry.animal.${name}`)}
              </option>
            ))}
            {data.items.sort((a, b) => 
              `${t(`heraldry.item.${a.name}`)}`.localeCompare(
                `${t(`heraldry.item.${b.name}`)}`
            )).map(({ name }, index) => (
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
          {pickedFilter && <ButtonText
            onClick={() => copyText(JSON.stringify(pickedFilter, null, 4))}
          >
            <span>{t('main.copy')}</span>
            <IconCopy />
          </ButtonText>}
          <ButtonText
            onClick={() => pickedFilter ? setDraftFilter(pickedFilter) : {}}
            wrapperClassName="ml-auto"
            isActive={Boolean(pickedFilter)}
            isDisabled={!pickedFilter}
          >
            <span>Use</span>
            <IconSelectNew />
          </ButtonText>
        </div>
        {pickedFilter && <DevelopmentPaneSnippet className="rounded-[8px]" {...pickedFilter} />}
      </div>
      <Space side="left" isLast isLarge className="bg-ui-dark mb-5" />
    </div>
  );
}

export default memo(DevelopmentPaneSidebarListOfFilters);
