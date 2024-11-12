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
        'flex-wrap w-max max-w-[192px] sm:w-none sm:max-w-none sm:flex-nowrap',
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
