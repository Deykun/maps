import { memo, useRef, useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDraggable } from "react-use-draggable-scroll";

import { isLanguageSupported } from '@/utils/lang';

import { MapsSearchParams, getSearchParamFromFilters } from '@/topic/Heraldry/utils/getSearchParams'
import { MarkerParamsWithResult, AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';

import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
import { getFilteredUnits } from '@/topic/Heraldry/utils/getFilteredUnits';

import DevelopmentPane from '@/topic/Heraldry/components/Panes/DevelopmentPane';
import NavigationPane from '@/topic/Heraldry/components/Panes/NavigationPane';
import ZoomPane from '@/topic/Heraldry/components/Panes/ZoomPane';
import UnitsPane from '@/topic/Heraldry/components/Panes/UnitsPane';
import FiltersPane from '@/topic/Heraldry/components/Panes/FiltersPane';

import HeraldrySubtitle from '@/topic/Heraldry/components/HeraldrySubtitle';
import HeraldryCanvas from '@/topic/Heraldry/components/HeraldryCanvas/HeraldryCanvas';

import './CountryHeraldry.scss';

type Props = {
  lang: string,
  allUnits: AdministrativeUnit[],
  typeFiltersList: GetFilterResponse,
  animalFiltersList: GetFilterResponse,
  itemFiltersList: GetFilterResponse,
  mapWrapperClassName?: string,
  map: () => JSX.Element,
  initialFilters?: Partial<MapsSearchParams>
  mapOffset: MapOffset,
}

const CountryHeraldry = ({
  lang,
  allUnits,
  typeFiltersList,
  animalFiltersList,
  itemFiltersList,
  mapWrapperClassName,
  map: MapBackground,
  initialFilters = {},
  mapOffset,
}: Props) => {
    const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const [isDevModeActive, setIsDevModeActive] = useState(false);
    const [listPhrase, setListPhrase] = useState('');
    const [filterOperator, setFilterOperator] = useState<'and' | 'or'>(initialFilters.filterOperator || 'and');
    const [shouldReverseFilters, setShouldReverseFilters] = useState(initialFilters.shouldReverseFilters || false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [coatSize, setCoatSize] = useState(3);
    const [customFilter, setCustomFilter] = useState<MarkerParamsWithResult | undefined>(undefined);
    const [typeFilters, setTypeFilters] = useState<string[]>(initialFilters.typeFilters || []);
    const [colorFilters, setColorFilters] = useState<string[]>(initialFilters.colorFilters || []);
    const [animalFilters, setAnimalFilters] = useState<string[]>(initialFilters.animalFilters || []);
    const [itemFilters, setItemFilters] = useState<string[]>(initialFilters.itemFilters || []);

    // const { events } = useDraggable(wrapperRef, { decayRate: 0.01 });
    const { events } = useDraggable(wrapperRef, { decayRate: 0 });

    const { t, i18n } = useTranslation();

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
      } = getFilteredUnits(lang, allUnits, filterOperator, shouldReverseFilters, customFilter, typeFiltersToPass, colorFilters, animalFilters, itemFilters);

      setListPhrase('');

      const searchParams = getSearchParamFromFilters({
        filterOperator, shouldReverseFilters, typeFilters: typeFiltersToPass, colorFilters, animalFilters, itemFilters,
      })
      
      window.history.replaceState(undefined, '', `${location.pathname}${searchParams}`);

      return {
        units: filteredUnits,
        unitsForMap,
        subtitleParts,
      }
    }, [lang, allUnits, filterOperator, shouldReverseFilters, customFilter, typeFilters, colorFilters, animalFilters, itemFilters]);

    return (
        <>
          <section
            ref={wrapperRef}
            className={clsx(
              "map-section fixed top-0 left-0 w-full h-full",
              "p-5 pt-[100px]",
              "no-scrollbar overflow-auto", {
                "flex flex-col justify-evenly": zoomLevel === 1,
                "pb-[100px]": zoomLevel > 1,
              }
            )}
            {...events}
          >
            <header className={clsx('', {
              'md:mb-10 min-h-[100px] max-w-[800px] flex-shrink-0 mx-auto': zoomLevel === 1,
              'ui-pane fixed top-3 left-3 md:left-12 md:ml-6 md:max-w-[calc(100vw_-_145px)] z-30 px-4 empty:hidden': zoomLevel > 1,
            })}>
              {zoomLevel === 1 && 
                <h1 className={clsx('text-[28px] lg:text-[36px] text-center text-[#aa0d0d]', { 
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
                className={clsx(mapWrapperClassName, "map-wrapper z-1 relative mx-auto flex justify-center items-center", {
                  'max-h-[60lvh]': zoomLevel === 1,
                })}
                style={zoomLevel === 1 ? { } : { width: `max(${(zoomLevel - 1) * 500}px, ${(zoomLevel - 1) * 80}vw` }}
              >
                <HeraldryCanvas
                  units={unitsForMap}
                  setListPhrase={setListPhrase}
                  mapOffset={mapOffset}
                  coatSize={((coatSize + 1) / 11) * 80}
                >
                  <MapBackground />
                </HeraldryCanvas>
                {/* <div>
                    {unitsForMap.map(
                      (unit) => {
                        const { top, left } = getPostionForPlace(unit);
                        return (
                        <HeraldryMapItemFromSprite
                          key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                          unit={unit}
                          setListPhrase={{
                            top: `${top}%`,
                            left: `${left}%`,
                          }}
                          style={}
                          size={coatSize}
                        />
                    )})}
                </div> */}
              </div>
            </div>
            <div className={clsx('', {
              'text-center mt-10 text-[14px] text-[#4b4b4b] tracking-wide': zoomLevel === 1,
              'fixed bottom-3 left-1/2 -translate-x-1/2 w-[400px] max-w-[80vw] z-30 ui-pane sans text-[10px] py-1 text-center': zoomLevel > 1,
            })}>
              <p>
                {zoomLevel === 1 && <>{t('heraldry.mapFooterSource')} <strong className="text-black">wikipedia.org</strong>.<br /></>}
                {' '}
                {t('heraldry.mapFooterAllCoats')} <strong className="text-black">{allUnits.length}</strong>
                {allUnits.length > units.length && <>{t('heraldry.mapFooterCoatsAfterFilter')}
                {' '}
                <strong className={clsx({
                  'text-black': units.length > 0,
                  'text-[#ca1a1a]': units.length === 0 })
                }>{units.length}</strong>
                {units.length > 10 && <>{' '}- <strong className="text-black">
                  {(100 * units.length/allUnits.length).toFixed(2)}
                </strong><small>%</small></>}</>}.
              </p>
            </div>
          </section>
          <div className={clsx('fixed top-3 left-3 z-20 flex flex-col gap-3 pointer-events-none', {
            'hidden md:block': zoomLevel > 1 && subtitleParts.length !== 0,
          })}>
            <NavigationPane />
            {isDevModeActive &&
              <DevelopmentPane
                country={lang}
                unitTypes={typeFiltersList.map(({ value }) => value)}
                customFilter={customFilter}
                setCustomFilter={setCustomFilter}
                unitNameForAction={listPhrase}
              />
            }
          </div>
          <div className="fixed top-3 right-3 z-20 flex flex-col gap-3 pointer-events-none">
            <ZoomPane
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              zoomMin={1}
              zoomMax={6}
              coatSize={coatSize}
              setCoatSize={setCoatSize}
              coatMin={1}
              coatMax={8}
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
              isDevModeActive={isDevModeActive}
              setIsDevModeActive={setIsDevModeActive}
            />
          </div>
        </>
    );
};

export default memo(CountryHeraldry);
