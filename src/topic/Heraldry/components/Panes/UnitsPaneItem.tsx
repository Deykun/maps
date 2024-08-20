import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import IconMarker from '@/components/Icons/IconMarker';
import IconLink from '@/components/Icons/IconLink';

type Props = {
  className?: string,
  unit: AdministrativeUnit,
}

const UnitsPaneItem = ( { className, unit }: Props) => {
  const { id, title, url, imagesList, imageSrcSet, place, markers } = unit;  
  
  const { t } = useTranslation();

  const markersList = [
    ...(markers?.animals || []).map((v) => t(`heraldry.animal.${v}`)),
    ...(markers?.items || []).map((v) => t(`heraldry.item.${v}`)),
  ];

  const focusCoat = () => {
    document.getElementById(`coat-${id}`)?.focus();
  }

  return (
    <li className={clsx('flex gap-2 items-center', { [className || '']: className })}>
      <span className="relative size-20 flex-shrink-0">
        <img
          src={imagesList?.[0].path}
          srcSet={imageSrcSet}
          className="size-20 object-contain p-2 rounded-t-[4px] rounded-b-[30px] bg-white border"
          alt=""
          loading="lazy"
        />      
        <button
          className="absolute bottom-0 right-0 bg-white fill-[#205dbd] p-1 rounded-full shadow-md"
          onClick={focusCoat}
        >
          <IconMarker className="size-4" />
        </button>
      </span>
      <span>
        <a href={url} target="_blank" className="text-[14px] font-[500] tracking-wide line-clamp-2 text-[#312f2f] hover:text-black duration-300">
          <span>{title}</span>
          {' '}
          <IconLink className="inline-block size-3" /> 
        </a>
        {markersList.length > 0 && <p className="sans mt-[2px] text-[10px] tracking-wider opacity-70">{markersList.join(', ')}</p>}
        <p className={clsx('sans mt-[2px] text-[10px] tracking-wider line-clamp-1', {
          'opacity-70': className,
          'text-[#ca1a1a]': !place?.name
        })}>
          {' '}
          {place?.name || t('heraldry.item.noLocation')}
        </p>
      </span>
    </li>
  );
};

export default UnitsPaneItem;
