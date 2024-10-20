import clsx from 'clsx';

import './Space.scss';

type Props = {
  className?: string,
}

const Space = ({ className }: Props) => {
  return (
    <>
      <div
        className={clsx('ui-space ui-space--top-right first:hidden', {
          [className || '']: className,
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
