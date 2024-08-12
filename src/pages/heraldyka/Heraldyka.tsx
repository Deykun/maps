import { useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
// import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import MapItem from './MapItem';
import './Heraldyka.scss';
import { AdministrativeUnit, WITH_ANIMAL, WITHOUT_ANIMAL } from './constants';
import { removeDiacratics } from '../../utils/text';

import { getFilter } from './utils/getFilter';
import { getFilteredUnits } from './utils/getFilteredUnits';
import { getPostionForPlace } from './utils/getPostionForPlace';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'
import powiatyJSON from './powiaty-images.json'

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);
const powiaty = Object.values(powiatyJSON);

const allUnits: AdministrativeUnit[] = Object.values([
  ...gminy,
  ...powiaty,
  ...miasta,
].filter((unit: AdministrativeUnit) => {
  if ([
    'Herb Podgórza',
    'Herb gminy Janów (powiat częstochowski)',
    'Herb Nowego Bytomia',
    'Herb gminy Brudzew',
    'Herb gminy Ostrowice',
    'Herby miast Śląska Cieszyńskiego',
  ].includes(unit.title)) {
    // Historic
    return false;
  };

  if ([
    'Herb Trzyńca',
    'Herb Orłowej',
  ].includes(unit.title)) {
    // Outside of Poland
    return false;
  }

  return true;
}).reduce((stack: {
  [url: string]: AdministrativeUnit,
}, unit: AdministrativeUnit) => {
  if (stack[unit.url]) {
    const areImagesFilledAndDifferent = unit.image?.source && unit.image?.source !== stack[unit.url].image?.source;
    if (areImagesFilledAndDifferent) {
      if (location.href.includes('localhost')) {
        console.error({
          [unit.type?.join('') || 'a']: stack[unit.url].image?.source,
          [stack[unit.url].type?.join('') || 'b']: stack[unit.url].image?.source,
        })
        throw ('Duplicated but different images!')
      }
    }

    // It merges duplicates but keeps their type in array
    const typeMerged: string[] = [...(stack[unit.url].type || []), ...(unit.type || [])];
    stack[unit.url].type = [...new Set(typeMerged)];
  } else {
    stack[unit.url] = unit;
  }

  return stack;
}, {}));

const typeFiltersList = getFilter(allUnits, 'type');

const animalFiltersList = getFilter(allUnits, 'animals');

const itemsFiltersList = getFilter(allUnits, 'items');

const Heraldyka = () => {
    const [listPage, setListPage] = useState(0);
    const [listPhrase, setListPhrase] = useState('');
    const [mapFitment, setMapFitment] = useState<'compact' | 'fullWidth' | 'zoom'>('compact');
    const [typeFilers, setTypeFilters] = useState<string[]>([]);
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [animalFilters, setAnimalFilters] = useState<string[]>([]);
    const [itemFilters, setItemFilters] = useState<string[]>([]);

    const { t, i18n } = useTranslation();

    useEffect(() => {
      // Default for the Polish map
      i18n.changeLanguage('pl');
    }, []);

    const { units, unitsForMap, subtitleParts } = useMemo(() => {
      const {
        filteredUnits,
        unitsForMap,
        subtitleParts,
      } = getFilteredUnits(allUnits, typeFilers, colorFilters, animalFilters, itemFilters);

      setListPage(0);
      setListPhrase('');

      return {
        units: filteredUnits,
        unitsForMap,
        subtitleParts,
      }
    }, [colorFilters, typeFilers, animalFilters, itemFilters]);

    const unitsForList = useMemo(() => {
      if (listPhrase === '') {
        return units;
      }

      const listPhraseNormalized = removeDiacratics(listPhrase.toLowerCase(), 'pl', '');

      return units.filter((unit) => {
        const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
        const indexText = removeDiacratics(text, 'pl', '');

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
        setAnimalFilters([animal]);

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

    const hasFilters = colorFilters.length > 0 || animalFilters.length > 0 || itemFilters.length > 0;

    const resetFilters = () => {
      setTypeFilters([]);
      setColorFilters([]);
      setAnimalFilters([]);
      setItemFilters([]);
    }

    const toggleMapFittment = () => {
      if (mapFitment === 'compact') {
        setMapFitment('fullWidth');
      } else if (mapFitment === 'fullWidth') {
        setMapFitment('zoom');
      } else {
        setMapFitment('compact');
      }
    }

    const coatsSizeClassName = unitsForMap.length < 20
      ? 'coats-lg'
      : (unitsForMap.length < 60 ? 'coats-md' : 'coats-sm');

    return (
        <>
          <h1 className="text-[18px] md:text-[36px] text-center mb-4">
            {t('heraldry.mapTitle')}
          </h1>
          <h2 className="text-[18px] min-h-[20px] leading-[20px] text-center mb-6 relative">
            {subtitleParts.length > 0 && <span className="text-[#4b4b4b]">
              <small>
                {t('heraldry.activeFilters')}
              </small>
              {' '}
              <span className="text-black">
                {subtitleParts.map((label) => t(label)).join(' + ')}
              </span>
            </span>}
          </h2>
          <div
            className={clsx(coatsSizeClassName, {
              "mb-10": ['compact', 'fullWidth'].includes(mapFitment),
              "max-h-[66vh]": ['compact'].includes(mapFitment),
              "overflow-scroll hide-scroll border-t max-h-[90vh]": ['zoom'].includes(mapFitment),
            })}
          >
            <div
              className={clsx("map-wrapper relative aspect-[820_/_775] mx-auto flex justify-center items-center", {
                "max-h-[66vh]": ['compact'].includes(mapFitment),
              })}
              style={mapFitment === 'zoom' ? { width: 2500 } : {}}
            >
              {/* <SvgGmina /> */}
              <SvgPowiaty />
              <div>
                  {unitsForMap.map(
                    (unit) => (
                      <MapItem
                        key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                        {...unit}
                        setListPhrase={setListPhrase}
                        style={getPostionForPlace(unit)}
                      />
                  ))}
              </div>
            </div>
          </div>
          <div
            className={clsx('sticky -top-[1px] border-b', {
              "-mt-[50px]": mapFitment === 'zoom',
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
                <strong className="text-black">{units.length}</strong>
                {units.length > 10 && <>{' '}- <strong className="text-black">
                  {(100 * units.length/allUnits.length).toFixed(2)}
                </strong><small>%</small></>}</>}.
              </p>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto border-x p-4 pt-10 pb-10 bg-white">
            <div className="flex items-center mb-3">
              <h3 className="text-[24px] mb-3">{t('heraldry.titleFilters')}</h3>
              <span className="ml-auto">
                {units.length === 0 && <span className="mr-2 text-[#ca1a1a] text-[12px] tracking-wider">{t('heraldry.noResult')}</span>}
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
                  className="block size-5 rounded-[4px] shadow-md text-white text-[12px]"
                >
                  {colorFilters.includes(name) ? '✔' : ''}
                </button>)}
              </span>
              <span className="flex flex-wrap gap-5">
                {typeFiltersList.map(({ value, total }) => 
                  <button
                    onClick={() => toggleType(value)}
                    className={clsx("hover:text-[#ca0505] text-nowrap", { 
                      'text-[#ca0505]': typeFilers.includes(value),
                    })}
                  >
                    {t(`heraldry.unit.type.pl.${value}`)} <small className="text-[10px] text-[#4b4b4b] tracking-widest">({total})</small>
                  </button>
                )}
              </span>
              <span className="flex items-center gap-5">
                {t('heraldry.mapSize')}
                <button className="text-[#ca0505]" onClick={toggleMapFittment}>
                  {t(`heraldry.mapSize.${mapFitment}`)}
                </button>
              </span>
            </div>
            <details className="mb-10">
              <summary className="w-fit font-[600] tracking-wider">{t('heraldry.animal.filterTitle')}</summary>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
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
                    {t(`heraldry.animal.${value}`)} {total > 0 && <small className="text-[#4b4b4b] tracking-widest">({total})</small>}
                  </button>
                )}
              </div>
            </details>
            <details className="mb-10">
              <summary className="w-fit font-[600] tracking-wider">{t('heraldry.item.filterTitle')}</summary>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
                {itemsFiltersList.map(({ value, total }) => 
                  <button
                    onClick={() => toggleItem(value)}
                    className={clsx("hover:text-[#ca0505]", { 
                      'text-[#ca0505]': itemFilters.includes(value),
                    })}
                  >
                    {t(`heraldry.item.${value}`)} <small className="text-[#4b4b4b] tracking-widest">({total})</small>
                  </button>
                )}
              </div>
            </details>
            <div className="mt-20">
              <h3 className="text-[24px] mb-3">{t('heraldry.list.title')}</h3>
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
            </div>
            <ul className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {unitsForList.slice(0, 6 + 42 * listPage).map((unit) => (<ListItem key={unit.title} {...unit} />))}
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
        </>
    );
};

export default Heraldyka;
