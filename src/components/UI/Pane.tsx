import clsx from 'clsx';

import './Pane.scss';

type Props = {
  className?: string,
  children: React.ReactNode,
}

const Pane = ({ className, children }: Props) => {
  return (
    <div
      className={clsx('ui-pane pointer-events-auto', {
        [className || '']: className,
      })}
    >
      {children}
    </div>
  );
}

export default Pane;
