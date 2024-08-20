import clsx from 'clsx';

import './ButtonCircle.scss';

type Props = {
  className?: string,
  wrapperClassName?: string,
  children: React.ReactNode,
  onClick?: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
  title?: string,
}

const ButtonCircle = ({ className, wrapperClassName, children, onClick, isDisabled = false, isActive = false, title }: Props) => {
  return (
    <span className={clsx('relative ui-button-circle', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button-circle--active': isActive,
    })}>
      <button onClick={onClick} disabled={isDisabled} className={className} title={title}>
        {children}
      </button>
    </span>
  );
}

export default ButtonCircle;
