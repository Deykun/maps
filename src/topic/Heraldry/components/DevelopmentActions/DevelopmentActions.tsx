import clsx from 'clsx';

import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import {
  toggleAsCustomFilterExclude,
  toggleAsCustomFilterInclude,
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  className?: string,
  unit: AdministrativeUnit,
  buttonSize?: 'small',
  labelPositions?: 'top',
}

const DevelopmentActions = ({ className, unit, buttonSize, labelPositions }: Props) => {
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);

  if (!isFiltersDevelopmentModeActive) {
    return null;
  }

  return (
    <div className={clsx(className, 'flex gap-2 pointer-events-none')}>
      <ButtonCircle
        size={buttonSize}
        className="pointer-events-auto"
        onClick={() => toggleAsCustomFilterExclude(unit.title)}
        isActive={filterExclude?.includes(unit.title)}
        label="Exclude"
        labelPosition={labelPositions}
      >
        <IconMarkerMinus />
      </ButtonCircle>
      <ButtonCircle
        size={buttonSize}
        className="pointer-events-auto"
        onClick={() => toggleAsCustomFilterInclude(unit.title)}
        isActive={filterInclude?.includes(unit.title)}
        label="Include"
        labelPosition={labelPositions ?? 'right'}
      >
        <IconMarkerPlus />
      </ButtonCircle>
    </div>
  );
};

export default DevelopmentActions;
