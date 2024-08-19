import { useTranslation } from 'react-i18next';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

type Props = {
  unit: AdministrativeUnit,
}

const UnitsPaneItem = ( { unit }: Props) => {
  const { title, url, imagesList, imageSrcSet, place, markers } = unit;  
  
  const { t } = useTranslation();

  const markersList = [
    ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
    ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  ];

  // {(markers?.animals || []).length > 0 && (markers?.animals || []).map(value => t(`heraldry.animal.${value}`)).join(', ')}
  // {(markers?.items || []).length > 0 && <p className="text-[12px]">
  //   {{(markers?.items || []).map(value => t(`heraldry.item.${value}`)).join(', ')}
  // }

  return (
    <li className="flex gap-2 items-center">
      <span className="size-20 flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-20 object-contain p-2 rounded-md bg-white border"
          alt=""
          loading="lazy"
        />
      </span>
      <span>
        <a href={url} target="_blank" className="text-[12px] leading-[16px] font-[500] tracking-wider line-clamp-2">
          {title}
        </a>
        {markersList.length > 0 && <p className="ubuntu mt-1 text-[12px] tracking-wider opacity-70">{markersList.join(', ')}</p>}
      </span>
    </li>
  );
};

export default UnitsPaneItem;
