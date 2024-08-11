import { useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';
// import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import MapItem from './MapItem';
import './Heraldyka.scss';
import { AdministrativeUnit } from './constants';
import { removeDiacratics } from '../../utils/text';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);

const WITH_ANIMAL = 'ze zwięrzęciem';
const WITHOUT_ANIMAL = 'bez zwierząt';

const allUnits: AdministrativeUnit[] = Object.values([...gminy, ...miasta].filter((unit: AdministrativeUnit) => {
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

  if (['Herb Trzyńca'].includes(unit.title)) {
    // Outside of Poland
    return false;
  }

  return true;
}).reduce((stack: {
  [url: string]: AdministrativeUnit,
}, unit: AdministrativeUnit) => {
  // It flatens duplicates by url
  stack[unit.url] = unit;

  return stack
}, {}));

const getFilter = (units: AdministrativeUnit[], name: 'animals' | 'items') => {
  const filterByName = units.reduce((stack: {
    [key: string]: number,
  }, unit) => {
    const marker = unit?.markers?.[name] || [];
    marker.forEach((value: string) => {
      if (stack[value]) {
        stack[value] = stack[value] + 1;
      } else {
        stack[value] = 1;
      }
    })
  
    return stack;
  }, {});

  
  return Object.entries(filterByName).map(
    ([value, total]) => ({ value, total }),
  ).filter(
    ({ total }) => total >= 2,
  ).sort((a, b) => b.total - a.total);
}

const animalFiltersList = getFilter(allUnits, 'animals');

const itemsFiltersList = getFilter(allUnits, 'items');

// https://pl.wikipedia.org/wiki/Geografia_Polski

const minTop = 0;
// const maxTop = 54.8;
const maxTop = 54.95;
const maxBottom = 48.95;

const maxLeft = 14.07;
const maxRight = 24.25;

const polandWidth = maxRight - maxLeft;

const getPostionForPlace = (unit: AdministrativeUnit) => {
  const longitude = unit?.place?.coordinates?.lon ?? 0;
  const latitude = unit?.place?.coordinates?.lat ?? 0;
  const left = `${((longitude - maxLeft) / polandWidth * 100)}%`;
  const top = `${minTop + ((latitude - maxTop) / (maxBottom - maxTop) * 100)}%`;

  return {
    left,
    top,
  }
}

const Heraldyka = () => {
    const [listPage, setListPage] = useState(1);
    const [listPhrase, setListPhrase] = useState('');
    const [mapFitment, setMapFitment] = useState<'compact' | 'full-width' | 'zoom'>('compact');
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [animalFilters, setAnimalFilters] = useState<string[]>([]);
    const [itemFilters, setItemFilters] = useState<string[]>([]);

    const { units, unitsForMap, subtitle } = useMemo(() => {
        const filteredUnits = allUnits.filter(
          (unit) => {
            const isColorFilterActive = colorFilters.length > 0;
            if (isColorFilterActive) {
              const isPrimary = unit?.colors?.primary?.name && colorFilters.includes(unit?.colors?.primary?.name);
              if (!isPrimary) {
                return false;
              }

              const isInPalette = Array.isArray(unit?.colors?.palette)
                && unit.colors.palette.some(({ name }) => colorFilters.includes(name));
  
              if (!isInPalette) {
                return false;
              }
            }

            const isAnimalFilterActive = animalFilters.length > 0;
            if (isAnimalFilterActive) {
              const animals = unit?.markers?.animals || [];
              const hasAnimals = animals.length > 0;

              if ([WITH_ANIMAL, WITHOUT_ANIMAL].includes(animalFilters[0])) {
                if (animalFilters[0] === WITH_ANIMAL && !hasAnimals) {
                  return false;
                } else if (animalFilters[0] === WITHOUT_ANIMAL && hasAnimals) {
                  return false;
                }
              } else {
                if (!hasAnimals) {
                  return false;
                }
  
                const hasAllAnimals = animalFilters.every((active) => animals.includes(active));
                if (!hasAllAnimals) {
                  return false;
                }
              }
            }

            const isItemFilterActive = itemFilters.length > 0;
            if (isItemFilterActive) {
              const items = unit?.markers?.items || [];
              const hasItems = items.length > 0;

              if (!hasItems) {
                return false;
              }

              const hasAllItems = itemFilters.every((active) => items.includes(active))
              if (!hasAllItems) {
                return false;
              }
            }

            return true;
          }
        );

        const unitsForMap = filteredUnits.filter(
          (unit) => typeof unit?.place?.coordinates?.lon === 'number' && typeof unit?.imageUrl === 'string',
        );

        setListPage(1);
        setListPhrase('');

        return {
          units: filteredUnits,
          unitsForMap,
          subtitle: [...itemFilters, ...animalFilters, ...colorFilters].filter(Boolean).map(
            (name) => name.replace('red', 'czerwony').replace('green', 'zielony').replace('blue', 'niebieski'
          )).join(' + '),
        }
    }, [colorFilters, animalFilters, itemFilters]);

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
      setColorFilters([]);
      setAnimalFilters([]);
      setItemFilters([]);
    }

    const toggleMapFittment = () => {
      if (mapFitment === 'compact') {
        setMapFitment('full-width');
      } else if (mapFitment === 'full-width') {
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
          <h1 className="text-[22px] md:text-[48px] text-center mb-4">Herby polskich miast i gmin</h1>
          <h2 className="text-[18px] text-center mb-6">
            {subtitle && <span className="text-[#4b4b4b]">Dopasowanie: {subtitle}</span>}
          </h2>
          <div
            className={clsx("mb-10", coatsSizeClassName, {
              "max-h-[70vh]": ['compact', 'zoom'].includes(mapFitment),
              "overflow-scroll": ['zoom'].includes(mapFitment),
            })}
          >
            <div
              className={clsx("map-wrapper relative aspect-[820_/_775] mx-auto flex justify-center items-center", {
                "max-h-[70vh]": ['compact'].includes(mapFitment),
              })}
              style={mapFitment === 'zoom' ? { width: 2000 } : {}}
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
          <div className="max-w-screen-xl mx-auto p-4">
            <div className="flex flex-wrap justify-between mb-10">
              <p className="text-[12px] text-[#4b4b4b]">
                Na podstawie scrapingu artykułów z <strong className="text-black">Wikipedii</strong>.
              </p>
              <p className="text-[12px] text-[#4b4b4b]">
                Wszystkich herbów <strong className="text-black">{allUnits.length}</strong>
                {allUnits.length > units.length && <>, a po odfiltrowaniu <strong className="text-black">{units.length}</strong></>}.
              </p>
            </div>
            <div className="flex items-center mb-3">
              <h3 className="inline text-[24px]">Opcje</h3>
              <span className="ml-auto">
                {units.length === 0 && <span className="mr-2 text-[red] text-[12px]">(brak wyników)</span>}
                {hasFilters && <button className="ml-auto font-[600]" onClick={resetFilters}>wyczyść</button>}
              </span>
            </div>
            <div className="flex items-center gap-10 mb-3">
              <span className="flex items-center gap-5">
                Kolory:
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
              <span className="ml-auto flex items-center gap-5">
                Rozmiar mapy:  
                <button className="font-[600]" onClick={toggleMapFittment}>
                  {mapFitment === 'compact' && 'Mała'}
                  {mapFitment === 'full-width' && 'Średni'}
                  {mapFitment === 'zoom' && 'Duża'}
                </button>
              </span>
            </div>
            <details className="mb-3">
              <summary className="w-fit font-[600] tracking-wider">Zwierzęta</summary>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
                {[
                  { value: WITH_ANIMAL, total: 0 },
                  { value: WITHOUT_ANIMAL, total: 0 },
                ...animalFiltersList].map(({ value, total }) => 
                  <button
                    onClick={() => toggleAnimal(value)}
                    className={animalFilters.includes(value) ? 'font-[800]' : ''}
                  >
                    {value} {total > 0 && <small className="text-[#4b4b4b] tracking-widest">({total})</small>}
                  </button>
                )}
              </div>
            </details>
            <details className="mb-3">
              <summary className="w-fit font-[600] tracking-wider">Cechy</summary>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
                {itemsFiltersList.map(({ value, total }) => 
                  <button
                    onClick={() => toggleItem(value)}
                    className={itemFilters.includes(value) ? 'font-[800]' : ''}
                  >
                    {value} <small className="text-[#4b4b4b] tracking-widest">({total})</small>
                  </button>
                )}
              </div>
            </details>

            <div className="mt-10">
              <h3 className="text-[24px] mb-3">Lista</h3>
              <div>
                <label>Ogranicz listę do:</label>
                {' '}
                <input
                  value={listPhrase} onChange={(e) => setListPhrase(e.target.value || '')}
                  className="border-[black] border-b min-w-fit px-2"
                  placeholder="miejscowość"
                />
              </div>
            </div>
            <ul className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {unitsForList.slice(0, 30 * listPage).map((unit) => (<ListItem key={unit.title} {...unit} />))}
            </ul>
            {unitsForList.length > 30 * listPage && <div className="mt-5 text-center">
              <button onClick={() => setListPage(listPage + 1)}>Więcej</button>
            </div>}
          </div>
        </>
    );
};

export default Heraldyka;
