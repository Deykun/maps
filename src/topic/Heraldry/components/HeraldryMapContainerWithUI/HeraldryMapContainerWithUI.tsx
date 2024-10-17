import { memo, useRef, useState, useMemo, useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDraggable } from "react-use-draggable-scroll";

import { isLanguageSupported } from '@/utils/lang';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { MapsSearchParams, getSearchParamFromFilters } from '@/topic/Heraldry/utils/getSearchParams'
import { CoatOfArmsMapData, MapOffset, CoatOfArmsDetailsData } from '@/topic/Heraldry/types';

import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
import { getFilteredUnits } from '@/topic/Heraldry/utils/getFilteredUnits';

import DevelopmentPane from '@/topic/Heraldry/components/Panes/DevelopmentPane';
import NavigationPane from '@/topic/Heraldry/components/Panes/NavigationPane';
import ZoomPane from '@/topic/Heraldry/components/Panes/ZoomPane';
import UnitsPane from '@/topic/Heraldry/components/Panes/UnitsPane';
import FiltersPane from '@/topic/Heraldry/components/Panes/FiltersPane';

import HeraldrySubtitle from '@/topic/Heraldry/components/HeraldrySubtitle';
import HeraldryMapHTMLCanvas from '@/topic/Heraldry/components/HeraldryMapHTMLCanvas/HeraldryMapHTMLCanvas';

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
    const [listPhrase, setListPhrase] = useState('');
    const [filterOperator, setFilterOperator] = useState<'and' | 'or'>(initialFilters.filterOperator || 'and');
    const [shouldReverseFilters, setShouldReverseFilters] = useState(initialFilters.shouldReverseFilters || false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [coatSize, setCoatSize] = useState(4);
    const customFilter = useFiltersDevelopmentStore(state => state.filter);
    const [typeFilters, setTypeFilters] = useState<string[]>(initialFilters.typeFilters || []);
    const [colorFilters, setColorFilters] = useState<string[]>(initialFilters.colorFilters || []);
    const [animalFilters, setAnimalFilters] = useState<string[]>(initialFilters.animalFilters || []);
    const [itemFilters, setItemFilters] = useState<string[]>(initialFilters.itemFilters || []);
    const [shouldIgnoreFormer, setShouldIgnoreFormer] = useState(initialFilters.shouldIgnoreFormer || false);

    const { events } = useDraggable(wrapperRef, { decayRate: 0.015 });

    const { t, i18n } = useTranslation();

    useEffect(() => {
      const hasInitialFilters = Object.values(initialFilters).filter(Boolean).length > 0;
      if (hasInitialFilters) {
        setShouldFetchDetails(true);
      }
    }, [initialFilters]);

    useEffect(() => {
      if (isLanguageSupported(lang)) {
        i18n.changeLanguage(lang);
      } else {
        // i18n.changeLanguage('en');
      }
    }, []);

    const { units, unitsForMap, subtitleParts } = useMemo(() => {
      // All types are checked and we can skip setting subtitle and filtering
      const typeFiltersToPass = typeFilters.length === typeFiltersList.length ? [] : typeFilters;

      const {
        filteredUnits,
        unitsForMap,
        subtitleParts,
      } = getFilteredUnits({
        lang,
        unitsForMapAll,
        detailsForUnitsById,
        filterOperator,
        shouldReverseFilters,
        shouldIgnoreFormer,
        customFilter,
        typeFilters: typeFiltersToPass,
        colorFilters,
        animalFilters,
        itemFilters,
      });

      setListPhrase('');

      const searchParams = getSearchParamFromFilters({
        filterOperator, shouldReverseFilters, shouldIgnoreFormer, typeFilters: typeFiltersToPass, colorFilters, animalFilters, itemFilters,
      })
      
      window.history.replaceState(undefined, '', `${location.pathname}${searchParams}`);
      
      return {
        units: filteredUnits,
        unitsForMap,
        subtitleParts,
      }
    }, [lang, unitsForMapAll, detailsForUnitsById, filterOperator, shouldReverseFilters, shouldIgnoreFormer, customFilter, typeFilters, colorFilters, animalFilters, itemFilters]);

    return (
        <>
          <section
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
            <header className={clsx('', {
              'px-[50px] sm:px-0 md:mb-10 min-h-[100px] max-w-[800px] flex-shrink-0 mx-auto': zoomLevel === 1,
              'ui-slide-from-left ui-pane fixed top-3 left-3 md:left-12 md:ml-6 md:max-w-[calc(100vw_-_145px)] z-30 px-4 empty:hidden': zoomLevel > 1,
            })}>
              {zoomLevel === 1 && 
                <h1 className={clsx('text-[20px] sm:text-[28px] lg:text-[36px] text-center text-[#aa0d0d]', { 
                  'hidden': zoomLevel > 1,
                })}>
                  {t(`heraldry.${lang}.mapTitle`)}
                </h1>
              }
              {
                (zoomLevel === 1 || subtitleParts.length > 0) &&
                <HeraldrySubtitle zoomLevel={zoomLevel} subtitleParts={subtitleParts} shouldReverseFilters={shouldReverseFilters} />
              }
            </header>
            <div>
              <div
                className={clsx(mapWrapperClassName, "map-wrapper z-1 relative mx-auto", {
                  [`${mapWrapperClassNameForZoom0 || ''} mx-auto`]: zoomLevel === 1,
                })}
                style={zoomLevel === 1 ? { } : { width: `max(${(zoomLevel - 1) * 500}px, ${(zoomLevel - 1) * 80}vw` }}
              >
                <HeraldryMapHTMLCanvas
                  units={unitsForMap}
                  setListPhrase={setListPhrase}
                  mapOffset={mapOffset}
                  coatSize={Math.round(((coatSize + 1) / 11) * 80)}
                >
                  <Suspense fallback={<svg />}>
                    <MapBackground />
                  </Suspense>
                </HeraldryMapHTMLCanvas>
              </div>
            </div>
            <div className={clsx('heraldry-map-footer', {
              'text-center mt-10 text-[14px] text-[#4b4b4b] tracking-wide': zoomLevel === 1,
              'heraldry-map-footer--zoomed fixed bottom-3 right-3 max-w-[calc(100vw_-24px)] z-30 ui-pane sans text-[12px] py-2 px-3 text-center': zoomLevel > 1,
            })}>
              <p>
                {zoomLevel === 1 && <>{t('heraldry.mapFooterSource')} <strong className="text-black">wikipedia.org</strong>.<br /></>}
                {' '}
                {t('heraldry.mapFooterAllCoats')} <strong className="text-black">{unitsForMapAll.length}</strong>
                {unitsForMapAll.length > units.length && <>{t('heraldry.mapFooterCoatsAfterFilter')}
                {' '}
                <strong className={clsx({
                  'text-black': units.length > 0,
                  'text-[#ca1a1a]': units.length === 0 })
                }>{units.length}</strong>
                {units.length > 10 && <>{' '}- <strong className="text-black">
                  {(100 * (units.length / unitsForMapAll.length)).toFixed(2)}
                </strong><small>%</small></>}</>}.
              </p>
            </div>
          </section>
          <div className={clsx('ui-slide-from-left fixed top-3 left-3 z-20 flex flex-col gap-3 pointer-events-none', {
            'hidden md:flex': zoomLevel > 1 && subtitleParts.length !== 0,
          })}>
            <NavigationPane />
            <DevelopmentPane
              country={lang}
              unitTypes={developmentModeFiltersTypes || typeFiltersList.map(({ value }) => value)}
            />
          </div>
          <div className="ui-slide-from-right fixed top-3 right-3 z-20 flex flex-col gap-3 pointer-events-none">
            <ZoomPane
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              zoomMin={1}
              zoomMax={8}
              coatSize={coatSize}
              setCoatSize={setCoatSize}
              coatMin={1}
              coatMax={9}
            />
            <UnitsPane
              units={units}
              phrase={listPhrase}
              shouldShowCount={listPhrase.length > 0}
            />
            <FiltersPane
              lang={lang}
              typeFilters={typeFilters}
              setTypeFilters={setTypeFilters}
              typeFiltersList={typeFiltersList}
              shouldIgnoreFormer={shouldIgnoreFormer}
              setShouldIgnoreFormer={setShouldIgnoreFormer}
              colorFilters={colorFilters}
              setColorFilters={setColorFilters}
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
          </div>
        </>
    );
};

export default memo(HeraldryMapContainerWithUI);
