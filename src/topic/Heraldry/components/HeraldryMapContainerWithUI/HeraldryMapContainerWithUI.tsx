import { memo, useRef, useState, useMemo, useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDraggable } from "react-use-draggable-scroll";

import { isLanguageSupported } from '@/utils/lang';

import { LOCAL_STORAGE } from '@/constants';

import { useFiltersDevelopmentStore } from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { MapsSearchParams } from '@/topic/Heraldry/utils/getSearchParams'
import { CoatOfArmsMapData, MapOffset, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import useGetFilteredUnits from '@/topic/Heraldry/hooks/useGetFilteredUnits';

import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';

import DevelopmentPane from '@/topic/Heraldry/components/Panes/DevelopmentPane';
import NavigationPane from '@/topic/Heraldry/components/Panes/NavigationPane';
import ZoomPane from '@/topic/Heraldry/components/Panes/ZoomPane';
import UnitsPane from '@/topic/Heraldry/components/Panes/UnitsPane';
import FiltersPane from '@/topic/Heraldry/components/Panes/FiltersPane';

import HeraldryTitle from '@/topic/Heraldry/components/HeraldryTitle/HeraldryTitle';
import HeraldryFooter from '@/topic/Heraldry/components/HeraldryFooter/HeraldryFooter';
import HeraldryProgressbar from '@/topic/Heraldry/components/HeraldryProgressbar/HeraldryProgressbar';

import HeraldryMapHTMLCanvas from '@/topic/Heraldry/components/HeraldryMapHTMLCanvas/HeraldryMapHTMLCanvas';

import Space from '@/components/UI/Space';

import './HeraldryMapContainerWithUI.scss';

export type Props = {
  lang: string,
  unitsForMapAll: CoatOfArmsMapData[],
  detailsForUnitsById: {
    [id: string]: CoatOfArmsDetailsData,
  },
  typeFiltersList: GetFilterResponse,
  animalFiltersList: GetFilterResponse,
  itemFiltersList: GetFilterResponse,
  colorFiltersList: GetFilterResponse,
  mapWrapperClassName?: string,
  mapWrapperClassNameForZoom0?: string,
  map: React.LazyExoticComponent<() => JSX.Element>,
  initialFilters?: Partial<MapsSearchParams>
  mapOffset: MapOffset,
  developmentModeFiltersTypes?: string[],
  setShouldFetchDetails: (value: boolean) => void,
  isFetchingDetails?: boolean,
}

const HeraldryMapContainerWithUI = ({
  lang,
  unitsForMapAll,
  detailsForUnitsById,
  typeFiltersList,
  animalFiltersList,
  itemFiltersList,
  colorFiltersList,
  mapWrapperClassName,
  mapWrapperClassNameForZoom0,
  map: MapBackground,
  initialFilters = {},
  mapOffset,
  developmentModeFiltersTypes,
  setShouldFetchDetails,
  isFetchingDetails = false,
}: Props) => {
    const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const [shouldHintLang, setShouldHintLang] = useState(false);
    const [filterOperator, setFilterOperator] = useState<'and' | 'or'>(initialFilters.filterOperator || 'and');
    const [shouldReverseFilters, setShouldReverseFilters] = useState(initialFilters.shouldReverseFilters || false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [coatSize, setCoatSize] = useState(4);
    const customFilter = useFiltersDevelopmentStore(state => state.filter);
    const [typeFilters, setTypeFilters] = useState<string[]>(initialFilters.typeFilters || []);
    const [animalFilters, setAnimalFilters] = useState<string[]>(initialFilters.animalFilters || []);
    const [itemFilters, setItemFilters] = useState<string[]>(initialFilters.itemFilters || []);
    const [shouldIgnoreFormer, setShouldIgnoreFormer] = useState(initialFilters.shouldIgnoreFormer || false);

    const { events } = useDraggable(wrapperRef, { decayRate: 0.015 });

    const { i18n } = useTranslation();

    useEffect(() => {
      const hasInitialFilters = Object.values(initialFilters).filter(Boolean).length > 0;
      if (hasInitialFilters) {
        setShouldFetchDetails(true);
      }
    }, [initialFilters]);

    useEffect(() => {
      const userHasLangugeSet = Boolean(localStorage.getItem(LOCAL_STORAGE.MAPS_USER_LANG))
      if (!userHasLangugeSet) {
        i18n.changeLanguage(lang);

        if (!isLanguageSupported(lang)) {
          setShouldHintLang(true);
        }
      }
    }, [i18n]);

    const { units, unitsForMap, subtitleParts } = useGetFilteredUnits({
      lang,
      unitsForMapAll,
      detailsForUnitsById,
      filterOperator,
      shouldReverseFilters,
      shouldIgnoreFormer,
      customFilter,
      typeFilters,
      animalFilters,
      itemFilters,
      typeFiltersList,
    });

    return (
        <>
          <section
            id="map-section"
            ref={wrapperRef}
            className={clsx(
              "map-section fixed top-0 left-0 w-full h-full",
              "p-5 pt-[100px]",
              "no-scrollbar overflow-auto", {
                // "flex flex-col justify-evenly": zoomLevel === 1,
                "pb-[100px]": zoomLevel > 1,
              }
            )}
            {...events}
          >
            <HeraldryTitle
              country={lang}
              zoomLevel={zoomLevel}
              subtitleParts={subtitleParts}
              shouldReverseFilters={shouldReverseFilters}
            />
            <div>
              <div
                className={clsx(mapWrapperClassName, "map-wrapper z-1 relative mx-auto", {
                  [`${mapWrapperClassNameForZoom0 || ''} mx-auto`]: zoomLevel === 1,
                })}
                style={zoomLevel === 1 ? { } : { width: `max(${(zoomLevel - 1) * 500}px, ${(zoomLevel - 1) * 80}vw` }}
              >
                <HeraldryMapHTMLCanvas
                  units={unitsForMap}
                  mapOffset={mapOffset}
                  coatSize={Math.round(((coatSize + 1) / 11) * 80)}
                >
                  <Suspense fallback={<svg />}>
                    <MapBackground />
                  </Suspense>
                </HeraldryMapHTMLCanvas>
              </div>
            </div>
            <HeraldryFooter
              zoomLevel={zoomLevel}
              totalUnits={unitsForMapAll.length}
              totalVisibleUnits={unitsForMap.length}
            />
          </section>
          <div className={clsx('ui-slide-from-left fixed top-0 left-0 z-20 flex flex-col pointer-events-none', {
            'hidden md:flex': zoomLevel > 1 && subtitleParts.length !== 0,
          })}>
            <Space side="left" />
            <NavigationPane
              shouldHintLang={shouldHintLang}
              setShouldHintLang={setShouldHintLang}
            />
            <DevelopmentPane
              country={lang}
              unitTypes={developmentModeFiltersTypes || typeFiltersList.map(({ value }) => value)}
            />
          </div>
          <div className="ui-slide-from-right fixed top-0 right-0 z-20 flex flex-col pointer-events-none">          
            <Space side="right" />
            <ZoomPane
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              zoomMin={1}
              zoomMax={9}
              coatSize={coatSize}
              setCoatSize={setCoatSize}
              coatMin={-1}
              coatMax={11}
            />
            <Space side="right" />
            <UnitsPane
              units={units}
              setShouldFetchDetails={setShouldFetchDetails}
            />
            <Space side="right" />
            <FiltersPane      
              lang={lang}
              totalVisibleUnits={unitsForMap.length}
              typeFilters={typeFilters}
              setTypeFilters={setTypeFilters}
              typeFiltersList={typeFiltersList}
              shouldIgnoreFormer={shouldIgnoreFormer}
              setShouldIgnoreFormer={setShouldIgnoreFormer}
              colorFiltersList={colorFiltersList}
              animalFilters={animalFilters}
              setAnimalFilters={setAnimalFilters}
              animalFiltersList={animalFiltersList}
              itemFilters={itemFilters}
              setItemFilters={setItemFilters}
              itemFiltersList={itemFiltersList}
              filterOperator={filterOperator}
              setFilterOperator={setFilterOperator}
              shouldReverseFilters={shouldReverseFilters}
              setShouldReverseFilters={setShouldReverseFilters}
              setShouldFetchDetails={setShouldFetchDetails}
              isFetchingDetails={isFetchingDetails}
            />
            <Space side="right" isLast />
          </div>
          <HeraldryProgressbar />
        </>
    );
};

export default memo(HeraldryMapContainerWithUI);
