import { useState, useMemo, useCallback } from 'react';
// import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import './Heraldyka.scss';
import { colorsByNames } from './constants';

import gminyJSON from './gminy-images.json'
import miastaJSON from './miasta-images.json'

const gminy = Object.values(gminyJSON);
const miasta = Object.values(miastaJSON);

const allUnits = [...gminy, ...miasta].filter(({ title }) => title !== 'Herb Podgórza');

// Lat-long coorditates for cities in Poland are in range: Latitude from 49.29899 to 54.79086 and longitude from 14.24712 to 23.89251.

// https://pl.wikipedia.org/wiki/Geografia_Polski

// const minLeft = -12;
const minTop = 0;
// const maxTop = 54.8;
const maxTop = 54.9;
const maxBottom = 48.85;

const maxLeft = 14.17;
const maxRight = 24.39;

const polandWidth = maxRight - maxLeft;

const getPostionForPlace = (unit) => {
    const left = `${((unit?.place?.coordinates?.lon - maxLeft) / polandWidth * 100)}%`;
    const top = `${minTop + ((unit?.place?.coordinates?.lat - maxTop) / (maxBottom - maxTop) * 100)}%`;

    return {
        left,
        top,
    }
}

const Heraldyka = () => {
    const [colorFilters, setColorFilters] = useState<string[]>([]);

    const units = useMemo(() => {
      // miasta
        return allUnits.filter((unit) => colorFilters.length === 0 || colorFilters.includes(unit.colors.primary.name) || unit.colors.palette.some(({ name }) => {
            return colorFilters.includes(name);
        }));
    }, [colorFilters]);

    console.log(units.filter((unit) => typeof unit?.place?.coordinates?.lon === 'number').length)

    const toggleColor = useCallback((color: string) => {
        if (colorFilters.includes(color)) {
            setColorFilters(colorFilters.filter((filterColor) => filterColor !== color));
        } else {
            setColorFilters([...colorFilters, color]);
        }
    }, [colorFilters]);

    // console.log(colorFilters);

    const unitsWithLocation = units.filter(
      (unit) => typeof unit?.place?.coordinates?.lon === 'number',
    );

    return (
        <>
          <h1 className="text-[48px] text-center mb-20">Herby polskich gmin i miast</h1>
          <div className="relative mb-10 max-h-[70vh] aspect-[820_/_775] mx-auto flex justify-center items-center">
            {/* <SvgGmina /> */}
            <SvgPowiaty />
            <div>
              {unitsWithLocation.filter(
                (unit) => typeof unit?.place?.coordinates?.lon === 'number',
              ).map(
                  (unit) => (
                    <span
                      key={unit.title}
                      className="absolute hover:z-10"
                      style={getPostionForPlace(unit)}
                      data-lon={unit?.place?.coordinates?.lon}
                      data-lat={unit?.place?.coordinates?.lat}
                      data-width={polandWidth}
                    >
                      <img src={unit?.imageUrl}
                        loading="lazy"
                        className="size-2 sm:size-3 md:size-4 lg:size-5 scale-100 hover:scale-[800%] ease-in duration-100 object-contain"
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
          <div className="flex items-center gap-5 mb-5">
            <h3>Filtry:</h3>
            {Object.entries(colorsByNames).map(([name, color]) => <button
              key={name}
              className="block size-5 rounded-[4px] shadow-md"
              onClick={() => toggleColor(name)}
              style={{ backgroundColor: color }}
            >
              {colorFilters.includes(name) ? 'a' : ''}
            </button>)}
          </div>
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {units.map((unit) => (<ListItem key={unit.title} {...unit} />))}
          </ul>
        </>
    );
};

export default Heraldyka;
