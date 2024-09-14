import clsx from 'clsx';

import './ButtonCircle.scss';

type Props = {
  id?: string,
  size?: 'large' | 'normal',
  className?: string,
  wrapperClassName?: string,
  children: React.ReactNode,
  onClick?: () => void,
  href?: string,
  target?: string,
  isDisabled?: boolean,
  isActive?: boolean,
  title?: string,
  label?: string,
  labelPosition?: 'left' | 'right' | 'bottom',
  tagName?: 'span',
}

const ButtonCircle = ({
  id,
  className,
  wrapperClassName,
  children,
  onClick,
  href,
  target,
  isDisabled = false,
  isActive = false,
  title,
  label,
  labelPosition = 'left',
  size,
  tagName,
}: Props) => {
  const TagName = tagName ?? (href ? 'a' : 'button');

  return (
    <span className={clsx('relative ui-button-circle', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button-circle--active': isActive,
      [`ui-button-circle--${size}`]: size,
    })}>
      <TagName
        id={id}
        onClick={onClick}
        disabled={isDisabled}
        className={className}
        title={title}
        href={href}
        target={target}
      >
        {children}
        {label && <span
          className={clsx('ui-button-circle-label', {
            [`ui-button-circle-label--${labelPosition}`]: labelPosition,
          })}
        >
          {label}
        </span>}
      </TagName>
    </span>
  );
}

export default ButtonCircle;
