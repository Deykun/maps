import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import HeraldrySubtitle from '@/topic/Heraldry/components/HeraldryTitle/HeraldrySubtitle';

import Space from '@/components/UI/Space';
import Panel from '@/components/UI/Panel';

import { SubtitlePart } from '@/topic/Heraldry/utils/getFilteredUnits';
import useFiltersStore from '@/topic/Heraldry/stores/filtersStore';
import useZoomStore from '@/topic/Heraldry/stores/zoomStore';

export type Props = {
  country: string,
  subtitleParts: SubtitlePart[],
}

const HeraldryTitle = ({
  country,
  subtitleParts,
}: Props) => {
  const zoomLevel = useZoomStore(state => state.zoomLevel);
  const shouldReverseFilters = useFiltersStore(state => state.shouldReverseFilters);

  const { t } = useTranslation();

  if (zoomLevel > 1) {
    if (subtitleParts.length === 0) {
      return null;
    }

    return (
      <div className="ui-slide-from-top fixed top-0 left-0 z-[10] md:left-12 top max-w-[calc(100vw_-_55px)] md:max-w-[calc(100vw_-_95px)] flex pointer-events-none">
        <Space side="top" isFirst />
        <Panel className="ui-panel--rounded-b flex-row min-h-[48px] items-center px-4">
          <HeraldrySubtitle
            className="text-ui-dark-contrast [&_strong]:text-white"
            zoomLevel={zoomLevel}
            subtitleParts={subtitleParts}
            shouldReverseFilters={shouldReverseFilters}
          />
        </Panel>
        <Space side="top" isLast />
      </div>
    )
  }

  return (
    <header className="md:mb-10 min-h-[100px] max-w-[calc(100vw_-_120px)] lg:max-w-[800px] flex-shrink-0 mx-auto">
      <h1 className="heading text-[24px] md:text-[28px] lg:text-[36px] text-center text-ui-dark">
        {t(`heraldry.${country}.mapTitle`)}
      </h1>
      <HeraldrySubtitle zoomLevel={zoomLevel} subtitleParts={subtitleParts} shouldReverseFilters={shouldReverseFilters} />
    </header>
  );
};

export default memo(HeraldryTitle);
