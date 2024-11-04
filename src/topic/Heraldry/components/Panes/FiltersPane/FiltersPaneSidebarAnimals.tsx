import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { WITH_ANIMAL, WITHOUT_ANIMAL } from '@/topic/Heraldry/constants';

import IconAnimal from '@/components/Icons/IconAnimal';
import IconForbidden from '@/components/Icons/IconForbidden';

import Space from '@/components/UI/Space';
import ButtonText from '@/components/UI/ButtonText';

import useFiltersStore, {
  setAnimal as setFilters,
  toggleAnimal as toggle,
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

const FiltersPaneSidebarTypes = ({
  filtersList,
}: Props) => {
  const filters = useFiltersStore(state => state.animal);
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
            <IconAnimal className="size-5 text-white" animals={filters.length === 1 ? filters : []}  />
            <span>
              {t('heraldry.animal.filterTitle')}
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
          <ButtonText
            onClick={() => toggle(WITH_ANIMAL)}
            isActive={filters.includes(WITH_ANIMAL)}
          >
            <IconAnimal />
            <span>
              {t(`heraldry.animal.${WITH_ANIMAL}`)}
            </span>
          </ButtonText>
          <ButtonText
            onClick={() => toggle(WITHOUT_ANIMAL)}
            isActive={filters.includes(WITHOUT_ANIMAL)}
          >
            <IconForbidden />
            <span>
              {t(`heraldry.animal.${WITHOUT_ANIMAL}`)}
            </span>
          </ButtonText>
          <div className="border-t border-dashed border-ui" />
          {filtersList.length > 0 && <ul>
            {filtersList.sort(getSorter({ sortBy, tBase: `heraldry.animal.`, t })).map(({ value, total }) => <li
              key={value}
              className="block pl-4"
            >
              <FiltersPaneFilter
                type={clickType}
                isSelected={filters.includes(value)}
                onChange={() => handleToggle(value)}
                label={t(`heraldry.animal.${value}`)}
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

export default memo(FiltersPaneSidebarTypes);
