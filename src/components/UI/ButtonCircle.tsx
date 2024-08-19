import clsx from 'clsx';

import './ButtonCircle.scss';

type Props = {
  className?: string,
  children: React.ReactNode,
  onClick?: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
}

const ButtonCircle = ({ className, children, onClick, isDisabled = false, isActive = false }: Props) => {
  return (
    <span className={clsx('relative ui-button-circle', {
      [className || '']: className,
      'ui-button-circle--active': isActive,
    })}>
      <button onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    </span>
  );
}

export default ButtonCircle;
