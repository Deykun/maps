import { memo, useRef, useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDraggable } from "react-use-draggable-scroll";

import { isLanguageSupported } from '@/utils/lang';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

import { GetFilterResponse } from '@/topic/Heraldry/utils/getFilter';
import { getFilteredUnits } from '@/topic/Heraldry/utils/getFilteredUnits';
import { getPostionForPlace } from '@/topic/Heraldry/utils/getPostionForPlace';

import NavigationPane from '@/topic/Heraldry/components/Panes/NavigationPane';
import ZoomPane from '@/topic/Heraldry/components/Panes/ZoomPane';
import UnitsPane from '@/topic/Heraldry/components/Panes/UnitsPane';
import FiltersPane from '@/topic/Heraldry/components/Panes/FiltersPane';

import HeraldryMapItemFromSprite from '@/topic/Heraldry/components/HeraldryMapItemFromSprite';
import HeraldrySubtitle from '@/topic/Heraldry/components/HeraldrySubtitle';

import './CountryHeraldry.scss';

type Props = {
  lang: string,
  allUnits: AdministrativeUnit[],
  typeFiltersList: GetFilterResponse,
  animalFiltersList: GetFilterResponse,
  itemFiltersList: GetFilterResponse,
  mapWrapperClassName?: string,
  map: () => JSX.Element,
}

const CountryHeraldry = ({
  lang,
  allUnits,
  typeFiltersList,
  animalFiltersList,
  itemFiltersList,
  mapWrapperClassName,
  map: MapBackground,
}: Props) => {
    const wrapperRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const [listPhrase, setListPhrase] = useState('');
    const [filterOperator, setFilterOperator] = useState<'and' | 'or'>('and');
    const [shouldReverseFilters, setShouldReverseFilters] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [coatSize, setCoatSize] = useState(3);
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [animalFilters, setAnimalFilters] = useState<string[]>([]);
    const [itemFilters, setItemFilters] = useState<string[]>([]);

    const { events } = useDraggable(wrapperRef, { decayRate: 0.01 });

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
      } = getFilteredUnits(lang, allUnits, filterOperator, shouldReverseFilters, typeFiltersToPass, colorFilters, animalFilters, itemFilters);

      setListPhrase('');

      return {
        units: filteredUnits,
        unitsForMap,
        subtitleParts,
      }
    }, [filterOperator, shouldReverseFilters, colorFilters, typeFilters, animalFilters, itemFilters]);

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
                <h1 className={clsx('text-[28px] lg:text-[36px] text-center', { 
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
                <MapBackground />
                <div>
                    {unitsForMap.map(
                      (unit) => (
                        <HeraldryMapItemFromSprite
                          key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                          unit={unit}
                          setListPhrase={setListPhrase}
                          style={getPostionForPlace(unit, lang)}
                          size={coatSize}
                        />
                    ))}
                </div>
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
            />
          </div>
        </>
    );
};

export default memo(CountryHeraldry);
