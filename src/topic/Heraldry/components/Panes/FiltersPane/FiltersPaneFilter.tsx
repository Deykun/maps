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
      className={clsx('inline-flex gap-2 items-center', {
        'opacity-20': isDisabled && !isSelected,
        'opacity-50': isDisabled && isSelected,
      })}
      onClick={() => onChange(!isSelected)}
      disabled={isDisabled && !isSelected}
    >
      {isSelected ? <IconSelected className="size-3 text-marker" /> : <IconUnselected className="size-3 text-ui-contrast" />}
      <span className={clsx('text-left', { 'text-white': isSelected })}>
        {label}
        {total > 0 && <small className="opacity-50">{' '}({total})</small>}
      </span>
    </button>
  );
}

export default FiltersPaneFilter;
