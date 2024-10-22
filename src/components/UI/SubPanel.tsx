import clsx from 'clsx';

import './Panel.scss';

type Props = {
  order?: number,
  className?: string,
  children: React.ReactNode,
}

// We skip it because the SubPanel also has it
// const topPaddingHeight = 8;
const buttonHeight = 32;
const spacingHeight = 4;

const SubPanel = ({ order = 0, className, children }: Props) => {
  const top = order * (buttonHeight + spacingHeight);

  return (
    <div
      className={clsx(
        'ui-panel pointer-events-auto', 
        ' ui-panel--rounded-l ui-panel--rounded-r', {
          [className || '']: className,
        },
      )}
      style={{ top }}
    >
      {children}
    </div>
  );
}

export default SubPanel;
