import clsx from 'clsx';

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
};

const FiltersPaneFilter = ({
  isSelected,
  isDisabled = false,
  type,
  label,
  total,
  onChange,
}: Props) => {
  const IconSelected = type === 'checkbox' ? IconInputCheckFull : IconInputRadioFull;
  const IconUnselected = type === 'checkbox' ? IconInputCheckEmpty : IconInputRadioEmpty;

  return (
    <button
      className={clsx('flex gap-2 items-center max-w-full', {
        'opacity-20': isDisabled && !isSelected,
        'opacity-50': isDisabled && isSelected,
      })}
      onClick={() => onChange(!isSelected)}
      disabled={isDisabled && !isSelected}
    >
      {isSelected ? <IconSelected className="flex-shrink-0 size-3 text-marker" /> : <IconUnselected className="flex-shrink-0 size-3 text-ui-contrast" />}
      <span className={clsx('text-left overflow-hidden truncate', { 'text-white': isSelected })}>
        {label}
      </span>
      {total > 0 && <small className="flex-shrink-0 opacity-50">{' '}({total})</small>}
    </button>
  );
}

export default FiltersPaneFilter;
