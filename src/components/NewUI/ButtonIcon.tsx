import clsx from 'clsx';
import { cn } from '@/utils/tailwind';

import './ButtonIcon.scss';

type Props = {
  id?: string,
  size?: 'small' | 'large' | 'normal',
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
  labelPosition?: 'left' | 'right' | 'bottom' | 'top',
  tagName?: 'span',
}

const ButtonIcon = ({
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
    <span className={cn('relative ui-button-icon', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button-icon--active': isActive,
      [`ui-button-icon--${size}`]: size,
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
          className={clsx('ui-button-icon-label', {
            [`ui-button-icon-label--${labelPosition}`]: labelPosition,
          })}
        >
          {label}
        </span>}
      </TagName>
    </span>
  );
}

export default ButtonIcon;
