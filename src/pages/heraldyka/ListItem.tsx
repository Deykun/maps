import SvgGmina from './SvgGmina';
import SvgPowiaty from './SvgPowiaty';
import './Heraldyka.scss';
import { colorsByNames, AdministrativeUnit } from './constants';


const ListItem = ({ title, imageUrl, colors, place }: AdministrativeUnit) => {
    const colorClassName = "block size-5 rounded-[4px] shadow-md";

    return (
        <li className="shadow-md p-5 flex gap-2 items-center">
          {imageUrl && <img src={imageUrl} loading="lazy" className="size-20 object-contain" />}
          <div>
            <h3 className="text-[20px] font-[500]">{title}</h3>
            {place?.name && <p className="text-[14px] opacity-70">{place?.name}</p>}
            <div className="flex items-center gap-2 mt-2 text-[14px]">
              <h4>Wiodący:</h4>
              {colors?.primary?.color && <span className={colorClassName} style={{ backgroundColor: `${colors?.primary?.color}` }}></span>}
              <h4>Paleta:</h4>
              {(colors?.palette || []).map((item) => (
                <span key={item.color} className={`${colorClassName} relative overflow-hidden`} style={{ backgroundColor: `${colorsByNames[item.name]}`}}>
                  <span className="absolute left-0 top-0 h-full w-1/2 block" style={{ backgroundColor: item.color }}></span>
                </span>
              ))}
            </div>
          </div>
        </li>
    );
};

export default ListItem;
