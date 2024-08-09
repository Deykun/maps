import SvgGmina from './SvgGmina';
import './Heraldyka.scss';
import { colorsByNames } from './constants';

import gminy  from './gminy-images.json'

console.log(gminy);

const Heraldyka = () => {
  return (
      <>
        <h1 className="text-[48px] text-center mb-20">Herby polskich miast i powiatów</h1>
        <div>
          <div className="max-w-[400px]">
            <SvgGmina />
          </div>
          <ul className="grid grid-cols-5">
            
            {Object.values(gminy).map((unit) => {

              return (<li>
                <h3>{unit.title}</h3>
                <p>{JSON.stringify(unit?.place)}</p>
                <img src={unit?.imageUrl} loading="lazy" className="size-20 object-contain" />

                  <span className="block size-5" style={{ backgroundColor: `${unit?.colors?.primary?.color}` }}>x</span>

                  Paleta:
                <div className="flex gap-5">s
                  <span className="block size-5" style={{ backgroundColor: `${colorsByNames[unit?.colors?.primary?.name]}`}}>?</span>
                  {unit?.colors?.palette?.map(({ color, name } = {}) => (
                                  <span className="block size-5" style={{ backgroundColor: `${colorsByNames[name]}`}}>?</span>
                  ))}
                </div>
              </li>)
            })}
          
          </ul>
        </div>
      </>
  );
};

export default Heraldyka;
