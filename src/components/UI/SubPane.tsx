import clsx from 'clsx';

import './Pane.scss';

type Props = {
  order?: number,
  className?: string,
  children: React.ReactNode,
}

const SubPane = ({ order = 0, className, children }: Props) => {
  const top = order * (32 + 8);

  return (
    <div
      className={clsx('ui-pane pointer-events-auto', {
        [className || '']: className,
      })}
      style={{ top }}
    >
      {children}
    </div>
  );
}

export default SubPane;
