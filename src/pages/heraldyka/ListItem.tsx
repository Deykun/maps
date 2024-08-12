import './Heraldyka.scss';
import { useTranslation } from 'react-i18next';
import { AdministrativeUnit } from './constants';

const ListItem = ({ title, url, imageUrl, colors, place, markers }: AdministrativeUnit) => {
    const { t } = useTranslation();

    return (
        <li className="border p-5 flex gap-4 items-center">
          {imageUrl && <img src={imageUrl} loading="lazy" className="size-20 lg:size-[130px] object-contain" />}
          <div>
            <h3 className="text-[16px] font-[500] hover:text-[#21468c] mb-1"><a href={url} target="_blank" title="Otwórz Wikipedię w nowej karcie">{title}</a></h3>
            {place?.name && <p className="text-[12px] text-[#4b4b4b] mb-1">{place.name}</p>}
            {(markers?.animals || []).length > 0 && <p className="text-[12px]">
              {t("heraldry.animal.filterTitle")}: {(markers?.animals || []).map(value => t(`heraldry.animal.${value}`)).join(', ')}
            </p>}
            {(markers?.items || []).length > 0 && <p className="text-[12px]">
              {t("heraldry.item.filterTitle")}: {(markers?.items || []).map(value => t(`heraldry.item.${value}`)).join(', ')}
            </p>}
          </div>
        </li>
    );
};

export default ListItem;
