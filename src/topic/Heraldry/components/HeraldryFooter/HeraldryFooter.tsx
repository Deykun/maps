import { memo, useRef, useState, useMemo, useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';
// import { useDraggable } from "react-use-draggable-scroll";

// import { isLanguageSupported } from '@/utils/lang';

// import {
//   useFiltersDevelopmentStore,
// } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

// import { MapsSearchParams, getSearchParamFromFilters } from '@/topic/Heraldry/utils/getSearchParams'
// import { CoatOfArmsMapData, MapOffset, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

// import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
// import { getFilteredUnits } from '@/topic/Heraldry/utils/getFilteredUnits';

// import DevelopmentPane from '@/topic/Heraldry/components/Panes/DevelopmentPane';
// import NavigationPane from '@/topic/Heraldry/components/Panes/NavigationPane';
// import ZoomPane from '@/topic/Heraldry/components/Panes/ZoomPane';
// import UnitsPane from '@/topic/Heraldry/components/Panes/UnitsPane';
// import FiltersPane from '@/topic/Heraldry/components/Panes/FiltersPane';

// import HeraldryTitle from '@/topic/Heraldry/components/HeraldryTitle/HeraldryTitle';
// import HeraldryMapHTMLCanvas from '@/topic/Heraldry/components/HeraldryMapHTMLCanvas/HeraldryMapHTMLCanvas';

import Space from '@/components/NewUI/Space';
import Panel from '@/components/NewUI/Panel';


export type Props = {
  zoomLevel: number,
  totalVisibleUnits: number,
  totalUnits: number,
}

const HeraldryFooter = ({
  zoomLevel,
  totalVisibleUnits,
  totalUnits,
}: Props) => {
  const { t } = useTranslation();

  console.log({
    totalVisibleUnits,
    totalUnits,
  })

  if (zoomLevel > 1) {
    return (
      <div className="ui-slide-from-bottom fixed bottom-0 right-0 z-[10] flex items-end pointer-events-none">
        <Space side="bottom" className="bg-ui-dark" isFirst />
        <Panel className="ui-panel--rounded-t flex-row min-h-[24px] items-center px-4 text-[12px] text-ui-dark-contrast [&_strong]:text-white bg-ui-dark">
          <p>
            {t('heraldry.mapFooterAllCoats')} <strong>{totalUnits}</strong>
            {totalUnits > totalVisibleUnits && <>{t('heraldry.mapFooterCoatsAfterFilter')}
            {' '}
            <strong>{totalVisibleUnits}</strong>
            {totalVisibleUnits > 10 && <>{' '}- <strong>
              {(100 * (totalVisibleUnits / totalUnits)).toFixed(2)}
            </strong><small>%</small></>}</>}.            
          </p>
        </Panel>
        <Space side="bottom" className="bg-ui-dark" isLast />
      </div>
    );
  }

  return (
    <div className={clsx('heraldry-map-footer', {
      'text-center mt-10 text-[14px] text-[#4b4b4b] tracking-wide': zoomLevel === 1,
    })}>
      <p>
        {zoomLevel === 1 && <>{t('heraldry.mapFooterSource')} <strong className="text-ui-dark">wikipedia.org</strong>.<br /></>}
        {' '}
        {t('heraldry.mapFooterAllCoats')} <strong className="text-ui-dark">{totalUnits}</strong>
        {totalUnits > totalVisibleUnits && <>{t('heraldry.mapFooterCoatsAfterFilter')}
        {' '}
        <strong className={clsx({
          'text-[#ca1a1a]': totalVisibleUnits === 0 })
        }>{totalVisibleUnits}</strong>
        {totalVisibleUnits > 10 && <>{' '}- <strong className="text-ui-dark">
          {(100 * (totalVisibleUnits / totalUnits)).toFixed(2)}
        </strong><small>%</small></>}</>}.
      </p>
    </div>
  );
};

export default memo(HeraldryFooter);
