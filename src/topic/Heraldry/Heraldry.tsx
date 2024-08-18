import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';

import { PATHS_DATA } from '../../constants';

import HeraldryListItem from './components/HeraldryListItem';
import HeraldryMapItem from './components/HeraldryMapItem';
import HeraldryMapItemFromSprite from './components/HeraldryMapItemFromSprite';
import HeraldrySubtitle from './components/HeraldrySubtitle';

import { removeDiacratics } from '../../utils/text';

import { GetFilterResponse } from './utils/getFilter';
import { getFilteredUnits } from './utils/getFilteredUnits';
import { getPostionForPlace } from './utils/getPostionForPlace';

import { AdministrativeUnit } from './types';
import { WITH_ANIMAL, WITHOUT_ANIMAL } from './constants';

import './Heraldry.scss';

type Props = {
  lang: string,
  allUnits: AdministrativeUnit[],
  typeFiltersList: GetFilterResponse,
  animalFiltersList: GetFilterResponse,
  itemsFiltersList: GetFilterResponse,
  mapWrapperClassName?: string,
  map: () => JSX.Element,
}

const Heraldry = ({
  lang,
  allUnits,
  typeFiltersList,
  animalFiltersList,
  itemsFiltersList,
  mapWrapperClassName,
  map: MapBackground,
}: Props) => {
    const [listPage, setListPage] = useState(0);
    const [listPhrase, setListPhrase] = useState('');
    const [filterOperator, setFilterOperator] = useState<'and' | 'or'>('and');
    const [shouldReverseFilters, setShouldReverseFilters] = useState(false);
    const [mapFitment, setMapFitment] = useState<'small' | 'medium' | 'large'>('small');
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [animalFilters, setAnimalFilters] = useState<string[]>([]);
    const [itemFilters, setItemFilters] = useState<string[]>([]);

    const { t, i18n } = useTranslation();

    useEffect(() => {
      // We set the language according to the country
      if (lang) {
        i18n.changeLanguage(lang);
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

      setListPage(0);
      setListPhrase('');

      return {
        units: filteredUnits,
        unitsForMap,
        subtitleParts,
      }
    }, [filterOperator, shouldReverseFilters, colorFilters, typeFilters, animalFilters, itemFilters]);

    const unitsForList = useMemo(() => {
      if (listPhrase === '') {
        return units;
      }

      const listPhraseNormalized = removeDiacratics(listPhrase.toLowerCase(), lang, '');

      return units.filter((unit) => {
        const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
        const indexText = removeDiacratics(text, lang, '');

        return indexText.includes(listPhraseNormalized);
      })
    }, [units, listPhrase]);

    const toggleColor = useCallback((color: string) => {
      setColorFilters((colors) => {
        if (colors.includes(color)) {
          return colors.filter((active) => active !== color);
        }

        return [...colors, color];
      });
    }, []);

    const toggleType = useCallback((type: string) => {
      setTypeFilters((types) => {
        if (types.includes(type)) {
          return types.filter((active) => active !== type);
        }

        return [...types, type];
      });
    }, []);

    const toggleAnimal = useCallback((animal: string) => {
      if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
        setAnimalFilters(animals => animals.includes(animal) ? [] : [animal]);

        return;
      }

      setAnimalFilters((animals) => {
        if (animals.includes(animal)) {
          return animals.filter((active) => active !== animal);
        }

        return [...animals, animal].filter((active) => ![WITH_ANIMAL, WITHOUT_ANIMAL].includes(active));
      });
    }, []);

    const toggleItem = useCallback((item: string) => {
      setItemFilters((items) => {
        if (items.includes(item)) {
          return items.filter((active) => active !== item);
        }

        return [...items, item];
      });
    }, []);

    const hasFilters = typeFilters.length > 0 || colorFilters.length > 0 || animalFilters.length > 0 || itemFilters.length > 0;

    const resetFilters = () => {
      setTypeFilters([]);
      setColorFilters([]);
      setAnimalFilters([]);
      setItemFilters([]);
    }

    const toggleMapFittment = () => {
      if (mapFitment === 'small') {
        setMapFitment('medium');
      } else if (mapFitment === 'medium') {
        setMapFitment('large');
      } else {
        setMapFitment('small');
      }
    }

    const coatsSizeClassName = unitsForMap.length < 20
      ? 'coats-lg'
      : (unitsForMap.length < 60 ? 'coats-md' : 'coats-sm');

    return (
        <>
          <h1 className="text-[18px] md:text-[36px] text-center mb-4">
            {t(`heraldry.${lang}.mapTitle`)}
          </h1>
          <HeraldrySubtitle subtitleParts={subtitleParts} shouldReverseFilters={shouldReverseFilters} />
          <section
            className={clsx(coatsSizeClassName, "map-section", `map-section--${mapFitment}`, {
              "mb-10": ['small', 'medium'].includes(mapFitment),
              "max-h-[66vh]": ['small'].includes(mapFitment),
              "max-h-[1500px] w-auto": ['medium'].includes(mapFitment),
              "overflow-scroll no-scrollbar border-t max-h-[90vh]": ['large'].includes(mapFitment),
            })}
          >
            <div
              className={clsx(mapWrapperClassName, "map-wrapper relative mx-auto flex justify-center items-center", {
                "max-h-[66vh]": ['small'].includes(mapFitment),
                "max-h-[1500px]": ['medium'].includes(mapFitment),
              })}
              style={mapFitment === 'large' ? { width: 2500 } : {}}
            >
              {/* <SvgGmina /> */}
              <MapBackground />
              {/* <div>
                  {unitsForMap.map(
                    (unit) => (
                      <HeraldryMapItem
                        key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                        {...unit}
                        setListPhrase={setListPhrase}
                        style={getPostionForPlace(unit, lang)}
                      />
                  ))}
              </div> */}
              <div>
                  {unitsForMap.map(
                    (unit) => (
                      <HeraldryMapItemFromSprite
                        key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                        unit={unit}
                        setListPhrase={setListPhrase}
                        style={getPostionForPlace(unit, lang)}
                      />
                  ))}
              </div>
            </div>
          </section>
          <div
            className={clsx('sticky -top-[1px] border-b', {
              "md:-mt-[50px]": mapFitment === 'large',
            })}
          >
            <div className="max-w-screen-xl md:h-[50px] mx-auto py-2 px-4 md:p-4 flex flex-wrap justify-between bg-white border-t border-x">
              <p className="text-[12px] text-[#4b4b4b]">
                {t('heraldry.mapFooterSource')} <strong className="text-black">wikipedia.org</strong>.
              </p>
              <p className="text-[12px] text-[#4b4b4b]">
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
          </div>
          <div className="max-w-screen-xl mx-auto border-x p-4 pt-10">
            <div className="flex items-center mb-3">
              <h3 className="text-[24px] mb-3">{t('heraldry.titleFilters')}</h3>
              <span className="ml-auto">
                {units.length === 0 && <span className="mr-2 text-[#ca1a1a] text-[12px] tracking-widest font-[800]">{t('heraldry.noResult')}</span>}
                {hasFilters && <button className="ml-auto font-[600]" onClick={resetFilters}>{t('heraldry.clearFilters')}</button>}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 mb-10">
              <span className="flex items-center gap-5">
                {t('heraldry.color.filterTitle')}
                {[
                  { name: 'red', color: '#d61e27' },
                  { name: 'green', color: '#299649' },
                  { name: 'blue', color: '#1d7dc0' },
                ].map(({ name, color }) => <button
                  key={name}
                  style={{ backgroundColor: color }}
                  onClick={() => toggleColor(name)}
                  className="block size-5 rounded-[4px] shadow-md text-white text-[10px]"
                >
                  {colorFilters.includes(name) ? '✔' : ''}
                </button>)}
              </span>
              <span className="flex flex-wrap gap-5">
                {typeFiltersList.map(({ value, total }) => 
                  <button
                    onClick={() => toggleType(value)}
                    className={clsx("hover:text-[#ca0505] text-nowrap", { 
                      'text-[#ca0505]': typeFilters.includes(value),
                    })}
                  >
                    {t(`heraldry.unit.type.${lang}.${value}`)} <small className="text-[10px] text-[#4b4b4b] tracking-widest">({total})</small>
                  </button>
                )}
              </span>
              <span className="flex items-center gap-5">
                {t('heraldry.mapSize')}
                <button className="hover:text-[#ca0505]" onClick={toggleMapFittment}>
                  {t(`heraldry.mapSize.${mapFitment}`)}
                </button>
              </span>
            </div>
            {animalFiltersList.length > 0 && <>
              <h4 className="w-fit text-[18px] font-[600] tracking-wider">{t('heraldry.animal.filterTitle')}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3 mb-10">
                {[
                  { value: WITH_ANIMAL, total: 0 },
                  { value: WITHOUT_ANIMAL, total: 0 },
                ...animalFiltersList].map(({ value, total }) => 
                  <button
                    onClick={() => toggleAnimal(value)}
                    className={clsx("hover:text-[#ca0505]", { 
                      'text-[#ca0505]': animalFilters.includes(value),
                    })}
                  >
                    {t(`heraldry.animal.${value}`)} {total > 0 && <small className="text-[10px] text-[#4b4b4b] tracking-widest">({total})</small>}
                  </button>
                )}
              </div>
            </>}
            {itemsFiltersList.length > 0 && <>
              <h4 className="w-fit text-[18px] font-[600] tracking-wider">{t('heraldry.item.filterTitle')}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3 pb-10">
                {itemsFiltersList.map(({ value, total }) => 
                  <button
                    onClick={() => toggleItem(value)}
                    className={clsx("hover:text-[#ca0505]", { 
                      'text-[#ca0505]': itemFilters.includes(value),
                    })}
                  >
                    {t(`heraldry.item.${value}`)} <small className="text-[10px] text-[#4b4b4b] tracking-widest">({total})</small>
                  </button>
                )}
              </div>
            </>}

            <div className="flex items-center justify-end gap-10 text-[14px]">
              <span className="flex items-center gap-5">
                  {t('heraldry.filterOperator')}
                  <button className="hover:text-[#ca0505]" onClick={() => setFilterOperator(filterOperator === 'and' ? 'or' : 'and')}>
                    {t(`heraldry.filterOperator.${filterOperator}`)}
                  </button>
              </span>
              <span className="flex items-center gap-5">
                  {t('heraldry.filterReverse')}
                  <button className="hover:text-[#ca0505]" onClick={() => setShouldReverseFilters(value => !value)}>
                    {t(`heraldry.filterReverse.${shouldReverseFilters ? 'yes' : 'no'}`)}
                  </button>
              </span>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto border-x border-t p-4 pt-10 pb-10">
            <h3 className="text-[24px] mb-3">
              {t('heraldry.list.title')}
              {' '}
              {unitsForList.length > 0 && <small className="text-[#4b4b4b] tracking-widest">({unitsForList.length})</small>}
            </h3>
            <div className="text-right">
              <label>{t('heraldry.list.limitListTo')}</label>
              {' '}
              <input
                value={listPhrase}
                onChange={(e) => setListPhrase(e.target.value || '')}
                className="border-b w-[140px] outline-offset-2 px-2"
                placeholder={t('heraldry.list.limitListToPlaceholder')}
              />
            </div>
            <ul className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {unitsForList.slice(0, 6 + 42 * listPage).map((unit) => (<HeraldryListItem key={unit.title} {...unit} />))}
            </ul>
            {unitsForList.length > (6 + 42 * listPage) && <div className="mt-5 text-center">
              <button onClick={() => setListPage(listPage + 1)}>
                {t('heraldry.list.showMore')}
              </button>
            </div>}
          </div>
          <p className="max-w-screen-xl mx-auto border-x border p-4 mb-10 text-[12px] text-[#4b4b4b] text-right">
            {t('heraldry.list.footer')} <a href="https://github.com/Deykun/maps/issues" target="_blank" className="text-black hover:text-[#ca0505] font-[600]">github.com/Deykun/maps/issues</a>
          </p>
          <ul className="max-w-screen-xl mx-auto p-4 mb-10 text-[12px] text-[#4b4b4b] text-center">
            {PATHS_DATA.map(({ path, pathNameLink }) => (<li key={path} className="inline mx-2">
              <Link to={`/maps/${path}`}>{t(pathNameLink)}</Link>
            </li>))}
          </ul>
        </>
    );
};

export default memo(Heraldry);
