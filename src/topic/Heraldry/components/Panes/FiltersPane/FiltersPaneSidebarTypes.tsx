import { memo, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { lowercaseFirstLetter } from '@/utils/text';

import IconBuilding from '@/components/Icons/IconBuilding';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';

import Space from '@/components/UI/Space';

import ButtonText from '@/components/UI/ButtonText';

import useFiltersStore, {
  setType as setFilters,
  toggleType as toggle,
  setShouldIgnoreFormer,
  toggleShouldIgnoreFormer,
} from '@/topic/Heraldry/stores/filtersStore';

import { getSorter } from './utils/sort'

import FiltersPaneFilter from './FiltersPaneFilter';
import FiltersPaneFilters from './FiltersPaneFilters';

type FilterItem = {
  value: string,
  total: number,
}

type Props = {
  country: string,
  filtersList: FilterItem[],
};

const FiltersPaneSidebarTypes = ({
  country,
  filtersList,
}: Props) => {
  const shouldIgnoreFormer = useFiltersStore(state => state.shouldIgnoreFormer);
  const filters = useFiltersStore(state => state.type);
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [clickType, setClickType] = useState<'checkbox' | 'radio'>('checkbox');

  const { t } = useTranslation();

  const {
    verified,
    unverified,
    unverifiedFormer,
  } = useMemo(() => {
    return filtersList.sort(getSorter({ sortBy, tBase: `heraldry.unit.type.${country}.`, t })).reduce((stack: {
      verified: FilterItem[],
      unverified: FilterItem[],
      unverifiedFormer: FilterItem[],
    }, item) => {
      if (item.value.startsWith('verified')) {
        stack.verified.push(item);
      } else if (item.value.startsWith('former')) {
        stack.unverifiedFormer.push(item);
      } else {
        stack.unverified.push(item);
      }

      return stack;
    }, {
      verified: [],
      unverified: [],
      unverifiedFormer: [],
    })
  }, [filtersList, country, t, sortBy]);

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

  const hasOnlyOneList = [verified.length, unverified.length, unverifiedFormer.length].filter(Boolean).length === 1;
  const isSortable = verified.length > 1 || unverified.length > 1 || unverifiedFormer.length > 1;
  const activeTotal = filters.length + (shouldIgnoreFormer ? 1 : 0);

  return (
    <div className="ui-slide-from-right-sidebar no-scrollbar fixed top-0 right-0 z-[-1] w-[100vw] max-h-[100dvh] overflow-auto pointer-events-none">
      <div className="ml-auto w-[400px] max-w-[100vw]">
        <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative pointer-events-auto">
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
            isSortable={isSortable}
            clearFilters={clearFilters}
            activeTotal={activeTotal}
          >
            {unverifiedFormer.length > 0 &&
              <ButtonText
                size="small"
                onClick={toggleShouldIgnoreFormer}
                isActive={shouldIgnoreFormer}
                isOnLight
              >
                <IconScriptBroken />
                <span>{t('heraldry.unit.ignoreFormerUnits')}</span>
              </ButtonText>
            }
          </FiltersPaneFilters>
          {verified.length > 0 && <ul className="mt-5">
            {verified.map(({ value, total }) => <li
              key={value}
              className="block pl-4"
            >
              <FiltersPaneFilter
                type={clickType}
                isSelected={filters.includes(value)}
                onChange={() => handleToggle(value)}
                label={t(`heraldry.unit.type.${country}.${value}`)}
                total={total}
              />
            </li>)}
          </ul>}
          {verified.length > 0 && (unverified.length > 0 || unverifiedFormer.length > 0) && <div>
            <p className="mt-5 px-4 text-[12px] text-white">
              {t('heraldry.unit.type.unreliableData')}
            </p>
          </div>}
          {unverified.length > 0 && <>
            {!hasOnlyOneList && <h4 className="mt-5 flex gap-2 items-center text-[12px]">
              <IconBuilding className="size-4 text-white" />
              {t('heraldry.unit.type.currentlyExisting')}
            </h4>}
            <ul>
              {unverified.map(({ value, total }) => <li
                key={value}
                className="block pl-4"
              >
                <FiltersPaneFilter
                  type={clickType}
                  isSelected={filters.includes(value)}
                  onChange={() => handleToggle(value)}
                  label={t(`heraldry.unit.type.${country}.${value}`)}
                  total={total}
                />
              </li>)}
            </ul>
          </>}

          {unverifiedFormer.length > 0 && <>
            {!hasOnlyOneList && <h4 className="mt-5 flex gap-2 items-center text-[12px]">
              <IconScriptBroken className="size-4 text-white" />
              {t('heraldry.unit.type.formerUnits')}
            </h4>}
            <ul>
              {unverifiedFormer.map(({ value, total }) => <li
                key={value}
                className="block pl-4"
              >
                <FiltersPaneFilter
                  type={clickType}
                  isSelected={filters.includes(value)}
                  isDisabled={shouldIgnoreFormer && value.startsWith('former')}
                  onChange={() => handleToggle(value)}
                  // label={t(`heraldry.unit.type.${lang}.${lowercaseFirstLetter(value.replace('former', ''))}`)}
                  label={t(`heraldry.unit.type.${country}.${value}`)}
                  total={total}
                  >            
                  <IconScriptBroken className="size-3 flex-shrink-0" />
                </FiltersPaneFilter>
              </li>)}
            </ul>
          </>}
        </div>
        <Space side="right" isLast isLarge className="bg-ui-dark mb-5" />
      </div>
    </div>
  );
}

export default memo(FiltersPaneSidebarTypes);
