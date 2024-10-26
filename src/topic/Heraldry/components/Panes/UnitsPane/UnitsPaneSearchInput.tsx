import { memo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useEffectChange from '@/hooks/useEffectChange';

import useUnitsPaneStore, { setUnitsPaneSearchPhrase } from '@/topic/Heraldry/stores/unitsPaneStore';

const UnitsPaneSearchInput = () => {
  const searchPhrase = useUnitsPaneStore(state => state.searchPhrase);
  const updateFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inputValue, setInputValue] = useState(searchPhrase);

  const { t } = useTranslation();

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    if (searchPhrase !== inputValue) {
      updateFilterTimeoutRef.current = setTimeout(() => {
        setUnitsPaneSearchPhrase(inputValue);

        if (updateFilterTimeoutRef.current) {
          clearTimeout(updateFilterTimeoutRef.current);
          updateFilterTimeoutRef.current = null;
        }
      }, 500);
    }
  }, [inputValue]);

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    setInputValue(searchPhrase);
  }, [searchPhrase])

  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value || '')}
      className={clsx('block w-full bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-full py-2 px-4')}
      placeholder={t('heraldry.list.limitListToPlaceholder')}
  />
  );
}

export default memo(UnitsPaneSearchInput);
