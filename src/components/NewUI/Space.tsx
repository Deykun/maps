import clsx from 'clsx';

import './Space.scss';

type Props = {
  side: 'left' | 'right'
  className?: string,
  isLast?: boolean,
  isLarge?: boolean,
}

const Space = ({ side, className, isLast = false, isLarge = false }: Props) => {
  return (
    <>
      <div
        className={clsx(`ui-space ui-space--top-${side} first:hidden`, {
          [className || '']: className,
          'ui-space--is-last': isLast,
          'ui-space--is-large': isLarge,
        })}
      />
      <div
        className={clsx(`ui-space ui-space--bottom-${side} last:hidden`, {
          [className || '']: className,
        })}
      />
    </>
  );
}

export default Space;
