import { memo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import IconLoader from '@/components/Icons/IconLoader';
import IconLoaderWithProgress from '@/components/Icons/IconLoaderWithProgress';

import Space from '@/components/UI/Space';
import Panel from '@/components/UI/Panel';
import ButtonIcon from '@/components/UI/ButtonIcon';

import { useProgressStore } from '@/topic/Heraldry/stores/progressStore';

const HeraldryProgressbar = () => {
  const { t } = useTranslation();

  const fetchingTexts = useProgressStore(state => state.fetchingTexts);
  const fetchingImages = useProgressStore(state => state.fetchingImages);
  const fetchingFilters = useProgressStore(state => state.fetchingFilters);
  const processingMap = useProgressStore(state => state.processingMap);


  const fetchingSummary: [number, number, string][] = [
    [fetchingTexts.values.length, fetchingTexts.totals.length, 'text'],
    [fetchingImages.values.length, fetchingImages.totals.length, 'images'],
    [fetchingFilters.values.length, fetchingFilters.totals.length, 'filters'],
    [processingMap.value, processingMap.total, 'map'],
  ];

  const fetchingPriority: {
    label: string,
    value: number,
    total: number,
  }[] = fetchingSummary.filter(([value, total]) => value < total).map(([value, total, label]) => ({ label, value, total }));

  // if (fetchingPriority.length === 0) {
  //   return null;
  // }

  const { value = 1, total = 1 } = fetchingPriority[0] || {};

  return (
    <div className="ui-slide-from-bottom fixed bottom-0 left-0 z-[10] flex items-end pointer-events-none">
      <Panel className="ui-panel--rounded-tr bg-ui-dark min-h-[34px] py-0 justify-center relative ui-tooltip-wrapper ui-tooltip-wrapper--active">
        {/* <ButtonIcon tagName="span" isActive> */}
          {/* <IconLoader className="size-5 fill-white" /> */}
        {/* </ButtonIcon> */}

        <IconLoaderWithProgress className="size-5 fill-white" progress={(value / total)} />
        <span className="ui-tooltip ui-tooltip--topRight empty:hidden">
          {fetchingPriority.map(({ label, value, total }) => <span>{label} {(100 * value / total).toFixed(1)}% </span>)}
        </span>
      </Panel>
      <Space side="bottom" className="bg-ui-dark" isLast />
    </div>
  );

};

export default memo(HeraldryProgressbar);
