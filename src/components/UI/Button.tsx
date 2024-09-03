import clsx from 'clsx';

import './Button.scss';

type Props = {
  className?: string,
  wrapperClassName?: string,
  children: React.ReactNode,
  onClick?: () => void,
  href?: string,
  target?: string,
  isDisabled?: boolean,
  isActive?: boolean,
  title?: string,
}

const Button = ({ className, wrapperClassName, children, onClick, href, target, isDisabled = false, isActive = false, title }: Props) => {
  const TagName = href ? 'a' : 'button';

  return (
    <span className={clsx('relative ui-button', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button--active': isActive,
    })}>
      <TagName onClick={onClick} disabled={isDisabled} className={className} title={title} href={href} target={target}>
        {children}
      </TagName>
    </span>
  );
}

export default Button;
