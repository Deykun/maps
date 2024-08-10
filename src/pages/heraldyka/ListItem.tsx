import './Heraldyka.scss';
import { colorsByNames, AdministrativeUnit } from './constants';

const ListItem = ({ title, url, imageUrl, colors, place, markers }: AdministrativeUnit) => {
    const colorClassName = "block size-5 rounded-[4px] shadow-md";

    return (
        <li className="shadow-md p-5 flex gap-4 items-center">
          {imageUrl && <img src={imageUrl} loading="lazy" className="size-20 object-contain" />}
          <div>
            <h3 className="text-[16px] font-[500] mb-2"><a href={url} target="_blank" title="Otwórz Wikipedię w nowej karcie">{title}</a></h3>
            {place?.name && <p className="text-[14px] text-[#4b4b4b] mb-2">{place?.name}</p>}
            {(markers?.animals?.length || 0) > 0 && <p className="text-[12px]">Zwierzęta: {markers?.animals?.join(', ')}</p>}
            {(markers?.items?.length || 0) > 0 && <p className="text-[12px]">Cechy: {markers?.items?.join(', ')}</p>}
            <div className="flex hidden items-center gap-2 text-[14px]">
              <h4>Wiodący:</h4>
              {colors?.primary?.color && <span className={colorClassName} style={{ backgroundColor: `${colors?.primary?.color}` }}></span>}
              <h4 className="ml-5">Paleta:</h4>
              {(colors?.palette || []).map((item) => (
                <span key={item.color} className={`${colorClassName} relative overflow-hidden`} style={{ backgroundColor: `${colorsByNames[item.name]}`}}>
                  <span className="absolute left-0 top-0 h-full w-1/2 block" style={{ backgroundColor: item.color }}></span>
                </span>
              ))}
            </div>
            {typeof place?.coordinates?.lon !== 'number' && <p className="text-[12px] text-[red] mt-2">Herb bez lokalizacji.</p>}
          </div>
        </li>
    );
};

export default ListItem;
