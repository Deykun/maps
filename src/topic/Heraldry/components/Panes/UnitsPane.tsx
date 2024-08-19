import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { removeDiacratics } from '@/utils/text';

import IconShieldCheck from '@/components/Icons/IconShieldCheck';
import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';
import { AdministrativeUnit } from '@/topic/Heraldry/types';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {
  children?: React.ReactNode,
  units?: AdministrativeUnit[],
  phrase?: string,
  shouldShowCount?: boolean,
}

const UnitsPane = ({ 
  units = [],
  children,
  phrase = '',
  shouldShowCount = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterPhrase, setFilterPhrase] = useState(phrase);
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [filterPage, setFilterPage] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (units.length === 0) {
      setIsOpen(false);
      setFilterPhrase('');

      return;
    }
    
    setFilterPhrase(phrase);
  }, [units, phrase]);

  useEffect(() => {
    if (filterPhrase === '') {
      setFilteredUnits(units);

      return;
    }

    const listPhraseNormalized = removeDiacratics(filterPhrase.toLowerCase());

    const filteredUnits = units.filter((unit) => {
      const text = `${unit.title} ${unit?.place?.name || ''}`.toLowerCase();
      const indexText = removeDiacratics(text);

      return indexText.includes(listPhraseNormalized);
    });

    setFilteredUnits(filteredUnits);
  }, [units, filterPhrase]);

  if (units.length === 0) {
    return null;
  }

  const itemsToShow = 3 + 10 * filterPage;

  return (
    <>
      <Pane>
        <ButtonCircle
          isDisabled={units.length === 0}
          isActive={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
            {children ? children : <IconShieldCheckers />}
            {shouldShowCount && phrase === filterPhrase && filteredUnits.length > 0 && <span className="ui-button-circle-marker">{filteredUnits.length}</span>}
        </ButtonCircle>
      </Pane>
      {isOpen && <Pane className="absolute right-full w-[300px] top-0 mr-2">
        <div>
          <label>{t('heraldry.list.limitListTo')}</label>
          {/* {' '} */}
          <br />
          <input
            value={filterPhrase}
            onChange={(e) => setFilterPhrase(e.target.value || '')}
            className="border-[#dbd7d7] w-[140px] outline-offset-2 px-2"
            placeholder={t('heraldry.list.limitListToPlaceholder')}
          />
        </div>
        <div className="max-h-[300px] overflow-auto">
          <ul className="flex flex-col gap-3">
            {filteredUnits.slice(0, itemsToShow).map(({ id, title, url, imageUrl, imageSrcSet }) => (
              <li key={id} className="flex gap-2 items-center">
                <img
                  src={imageUrl}
                  srcSet={imageSrcSet}
                  className="size-10 object-contain p-1 rounded-md bg-white border"
                  alt=""
                  loading="lazy"
                />
                <a href={url} target="_blank" className="text-[14px] font-[500] tracking-wider line-clamp-1">
                  {title}
                </a>
              </li>
            ))}
          </ul>
          {filteredUnits.length > itemsToShow && <div className="mt-5 text-center">
            <button onClick={() => setFilterPage(filterPage + 1)}>
              {t('heraldry.list.showMore')}
            </button>
          </div>}
        </div>
      </Pane>}
    </>
  );
}

export default UnitsPane;
