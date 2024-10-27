import clsx from 'clsx';

import './Panel.scss';
import { CSSProperties } from 'react';

type Props = {
  className?: string,
  children: React.ReactNode,
  style?: CSSProperties,
}

const Panel = ({ className, children, style }: Props) => {
  return (
    <div
      className={clsx('ui-panel pointer-events-auto', {
        [className || '']: className,
      })}
      style={style}
    >
      {children}
    </div>
  );
}

export default Panel;
