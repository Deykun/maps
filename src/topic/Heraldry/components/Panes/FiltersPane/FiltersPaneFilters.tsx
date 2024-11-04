import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import IconEraser from '@/components/Icons/IconEraser';
import IconSortByName from '@/components/Icons/IconSortByName';
import IconSortByValue from '@/components/Icons/IconSortByValue';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';
import IconInputRadioFull from '@/components/Icons/IconInputRadioFull';

import Panel from '@/components/UI/Panel';

import ButtonIcon from '@/components/UI/ButtonIcon';
import ButtonText from '@/components/UI/ButtonText';

type Props = {
  clickType: 'checkbox' | 'radio',
  setClickType: (v: 'checkbox' | 'radio') => void,
  sortBy: 'name' | 'value',
  setSortBy: (v: 'name' | 'value') => void,
  isSortable: boolean,
  clearFilters: () => void,
  activeTotal: number,
  children?: React.ReactNode,
};

const FiltersPaneFilters = ({
  clickType,
  setClickType,
  sortBy,
  setSortBy,
  isSortable,
  clearFilters,
  activeTotal,
  children,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Panel className="ui-panel--rounded-l ui-panel--rounded-r">
      <div className="flex gap-1 items-center">
        <ButtonText
          size="small"
          onClick={() => setClickType(clickType === 'checkbox' ? 'radio' : 'checkbox')}
        >
          {clickType === 'checkbox' ? <IconInputCheckFull /> : <IconInputRadioFull />}
          <span>
            {t(clickType === 'checkbox' ? 'heraldry.filterOperator.many': 'heraldry.filterOperator.one')}
          </span>
        </ButtonText>
        {children}
        <ButtonIcon          
          wrapperClassName="ml-auto"
          size="small"
          onClick={() => setSortBy(sortBy === 'value' ? 'name' : 'value')}
          isDisabled={!isSortable}
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
  );
}

export default memo(FiltersPaneFilters);
