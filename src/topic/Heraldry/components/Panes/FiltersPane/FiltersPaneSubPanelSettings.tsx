import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconFlask from '@/components/Icons/IconFlask';
import IconCubeAnd from '@/components/Icons/IconCubeAnd';
import IconCubeOr from '@/components/Icons/IconCubeOr';
import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';
import IconShieldCrossed from '@/components/Icons/IconShieldCrossed';

import SubPanel from '@/components/UI/SubPanel';

import ButtonIcon from '@/components/UI/ButtonIcon';

import useFiltersStore, { toggleFilterOperator, toggleShouldReverseFilters, toggleShouldHideMissingImages } from '@/topic/Heraldry/stores/filtersStore';
import {
  useFiltersDevelopmentStore,
  toggleFilterDevlopmentMode,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

type Props = {
  className?: string,
  order: number,
  brokenHashes: string[],
  shouldAddWarningForRevesedFilters?: boolean,
};

const FiltersPaneSubPanelColors = ({
  className,
  order,
  brokenHashes,
  shouldAddWarningForRevesedFilters = false,
}: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterOperator = useFiltersStore(state => state.filterOperator);
  const shouldReverseFilters = useFiltersStore(state => state.shouldReverseFilters);
  const shouldHideMissingImages = useFiltersStore(state => state.shouldHideMissingImages);

  const { t } = useTranslation();

  return (
    <SubPanel order={order} className={clsx('ui-slide-from-right-sidebar no-scrollbar flex-row', {
      [className || '']: className,
    })}>
      <ButtonIcon
        onClick={toggleFilterOperator}
        label={`${t('heraldry.filterOperator')} ${t(`heraldry.filterOperator.${filterOperator}`)}`}
        labelPosition="bottomLeft"
      >
        {filterOperator === 'and' ? <IconCubeAnd /> : <IconCubeOr />}
      </ButtonIcon>
      <ButtonIcon
        onClick={toggleShouldReverseFilters}
        label={`${t('heraldry.filterReverse')} ${t(`heraldry.filterReverse.${shouldReverseFilters ? 'yes' : 'no'}`)}`}
        labelPosition="bottomLeft"
      >
        {shouldReverseFilters ? <IconEyeCrossed /> : <IconEye />}
        {shouldAddWarningForRevesedFilters && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
      </ButtonIcon>
      {brokenHashes.length > 0 && <ButtonIcon
        onClick={toggleShouldHideMissingImages}
        isActive={shouldHideMissingImages}
        label={t('heraldry.hideCoatOfArmsWithoutImages')}
        labelPosition="bottomLeft"
      >
        <IconShieldCrossed />
      </ButtonIcon>}
      <span className="border-l"></span>
      <ButtonIcon
        isActive={isFiltersDevModeActive}
        onClick={toggleFilterDevlopmentMode}
        label="Development mode"
        labelPosition="bottomLeft"
      >
        <IconFlask />
      </ButtonIcon>
    </SubPanel>
  );
}

export default memo(FiltersPaneSubPanelColors);
