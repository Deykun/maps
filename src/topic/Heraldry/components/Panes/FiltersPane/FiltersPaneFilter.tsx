import clsx from 'clsx';

import { formatLargeNumber } from '@/utils/math';

import IconInputCheckEmpty from '@/components/Icons/IconInputCheckEmpty';
import IconInputCheckFull from '@/components/Icons/IconInputCheckFull';
import IconInputRadioEmpty from '@/components/Icons/IconInputRadioEmpty';
import IconInputRadioFull from '@/components/Icons/IconInputRadioFull';

type Props = {
  isSelected: boolean,
  isDisabled?: boolean,
  type: 'checkbox' | 'radio',
  label: string,
  total: number,
  onChange: (value: boolean) => void,
  children?: React.ReactNode,
};

const FiltersPaneFilter = ({
  isSelected,
  isDisabled = false,
  type,
  label,
  total,
  onChange,
  children
}: Props) => {
  const IconSelected = type === 'checkbox' ? IconInputCheckFull : IconInputRadioFull;
  const IconUnselected = type === 'checkbox' ? IconInputCheckEmpty : IconInputRadioEmpty;

  return (
    <button
      className={clsx('flex gap-2 items-center max-w-full group', {
        'opacity-20': isDisabled && !isSelected,
        'opacity-50': isDisabled && isSelected,
      })}
      onClick={() => onChange(!isSelected)}
      disabled={isDisabled && !isSelected}
    >
      {isSelected
        ? <IconSelected className="flex-shrink-0 size-3 text-marker group-hover:text-white duration-300" />
        : <IconUnselected className="flex-shrink-0 size-3 text-ui-contrast group-hover:text-white duration-300" />
      }
      <span className={clsx('text-left overflow-hidden truncate', { 'text-white': isSelected })}>
        {label}
      </span>
      {total > 0 && <small className="flex-shrink-0 opacity-50">{' '}({formatLargeNumber(total)})</small>}
      {children}
    </button>
  );
}

export default FiltersPaneFilter;
