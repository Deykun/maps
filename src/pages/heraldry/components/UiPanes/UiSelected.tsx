import { useState, useEffect } from 'react';

import IconShieldCheck from '@/components/Icons/IconShieldCheck';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import UiButton from '../UiButton';

type Props = {
  selected?: AdministrativeUnit[],
}

const UiSelected = ({ selected = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [selected])

  return (
    <div className="heraldry-ui-pane pointer-events-auto">
      <UiButton
        isDisabled={selected.length === 0}
        isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
          <IconShieldCheck />
          {selected.length > 0 && <span className="heraldry-ui-button-marker">{selected.length}</span>}
      </UiButton>
      {isOpen && <div className="heraldry-ui-pane absolute right-full max-h-[300px] w-[300px] overflow-auto top-0 mr-2">
        <ul className="flex flex-col gap-3">
          {selected.map(({ id, title, url, imageUrl, imageSrcSet }) => (
            <li key={id} className="flex gap-2 items-center">
              <img
                src={imageUrl}
                srcSet={imageSrcSet}
                className="size-10 object-contain"
                loading="lazy"
              />
              <a href={url} target="_blank" className="text-[14px] font-[500] tracking-wider line-clamp-1">
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
}

export default UiSelected;
