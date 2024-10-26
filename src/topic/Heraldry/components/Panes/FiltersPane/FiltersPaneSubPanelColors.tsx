import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { capitalize } from '@/utils/text';

import IconColor from '@/components/Icons/IconColor';

import SubPanel from '@/components/UI/SubPanel';

import ButtonIcon from '@/components/UI/ButtonIcon';

import { colorsMarkersByNames } from '@/topic/Heraldry/constants';

import useFiltersStore, { toggleColor } from '@/topic/Heraldry/stores/filtersStore';

type Props = {
  className?: string,
  order: number,
};

const FiltersPaneSubPanelColors = ({
  className,
  order,
}: Props) => {
  const colorFilters = useFiltersStore(state => state.color);

  const { t } = useTranslation();

  return (
    <SubPanel order={order} className={clsx('ui-slide-from-right-sidebar no-scrollbar flex-row', {
      [className || '']: className,
    })}>
      {Object.keys(colorsMarkersByNames).map((name) => <ButtonIcon
        key={name}
        wrapperClassName="relative bg-white rounded-[8px]"
        className="hover:!bg-transparent"
        onClick={() => toggleColor(name)}
        label={capitalize(t(`heraldry.color.${name}`))}
        labelPosition="bottomLeft"
      >
        <IconColor
          className={clsx('duration-300 drop-shadow-lg', {
            'opacity-30': !colorFilters.includes(name),
          })}
          style={{
            fill: colorsMarkersByNames[name],
          }}
        />
        {colorFilters.includes(name) && <span className="ui-button-icon-marker-dot" />}
        </ButtonIcon>)}
    </SubPanel>
  );
}

export default memo(FiltersPaneSubPanelColors);
