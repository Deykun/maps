import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import IconBuilding from '@/components/Icons/IconBuilding';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';

import Space from '@/components/UI/Space';

import ButtonText from '@/components/UI/ButtonText';

import { getSorter } from './utils/sort'

import FiltersPaneFilter from './FiltersPaneFilter';
import FiltersPaneFilters from './FiltersPaneFilters';

type FilterItem = {
  value: string,
  total: number,
}

type FilterSetter = (values: string[]) => void;

type Props = {
  lang: string,
  filters: string[],
  setFilters: FilterSetter,
  toggle: (value: string) => void,
  filtersList: FilterItem[],
  shouldIgnoreFormer: boolean,
  setShouldIgnoreFormer: (value: boolean) => void,
};

const FiltersPaneSidebarTypes = ({
  lang,
  filters,
  setFilters,
  toggle,
  filtersList,
  shouldIgnoreFormer,
  setShouldIgnoreFormer,
}: Props) => {
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [clickType, setClickType] = useState<'checkbox' | 'radio'>('checkbox');

  const { t } = useTranslation();

  useEffect(() => {
    if (clickType === 'radio' && filters.length > 1) {    
      setFilters([]);
    }
  }, [clickType, filters.length])

  const clearFilters = () => {
    setFilters([]);

    if (shouldIgnoreFormer) {
      setShouldIgnoreFormer(false);
    }
  }

  const handleToggle = (value: string) => {
    const isSelected = filters.includes(value);
    if (isSelected || clickType === 'checkbox') {
      toggle(value);

      return;
    }

    setFilters([value]);
  }

  const hasFormerTypes = filtersList.some(({ value }) => value.startsWith('former'));
  const activeTotal = filters.length + (shouldIgnoreFormer ? 1 : 0);

  return (
    <div className="ui-slide-from-right-sidebar fixed top-0 right-0 z-[-1] w-[400px] max-w-[100vw] max-h-[100svh] overflow-auto">
      <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative">
        <h3 className="flex gap-3 items-center text-[14px]">
          <IconBuilding className="size-5 text-white" />
          <span>
            {t('heraldry.unit.filterTitle')}
          </span>
        </h3>
        <FiltersPaneFilters
          clickType={clickType}
          setClickType={setClickType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          activeTotal={activeTotal}
        >
          {hasFormerTypes &&
            <ButtonText
              size="small"
              onClick={() => setShouldIgnoreFormer(!shouldIgnoreFormer)}
              isActive={shouldIgnoreFormer}
              isOnLight
            >
              <IconScriptBroken />
              <span>{t('heraldry.unit.ignoreFormerUnits')}</span>
            </ButtonText>
          }
        </FiltersPaneFilters>
        {filtersList.length > 0 && <ul>
          {filtersList.sort(getSorter({ sortBy, tBase: `heraldry.unit.type.${lang}.`, t })).map(({ value, total }) => <li
            key={value}
            className="block pl-4"
          >
            <FiltersPaneFilter
              type={clickType}
              isSelected={filters.includes(value)}
              isDisabled={shouldIgnoreFormer && value.startsWith('former')}
              onChange={() => handleToggle(value)}
              label={t(`heraldry.unit.type.${lang}.${value}`)}
              total={total}
            />
          </li>)}
        </ul>}
      </div>
      <Space side="right" isLast isLarge className="bg-ui-dark mb-5" />
    </div>
  );
}

export default memo(FiltersPaneSidebarTypes);
