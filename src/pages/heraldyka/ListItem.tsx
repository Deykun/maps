import './Heraldyka.scss';
import { useTranslation } from 'react-i18next';
import { colorsByNames, AdministrativeUnit } from './constants';

const ListItem = ({ title, url, imageUrl, colors, place, markers }: AdministrativeUnit) => {
    const colorClassName = "block size-5 rounded-[4px] shadow-md";

    const { t } = useTranslation();

    return (
        <li className="border p-5 flex gap-4 items-center">
          {imageUrl && <img src={imageUrl} loading="lazy" className="size-20 object-contain" />}
          <div>
            <h3 className="text-[16px] font-[500] mb-2"><a href={url} target="_blank" title="Otwórz Wikipedię w nowej karcie">{title}</a></h3>
            {place?.name && <p className="text-[14px] text-[#4b4b4b] mb-2">{place?.name}</p>}
            {(markers?.animals || []).length > 0 && <p className="text-[12px]">
              {t("heraldry.animal.filterTitle")}: {(markers?.animals || []).map(value => t(`heraldry.animal.${value}`)).join(', ')}
            </p>}
            {(markers?.items || []).length > 0 && <p className="text-[12px]">
              {t("heraldry.item.filterTitle")}: {(markers?.items || []).map(value => t(`heraldry.item.${value}`)).join(', ')}
            </p>}
            <div className="hidden items-center gap-2 text-[14px]">
              <h4>Primary:</h4>
              {colors?.primary?.color && <span className={colorClassName} style={{ backgroundColor: `${colors?.primary?.color}` }}></span>}
              <h4 className="ml-5">Palette:</h4>
              {(colors?.palette || []).map((item) => (
                <span key={item.color} className={`${colorClassName} relative overflow-hidden`} style={{ backgroundColor: `${colorsByNames[item.name]}`}}>
                  <span className="absolute left-0 top-0 h-full w-1/2 block" style={{ backgroundColor: item.color }}></span>
                </span>
              ))}
            </div>
            {typeof place?.coordinates?.lon !== 'number' && <p className="text-[12px] text-[#ca1a1a] mt-2">Herb bez lokalizacji.</p>}
          </div>
        </li>
    );
};

export default ListItem;
