import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconCheck from '@/components/Icons/IconCheck';
import IconLoaderWithProgress from '@/components/Icons/IconLoaderWithProgress';

import useProgressbarData from './useProgressbarData';

const HeraldryProgressStatusList = () => {
  const { t } = useTranslation();

  const {
    progresses,
  } = useProgressbarData('all');

  if (progresses.length === 0) {
    // return null;
  }

  const indexBeingFetched = progresses.findIndex(({ value, total }) => value < total);

  return (
    <ol className="flex flex-col gap-2 ml-[30px] min-w-[300px]">
      {progresses.filter(
        ({ label }) => ['fetchingTexts', 'processingTexts', 'fetchingImages', 'processingMap'].includes(label)
      ).map(({ label, value, total }, index) => {
        const isChecked = value === total && total > 0;
        const isCurrent = index === indexBeingFetched;

        return (<li key={label} className="flex w-full gap-3 justify-start items-center">
          <span className="w-10 text-[12px] text-ui-dark opacity-80">
            {isCurrent && total > 0 && <span>{(100 * value / total).toFixed(1)}%</span>}
          </span>
          <span className="w-5">
            {isChecked && 
              <IconCheck className="size-5 fill-marker" />
            }
            {isCurrent && 
              <IconLoaderWithProgress className="size-5" lineClassName="stroke-marker" progress={(value / total)} />
            }
          </span>
          <p className={clsx('heading', { 'font-[500]': isChecked })}>
            {t(`heraldry.loading.status.${label}`)}...
          </p>
        </li>)
      })}
    </ol>
  );
}

export default HeraldryProgressStatusList;
