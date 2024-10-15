import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconBuilding from '@/components/Icons/IconBuilding';
import IconCheck from '@/components/Icons/IconCheck';
import IconEraser from '@/components/Icons/IconEraser';
import IconScriptBroken from '@/components/Icons/IconScriptBroken';

import Pane from '@/components/UI/Pane';
import Button from '@/components/UI/Button';
import ButtonCircle from '@/components/UI/ButtonCircle';

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

const FiltersPaneTypesFilter = ({
  lang,
  typeFilters,
  setTypeFilters,
  toggleType,
  typeFiltersList,
  shouldIgnoreFormer,
  setShouldIgnoreFormer,
}: Props) => {
  const hasFormerTypes = typeFiltersList.some(({ value }) => value.startsWith('former'));

  const { t } = useTranslation();

  return (
      <Pane className="ui-slide-from-top fixed top-0 right-full z-50 w-[400px] mr-3">
      <h3 className="flex gap-3 items-center">
        <IconBuilding className="size-5" />
        <span>
          {t('heraldry.unit.filterTitle')}
        </span>
        <ButtonCircle
          wrapperClassName="ml-auto"
          onClick={() => setTypeFilters([])}
          isDisabled={typeFilters.length === 0}
        >
          <IconEraser />
          {typeFilters.length > 0 && <span className="ui-button-circle-marker">{typeFilters.length}</span>}
        </ButtonCircle>
      </h3>
      {typeFiltersList.length > 0 && <div className="grid grid-cols-1 gap-1 sans">
        {typeFiltersList.map(({ value, total }) => 
          <button
            onClick={() => toggleType(value)}
            className={clsx('font-[500] text-[14px] text-left hover:text-[#d2543a]', { 
              'font-[600] text-[#d2543a]': typeFilters.includes(value),
            })}
          >
            {typeFilters.includes(value) && <IconCheck className="inline size-3 fill-current" />}
            {' '}
            {t(`heraldry.unit.type.${lang}.${value}`)}
            {' '}
            {value.startsWith('former') && <IconScriptBroken className="inline-block size-4" />}
            {' '}
            {total > 0 && <small className="text-[10px] text-[#b2afaf] tracking-widest font-[400]">{' '}({total})</small>}
          </button>
        )}
      </div>}
      {hasFormerTypes && <div className="flex justify-end mt-2">
          <Button
            onClick={() => setShouldIgnoreFormer(!shouldIgnoreFormer)}
            isActive={shouldIgnoreFormer}
          >
            <span>{t('heraldry.unit.ignoreFormerUnits')}</span>
            <IconScriptBroken />
          </Button>
        </div>}
    </Pane>
  );
}

export default memo(FiltersPaneTypesFilter);
