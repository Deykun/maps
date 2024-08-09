import { useState, useMemo, useCallback } from 'react';
import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import ListItem from './ListItem';
import './Heraldyka.scss';
import { colorsByNames } from './constants';

import gminy  from './gminy-images.json'

console.log(gminy);

// Lat-long coorditates for cities in Poland are in range: Latitude from 49.29899 to 54.79086 and longitude from 14.24712 to 23.89251.

// https://pl.wikipedia.org/wiki/Geografia_Polski

const maxTop = 54.8;
const maxBottom = 49;
const maxLeft = 14.3;
const maxRight = 22.08;

const getPostionForPlace = (unit) => {
    const left = `${(unit?.place?.coordinates?.lon - maxLeft) / (maxRight - maxLeft) * 100}%`;
    const top = `${(unit?.place?.coordinates?.lat - maxTop) / (maxBottom - maxTop) * 100}%`;

    return {
        left,
        top,
    }
}

const Heraldyka = () => {
    const [colorFilters, setColorFilters] = useState<string[]>([]);

    const units = useMemo(() => {
        return Object.values(gminy).filter((unit) => colorFilters.length === 0 || colorFilters.includes(unit.colors.primary.name) || unit.colors.palette.some(({ name }) => {
            return colorFilters.includes(name);
        }));
    }, [colorFilters]);

    const toggleColor = useCallback((color: string) => {
        if (colorFilters.includes(color)) {
            setColorFilters(colorFilters.filter((filterColor) => filterColor !== color));
        } else {
            setColorFilters([...colorFilters, color]);
        }
    }, [colorFilters]);

    console.log(colorFilters);

    return (
        <>
          <h1 className="text-[48px] text-center mb-20">Herby polskich miast i powiatów</h1>
          <div className="relative mb-10">
            <SvgGmina />
            {/* <div className="max-w-[400px]">
              <SvgPowiaty />
            </div> */}
                      {Object.values(gminy).map((unit) => {
            return (<span key={unit.title} className="absolute" style={getPostionForPlace(unit)}>
              <img src={unit?.imageUrl} loading="lazy" className="size-5 hover:scale-150 object-contain opacity-50" title={unit.title} />
            </span>)
            })}

            <span className="absolute top-[50%] left-[40%]">
              <img src="images/heraldyka/gminy/herb-opatowka.png" className="size-10 hover:scale-150 object-contain" title="Herb Opatówka" />
            </span>
            <span className="absolute top-[47%] left-[4%]">
            <img src="images/heraldyka/gminy/herb-gminy-gubin.jpg" loading="lazy" className="size-10 hover:scale-150 object-contain" title="Herb gminy Gubin" />
            </span>
          </div>
          <h2 className="mb-5">
              Widoczne {units.length}
          </h2>
          <div className="flex items-center gap-5 mb-5">
            <h3>Filters:</h3>
            {Object.entries(colorsByNames).map(([name, color]) => <button
              key={name}
              className="block size-5 rounded-[4px] shadow-md"
              onClick={() => toggleColor(name)}
              style={{ backgroundColor: color }}
            >
              {colorFilters.includes(name) ? 'a' : ''}
            </button>)}
          </div>
          <ul className="flex flex-col gap-5">
            {units.map((unit) => (<ListItem key={unit.title} {...unit} />))}
          </ul>
        </>
    );
};

export default Heraldyka;
