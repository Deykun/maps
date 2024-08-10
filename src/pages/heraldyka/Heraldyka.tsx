import { useState, useMemo, useCallback } from 'react';
// import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import './Heraldyka.scss';
import { AdministrativeUnit } from './constants';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);

const WITH_ANIMAL = 'ze zwięrzęciem';
const WITHOUT_ANIMAL = 'bez zwierząt';

const allUnits: AdministrativeUnit[] = [...gminy, ...miasta].filter((unit: AdministrativeUnit) => {
  if (unit.title === 'Herb Podgórza') {
    // Historic
    return false;
  }
  
  if (unit?.place?.name && ['Miasteczko Krajeńskie', 'Zaklików', 'Lutomiersk'].includes(unit.place.name)) {
    // It is twice
    return false;
  }

  return true;
});

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
    ({ total }) => total >= 5,
  ).sort((a, b) => b.total - a.total);
}

const animalFiltersList = getFilter(allUnits, 'animals');

const itemsFiltersList = getFilter(allUnits, 'items');

// https://pl.wikipedia.org/wiki/Geografia_Polski

const minTop = 0;
// const maxTop = 54.8;
const maxTop = 54.9;
const maxBottom = 48.85;

const maxLeft = 14.17;
const maxRight = 24.39;

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
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [animalFilters, setAnimalFilters] = useState<string[]>([]);
    const [itemFilters, setItemFilters] = useState<string[]>([]);

    const { units, unitsWithLocation, subtitle } = useMemo(() => {
        const filteredUnits = allUnits.filter(
          (unit) => {
            const isActive = colorFilters.length > 0;
            if (!isActive) {
              return true;
            }

            if (unit?.colors?.primary?.name && colorFilters.includes(unit?.colors?.primary?.name)) {
              return true;
            }

            if (Array.isArray(unit?.colors?.palette) && unit.colors.palette.some(
              ({ name }) => colorFilters.includes(name))
            ) {
              return true;
            }

            return false;
          }
        ).filter(
          (unit) => {
            const isActive = animalFilters.length > 0;
            if (!isActive) {
              return true;
            }

            const animals = unit?.markers?.animals || [];
            const hasAnimals = animals.length > 0;

            if (animalFilters[0] === WITH_ANIMAL) {
              return hasAnimals;
            }

            if (animalFilters[0] === WITHOUT_ANIMAL) {
              return !hasAnimals;
            }

            if (!hasAnimals) {
              return false;
            }

            const hasAllAnimals = animalFilters.every((active) => animals.includes(active))

            return hasAllAnimals;
          }
        ).filter(
          (unit) => {
            const isActive = itemFilters.length > 0;
            if (!isActive) {
              return true;
            }

            const items = unit?.markers?.items || [];
            const hasItems = items.length > 0;

            if (!hasItems) {
              return false;
            }

            const hasAllItems = itemFilters.every((active) => items.includes(active))

            return hasAllItems;
          }
        );

        const unitsWithLocation = filteredUnits.filter(
          (unit) => typeof unit?.place?.coordinates?.lon === 'number',
        );

        return {
          units: filteredUnits,
          unitsWithLocation,
          subtitle: [...itemFilters, ...animalFilters, ...colorFilters].filter(Boolean).map(
            (name) => name.replace('red', 'czerwony').replace('green', 'zielony').replace('blue', 'niebieski'
          )).join(' + '),
        }
    }, [colorFilters, animalFilters, itemFilters]);

    const toggleColor = useCallback((color: string) => {
      setColorFilters((colors) => {
        if (colors.includes(color)) {
          return colors.filter((active) => active !== color);
        }

        return [...colors, color];
      });
    }, []);

    const toggleAnimal = useCallback((animal: string) => {
      if ([WITHOUT_ANIMAL, WITHOUT_ANIMAL].includes(animal)) {
        setAnimalFilters([animal]);

        return;
      }

      setAnimalFilters((animals) => {
        if (animals.includes(animal)) {
          return animals.filter((active) => active !== animal);
        }

        return [...animals, animal].filter((active) => ![WITHOUT_ANIMAL, WITHOUT_ANIMAL].includes(active));
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

    // We have 2000 nodes and React sometimes doesn't remove them :D, this force rerender of the parent
    const hashKey = `hash-${animalFilters}-${colorFilters.join('-')}-${itemFilters}`;

    return (
        <>
          <h1 className="text-[22px] md:text-[48px] text-center mb-4">Herby polskich miast i gmin</h1>
          <h2 className="text-[18px] text-center mb-6">
            {subtitle && <span className="opacity-70">Dopasowanie: {subtitle}</span>}
          </h2>
          <div className="relative mb-10 max-h-[70vh] aspect-[820_/_775] mx-auto flex justify-center items-center">
            {/* <SvgGmina /> */}
            <SvgPowiaty />
            <div key={hashKey}>
              {unitsWithLocation.map(
                  (unit) => (
                    <span
                      key={`${unit.title}-${unit?.place?.coordinates?.lon}`}
                      className="absolute hover:z-10"
                      style={getPostionForPlace(unit)}
                    >
                      <img src={unit?.imageUrl}
                        loading="lazy"
                        className={`${unitsWithLocation.length < 25 ? 'size-4 md:size-6 lg:size-8' : 'size-2 sm:size-3 md:size-4 lg:size-5'} scale-100 hover:scale-[800%] ease-in duration-100 object-contain`}
                        title={unit.title}
                      />
                  </span>
                ))}
            </div>
          </div>
          <p className="mb-5 text-right text-[12px] opacity-70">
              Zaindeksowanych <strong>{allUnits.length}</strong>
              {' '}
              {allUnits.length > units.length && <>po odfiltrowaniu <strong>{units.length}</strong></>}
              {' '}
              na mapię <strong>{unitsWithLocation.length}</strong>.
          </p>
          <div className="flex items-center mb-3">
            <h3 className="inline text-[24px]">Filtry</h3>
            <span className="ml-auto">
              {units.length === 0 && <span className="mr-2 text-[red] text-[12px]">(brak wyników)</span>}
              {hasFilters && <button className="ml-auto" onClick={resetFilters}>wyczyść</button>}
            </span>
          </div>
          <div className="flex items-center gap-5 mb-3">
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
          </div>
          <details className="mb-3">
            <summary className="w-fit">Zwierzęta</summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
              {[
                { value: WITH_ANIMAL, total: 0 },
                { value: WITHOUT_ANIMAL, total: 0 },
              ...animalFiltersList].map(({ value, total }) => 
                <button
                  onClick={() => toggleAnimal(value)}
                  className={animalFilters.includes(value) ? 'font-[800]' : ''}
                >
                  {value} {total > 0 && <small className="opacity-70 tracking-widest">({total})</small>}
                </button>
              )}
            </div>
          </details>
          <details className="mb-3">
            <summary className="w-fit">Cechy</summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-3">
              {itemsFiltersList.map(({ value, total }) => 
                <button
                  onClick={() => toggleItem(value)}
                  className={itemFilters.includes(value) ? 'font-[800]' : ''}
                >
                  {value} <small className="opacity-70 tracking-widest">({total})</small>
                </button>
              )}
            </div>
          </details>
          <ul className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5" key={hashKey}>
            {units.map((unit) => (<ListItem key={unit.title} {...unit} />))}
          </ul>
        </>
    );
};

export default Heraldyka;
