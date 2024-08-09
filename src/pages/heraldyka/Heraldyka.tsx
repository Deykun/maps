import { useState, useMemo, useCallback } from 'react';
// import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import './Heraldyka.scss';
import { colorsByNames, AdministrativeUnit } from './constants';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);

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

const animalsByName = allUnits.reduce((stack: {
  [animal: string]: number,
}, unit) => {
  (unit?.markers?.animals || []).forEach((animal) => {
    if (stack[animal]) {
      stack[animal] = stack[animal] + 1;
    } else {
      stack[animal] = 1;
    }
  })

  return stack;
}, {});

const animalFilters = Object.entries(animalsByName).map(
  ([value, total]) => ({ value, total }),
).filter(
  ({ total }) => total >= 5,
).sort((a, b) => b.total - a.total);

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
    const [animalFilter, setAnimalFilter] = useState<string>('');

    const { units, unitsWithLocation } = useMemo(() => {
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
            const isActive = animalFilter !== '';
            if (!isActive) {
              return true;
            }

            const hasAnimal = Array.isArray(unit?.markers?.animals)
              && unit.markers.animals.length > 0
              && unit.markers.animals.includes(animalFilter);

            if (hasAnimal) {
              return true;
            }

            return false;
          }
        );

        const unitsWithLocation = filteredUnits.filter(
          (unit) => typeof unit?.place?.coordinates?.lon === 'number',
        );

        return {
          units: filteredUnits,
          unitsWithLocation,
        }
    }, [colorFilters, animalFilter]);

    const toggleColor = useCallback((color: string) => {
        if (colorFilters.includes(color)) {
            setColorFilters(colorFilters.filter((filterColor) => filterColor !== color));
        } else {
            setColorFilters([...colorFilters, color]);
        }
    }, [colorFilters]);

    // We have 2000 nodes and Reacts sometimes doesn't remove them, this force rerender of the parent
    const hashKey = `hash-${animalFilter}-${colorFilters.join('-')}`;

    return (
        <>
          <h1 className="text-[22px] md:text-[48px] text-center mb-4">Herby polskich miast i gmin</h1>
          <h2 className="text-[18px] text-center mb-6 opacity-70">
            {animalFilter && <>Powiązane z: {animalFilter}</>}
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
              po odfiltrowaniu <strong>{units.length}</strong>
              {' '}
              na mapię <strong>{unitsWithLocation.length}</strong>.
          </p>
          <h3 className="mb-3 text-[24px]">Filtry:</h3>
          <details className="mb-3">
            <summary className="w-fit">Zwierzęta</summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mb-5">
              {animalFilters.map(({ value, total }) => 
                <button
                  onClick={() => setAnimalFilter(animalFilter === value ? '' : value)}
                  className={animalFilter === value ? 'font-[800]' : ''}
                >
                  {value} <small className="opacity-70 tracking-widest">({total})</small>
                </button>
              )}
            </div>
          </details>
          <div className="flex items-center gap-5 mb-5">
            {Object.entries(colorsByNames).map(([name, color]) => <button
              key={name}
              className="block size-5 rounded-[4px] shadow-md"
              onClick={() => toggleColor(name)}
              style={{ backgroundColor: color }}
            >
              {colorFilters.includes(name) ? 'a' : ''}
            </button>)}
          </div>
          <ul className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5" key={hashKey}>
            {units.map((unit) => (<ListItem key={unit.title} {...unit} />))}
          </ul>
        </>
    );
};

export default Heraldyka;
