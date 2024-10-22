import clsx from 'clsx';

import './Space.scss';

type Props = {
  side: 'top' | 'left' | 'right'
  className?: string,
  isFirst?: boolean,
  isLast?: boolean,
  isLarge?: boolean,
}

const Space = ({ side, className, isFirst = false, isLast = false, isLarge = false }: Props) => {
  const [first, last] = ['left', 'right'].includes(side) ? ['top', 'bottom'] : ['left', 'right'];

  return (
    <>
      <div
        className={clsx(`ui-space ui-space--${first}-${side} first:hidden`, {
          [className || '']: className,
          'ui-space--is-fast': isFirst,
          'ui-space--is-last': isLast,
          'ui-space--is-large': isLarge,
        })}
      />
      <div
        className={clsx(`ui-space ui-space--${last}-${side} last:hidden`, {
          [className || '']: className,
        })}
      />
    </>
  );
}

export default Space;
