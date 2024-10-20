import clsx from 'clsx';

import './Space.scss';

type Props = {
  className?: string,
  isLast?: boolean,
  isLarge?: boolean,
}

const Space = ({ className, isLast = false, isLarge = false }: Props) => {
  return (
    <>
      <div
        className={clsx('ui-space ui-space--top-right first:hidden', {
          [className || '']: className,
          'ui-space--is-last': isLast,
          'ui-space--is-large': isLarge,
        })}
      />
      <div
        className={clsx('ui-space ui-space--bottom-right last:hidden', {
          [className || '']: className,
        })}
      />
    </>
  );
}

export default Space;
