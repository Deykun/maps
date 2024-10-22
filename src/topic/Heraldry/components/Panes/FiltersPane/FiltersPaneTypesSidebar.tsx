import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import IconBuilding from '@/components/Icons/IconBuilding';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';
import IconEraser from '@/components/Icons/IconEraser';
import IconSortByName from '@/components/Icons/IconSortByName';
import IconSortByValue from '@/components/Icons/IconSortByValue';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';
import IconInputRadioFull from '@/components/Icons/IconInputRadioFull';

import Panel from '@/components/NewUI/Panel';
import Space from '@/components/NewUI/Space';

import ButtonIcon from '@/components/NewUI/ButtonIcon';
import ButtonText from '@/components/NewUI/ButtonText';

import { getSorter } from './utils/sort'

import FiltersPaneFilter from './FiltersPaneFilter';

type FilterItem = {
  value: string,
  total: number,
}

type FilterSetter = (values: string[]) => void;

type Props = {
  lang: string,
  typeFilters: string[],
  setTypeFilters: FilterSetter,
  toggleType: (value: string) => void,
  typeFiltersList: FilterItem[],
  shouldIgnoreFormer: boolean,
  setShouldIgnoreFormer: (value: boolean) => void,
};

const FiltersPaneTypesSidebar = ({
  lang,
  typeFilters,
  setTypeFilters,
  toggleType,
  typeFiltersList,
  shouldIgnoreFormer,
  setShouldIgnoreFormer,
}: Props) => {
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [clickType, setClickType] = useState<'checkbox' | 'radio'>('checkbox');

  const { t } = useTranslation();

  useEffect(() => {
    if (clickType === 'radio' && typeFiltersList.length > 1) {    
      setTypeFilters([]);
    }
  }, [clickType, typeFiltersList.length])

  const clearFilters = () => {
    setTypeFilters([]);

    if (shouldIgnoreFormer) {
      setShouldIgnoreFormer(false);
    }
  }

  const handleToggle = (value: string) => {
    const isSelected = typeFilters.includes(value);
    if (isSelected || clickType === 'checkbox') {
      toggleType(value);

      return;
    }

    setTypeFilters([value]);
  }

  const hasFormerTypes = typeFiltersList.some(({ value }) => value.startsWith('former'));
  const activeTotal = typeFilters.length + (shouldIgnoreFormer ? 1 : 0);

  return (
    <div className="ui-slide-from-right-sidebar fixed top-0 right-0 z-[-1] w-[400px] max-w-[100vw] max-h-[100svh] overflow-auto">
      <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pr-[60px] rounded-bl-[18px] flex flex-col gap-[12px] relative">
        <h3 className="flex gap-3 items-center text-[14px]">
          <IconBuilding className="size-5" />
          <span>
            {t('heraldry.unit.filterTitle')}
          </span>
        </h3>
        <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
          <div className="flex gap-1">
            <ButtonText
              size="small"
              onClick={() => setClickType(clickType === 'checkbox' ? 'radio' : 'checkbox')}
            >
              {clickType === 'checkbox' ? <IconInputCheckFull /> : <IconInputRadioFull />}
              <span>
                {t(clickType === 'checkbox' ? 'heraldry.filterOperator.many': 'heraldry.filterOperator.single')}
              </span>
            </ButtonText>
            {hasFormerTypes &&
              <ButtonText
                size="small"
                onClick={() => setShouldIgnoreFormer(!shouldIgnoreFormer)}
                isActive={shouldIgnoreFormer}
              >
                <IconScriptBroken />
                <span>{t('heraldry.unit.ignoreFormerUnits')}</span>
              </ButtonText>
            }
            <ButtonIcon          
              wrapperClassName="ml-auto"
              size="small"
              onClick={() => setSortBy(sortBy === 'value' ? 'name' : 'value')}
            >
              {sortBy === 'value' ? <IconSortByValue /> : <IconSortByName />}
            </ButtonIcon>
            <span className="border-l--panel" />
            <ButtonIcon
              size="small"
              onClick={clearFilters}
              isDisabled={activeTotal === 0}
              label={t('heraldry.clearFilters')}
              labelPosition="bottomLeft"
            >
              <IconEraser />
            </ButtonIcon>
          </div>
        </Panel>
        {typeFiltersList.length > 0 && <ul className="">
          {typeFiltersList.sort(getSorter({ sortBy, tBase: `heraldry.unit.type.${lang}.`, t })).map(({ value, total }) => <li
            key={value}
            className="block"
          >
            <FiltersPaneFilter
              type={clickType}
              isSelected={typeFilters.includes(value)}
              isDisabled={shouldIgnoreFormer && value.startsWith('former')}
              onChange={() => handleToggle(value)}
              label={t(`heraldry.unit.type.${lang}.${value}`)}
              total={total}
            />
          </li>)}
        </ul>}
      </div>
      <Space side="right" isLast isLarge className="bg-ui-dark" />
    </div>
  );
}

export default memo(FiltersPaneTypesSidebar);
