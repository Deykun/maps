import clsx from 'clsx';

import './ButtonCircle.scss';

type Props = {
  id?: string,
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
}

const ButtonCircle = ({ id, className, wrapperClassName, children, onClick, href, target, isDisabled = false, isActive = false, title, label }: Props) => {
  const TagName = href ? 'a' : 'button';

  return (
    <span className={clsx('relative ui-button-circle', {
      [wrapperClassName || '']: wrapperClassName,
      'ui-button-circle--active': isActive,
    })}>
      <TagName id={id} onClick={onClick} disabled={isDisabled} className={className} title={title} href={href} target={target}>
        {children}
        {label && <span className="ui-button-circle-label">{label}</span>}
      </TagName>
    </span>
  );
}

export default ButtonCircle;
