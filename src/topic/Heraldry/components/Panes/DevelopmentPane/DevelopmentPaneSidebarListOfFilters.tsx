import { memo, useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import IconCopy from '@/components/Icons/IconCopy';
import IconEraser from '@/components/Icons/IconEraser';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';
import IconAnimal from '@/components/Icons/IconAnimal';
import IconCrown from '@/components/Icons/IconCrown';

import Space from '@/components/UI/Space';
import ButtonText from '@/components/UI/ButtonText';

import useQueryFiltersSeeds from '@/topic/Heraldry/features/modify/hooks/useQueryFiltersSeeds';

import { copyText } from '@/utils/text';

import { MarkerParamsWithResult } from '@/topic/Heraldry/types';

import FilterModifications from '@/topic/Heraldry/features/modifyMarkers/components/DevelopmentPaneSidebarListOfFilters/FilterModifications';
import { useFilterModificationStore, selectShortcuts, resetModifications } from '@/topic/Heraldry/features/modifyMarkers/stores/filtersModificationStore';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type Props = {
  country: string,
  setDraftFilter: Dispatch<SetStateAction<MarkerParamsWithResult>>,
  onUse: () => void,
};

const DevelopmentPaneSidebarListOfFilters = ({
  country,
  setDraftFilter,
  onUse,
}: Props) => {
  const shortcuts = useFilterModificationStore(state => selectShortcuts(state, 100));
  const [selected, setSelected] = useState<{ type: 'type' | 'animal' | 'item', name: string } | undefined>();
  const { t } = useTranslation();

  const handleDraftUpdate = useCallback((filter: MarkerParamsWithResult) => {
    setDraftFilter(filter);
    onUse();
  }, [onUse, setDraftFilter])

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQueryFiltersSeeds({ country });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!data) {
      return;
    }

    const value = (event.target.value || '');
    const [type, name] = value.split('-');

    if (['type', 'animal', 'item'].includes(type)) {
      setSelected({
        type: type as 'type' | 'animal' | 'item',
        name,
      });

      return;
    }

    setSelected(undefined);
  }, [data]);

  const selectedFilter = useMemo(() => {
    if (data && selected?.type === 'type') {
      const filter = data.types.find(({ name }) => selected?.name === name);

      return filter;
    } 

    if (data && selected?.type === 'animal') {
      const filter = data.animals.find(({ name }) => selected?.name === name);

      return filter;
    } 
    
    if (data && selected?.type === 'item') {
      const filter = data.items.find(({ name }) => selected?.name === name);

      return filter;
    }

    return undefined;
  }, [handleChange, selected]);

  if (isError) {
    console.log('error', error);
  }

  return (
    <div className="ui-slide-from-left-sidebar fixed top-0 left-0 z-[-1] max-h-[100dvh] overflow-auto no-scrollbar">
      <div className="mr-auto w-[400px] max-w-[100vw]">
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
          {shortcuts.length > 0 && <div className="flex gap-2 flex-wrap">
            <ButtonText
              size="small"
              onClick={resetModifications}
            >
              <IconEraser />
              <span>{t('heraldry.list.clear')}</span>
            </ButtonText>
            {shortcuts.map(({ name, type, total }) => <ButtonText
              size="small"
              key={name}
              onClick={() => setSelected({ name, type })}
              isActive={selected?.name === name && selected?.type === type}
              isDisabled={!data}
            >
              {type === 'animal' ? <IconAnimal animals={[name]} /> : <IconCrown />}
              <span>{t(`heraldry.${type}.${name}`)} <small>({total})</small></span>
            </ButtonText>)}
          </div>}
          <select
            disabled={isLoading}
            onChange={handleChange}
            className="block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-[8px] py-2 px-4"
          >
            <option>Pick filter</option>
            {data && <>
              {data.types.sort((a, b) => 
                `${t(`heraldry.unit.type.${country}.${a.name}`)}`.localeCompare(
                  `${t(`heraldry.unit.type.${country}.${b.name}`)}`
              )).map(({ name }) => (
                <option
                  key={name}
                  value={`type-${name}`}
                >
                  {t(`heraldry.unit.type.${country}.${name}`)} ({t('heraldry.unit.filterTitle')})
                </option>
              ))}
              {data.animals.sort((a, b) => 
                `${t(`heraldry.animal.${a.name}`)}`.localeCompare(
                  `${t(`heraldry.animal.${b.name}`)}`
              )).map(({ name }) => (
                <option
                  key={name}
                  value={`animal-${name}`}
                >
                  {t(`heraldry.animal.${name}`)} ({t('heraldry.animal.filterTitle')})
                </option>
              ))}
              {data.items.sort((a, b) => 
                `${t(`heraldry.item.${a.name}`)}`.localeCompare(
                  `${t(`heraldry.item.${b.name}`)}`
              )).map(({ name }) => (
                <option
                  key={name}
                  value={`item-${name}`}
                >
                {t(`heraldry.item.${name}`)} ({t('heraldry.item.filterTitle')})
                </option>
              ))}
            </>}
          </select>
          <div className="flex gap-2">
            {selectedFilter && <ButtonText
              onClick={() => copyText(`${JSON.stringify(selectedFilter, null, 4)},`)}
            >
              <span>{t('main.copy')}</span>
              <IconCopy />
            </ButtonText>}
            <ButtonText
              onClick={() => selectedFilter ? handleDraftUpdate(selectedFilter) : {}}
              wrapperClassName="ml-auto"
              isActive={Boolean(selectedFilter)}
              isDisabled={!selectedFilter}
            >
              <span>Use</span>
              <IconSelectNew />
            </ButtonText>
          </div>
          {selectedFilter && <DevelopmentPaneSnippet
            className="rounded-[8px]"
            {...selectedFilter}
          />}
          {selectedFilter && selected && ['animal', 'item'].includes(selected.type) && <FilterModifications
            snippetClassName="rounded-[8px]"
            type={selected.type as 'animal' | 'item'}
            name={selected.name}
            filter={selectedFilter}
            setDraftFilter={handleDraftUpdate}
          />}
        </div>
        <Space side="left" isLast isLarge className="bg-ui-dark mb-5" />
      </div>
    </div>
  );
}

export default memo(DevelopmentPaneSidebarListOfFilters);
