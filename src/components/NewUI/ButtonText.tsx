import clsx from 'clsx';

import './ButtonText.scss';

type Props = {
  className?: string,
  size?: 'small' | 'large' | 'normal',
  wrapperClassName?: string,
  children: React.ReactNode,
  onClick?: () => void,
  href?: string,
  target?: string,
  isDisabled?: boolean,
  isActive?: boolean,
  title?: string,
}

const ButtonText = ({ className, size, wrapperClassName, children, onClick, href, target, isDisabled = false, isActive = false, title }: Props) => {
  const TagName = href ? 'a' : 'button';

  return (
    <span className={clsx('relative ui-button-text', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button-text--active': isActive,
      [`ui-button-text--${size}`]: size,
    })}>
      <TagName onClick={onClick} disabled={isDisabled} className={className} title={title} href={href} target={target}>
        {children}
      </TagName>
    </span>
  );
}

export default ButtonText;
