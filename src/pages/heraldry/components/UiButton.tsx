import clsx from 'clsx';

type Props = {
  children: React.ReactNode,
  onClick?: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
}

const UiButton = ({ children, onClick, isDisabled = false, isActive = false }: Props) => {
  return (
    <span className={clsx('relative heraldry-ui-button', {
      'heraldry-ui-button--active': isActive,
    })}>
      <button onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    </span>
  );
}

export default UiButton;
