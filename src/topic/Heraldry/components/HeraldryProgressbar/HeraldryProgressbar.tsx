import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import IconLoaderWithProgress from '@/components/Icons/IconLoaderWithProgress';

import Space from '@/components/UI/Space';
import Panel from '@/components/UI/Panel';
import useProgressbarData from './useProgressbarData';

const HeraldryProgressbar = () => {
  const { t } = useTranslation();

  const {
    progresses,
  } = useProgressbarData('loading');

  if (progresses.length === 0) {
    return null;
  }

  const { value: firstValue = 0, total: fitstTotal = 0 } = progresses[0] || {};
  const { value: secondValue = 0, total: secondTotal = 0 } = progresses[1] || {};

  return (
    <div className="ui-slide-from-bottom fixed bottom-0 left-0 z-[10] flex items-end pointer-events-none">
      <Panel className="ui-panel--rounded-tr bg-ui-dark min-h-[34px] py-0 justify-center relative ui-tooltip-wrapper ui-tooltip-wrapper--active">
        <span className="size-5 relative">
          {fitstTotal > 0 &&
            <IconLoaderWithProgress
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5"
              lineClassName="stroke-marker"
              progress={(firstValue / fitstTotal)}
            />
          }
          {secondTotal > 0 &&
            <IconLoaderWithProgress
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 size-5"
              lineClassName="stroke-ui-contrast"
              progress={(secondValue / secondTotal)}
              strokeWidth={6}
            />
          }
        </span>
        <span className="ui-tooltip ui-tooltip--topRight !left-[6px] empty:hidden flex flex-col gap-1 !py-2">
          {progresses.map(({ label, value, total }) => <span key={label} className="flex items-center gap-2">
            <strong className="text-white min-w-[42px] text-right">
              {(100 * value / total).toFixed(1)}
              <small>%</small>
            </strong>
            <small>
              {t(`heraldry.loading.status.${label}`)}...
            </small>
          </span>)}
        </span>
      </Panel>
      <Space side="bottom" className="bg-ui-dark" isLast />
    </div>
  );
};

export default memo(HeraldryProgressbar);
