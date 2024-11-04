import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import IconCrown from '@/components/Icons/IconCrown';

import Space from '@/components/UI/Space';

import useFiltersStore, {
  setItem as setFilters,
  toggleItem as toggle,
} from '@/topic/Heraldry/stores/filtersStore';

import { getSorter } from './utils/sort'

import FiltersPaneFilter from './FiltersPaneFilter';
import FiltersPaneFilters from './FiltersPaneFilters';

type FilterItem = {
  value: string,
  total: number,
}

type Props = {
  filtersList: FilterItem[],
};

const FiltersPaneSidebarItems = ({
  filtersList,
}: Props) => {
  const filters = useFiltersStore(state => state.item);
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [clickType, setClickType] = useState<'checkbox' | 'radio'>(filters.length > 1 ? 'checkbox' : 'radio');

  const { t } = useTranslation();

  useEffect(() => {
    if (clickType === 'radio' && filters.length > 1) {    
      setFilters([]);
    }
  }, [clickType, filters.length])

  const clearFilters = () => {
    setFilters([]);
  }

  const handleToggle = (value: string) => {
    const isSelected = filters.includes(value);
    if (isSelected || clickType === 'checkbox') {
      toggle(value);

      return;
    }

    setFilters([value]);
  }

  const activeTotal = filters.length;

  return (
    <div className="ui-slide-from-right-sidebar no-scrollbar fixed top-0 right-0 z-[-1] w-[100vw] max-h-[100dvh] overflow-auto pointer-events-none">
      <div className="ml-auto w-[400px] max-w-[100vw]">
        <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative pointer-events-auto">
          <h3 className="flex gap-3 items-center text-[14px]">
            <IconCrown className="size-5 text-white" />
            <span>
              {t('heraldry.item.filterTitle')}
            </span>
          </h3>
          <FiltersPaneFilters
            clickType={clickType}
            setClickType={setClickType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isSortable={filtersList.length > 1}
            clearFilters={clearFilters}
            activeTotal={activeTotal}
          />
          {filtersList.length > 0 && <ul>
            {filtersList.sort(getSorter({ sortBy, tBase: `heraldry.item.`, t })).map(({ value, total }) => <li
              key={value}
              className="block pl-4"
            >
              <FiltersPaneFilter
                type={clickType}
                isSelected={filters.includes(value)}
                onChange={() => handleToggle(value)}
                label={t(`heraldry.item.${value}`)}
                total={total}
              />
            </li>)}
          </ul>}
        </div>
        <Space side="right" isLast isLarge className="bg-ui-dark mb-5" />
      </div>
    </div>
  );
}

export default memo(FiltersPaneSidebarItems);
