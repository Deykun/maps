import clsx from 'clsx';

import './Panel.scss';

type Props = {
  className?: string,
  children: React.ReactNode,
}

const Pane = ({ className, children }: Props) => {
  return (
    <div
      className={clsx('ui-panel pointer-events-auto', {
        [className || '']: className,
      })}
    >
      {children}
    </div>
  );
}

export default Pane;