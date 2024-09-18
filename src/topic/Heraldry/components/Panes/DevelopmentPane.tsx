import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { MarkerParams, MarkerParamsWithResult } from '@/topic/Heraldry/types';

import {
  EMPTY_CUSTOM_FILTER,
  clearCustomFilter,
  useFiltersDevelopmentStore,
  setCustomFilter,
  toggleCustomFilterVisiblity,
  updateCustomFilterResultBasedOnData,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import useEffectChange from '@/hooks/useEffectChange';
import useOutsideClick from '@/hooks/useOutsideClick';

import IconCheck from '@/components/Icons/IconCheck';
import IconSelectionChecked from '@/components/Icons/IconSelectionChecked';
import IconSelectionUnchecked from '@/components/Icons/IconSelectionUnchecked';
import IconEraser from '@/components/Icons/IconEraser';
import IconFlask from '@/components/Icons/IconFlask';
import IconLoader from '@/components/Icons/IconLoader';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Pane from '@/components/UI/Pane';
import ButtonCircle from '@/components/UI/ButtonCircle';

import DevelopmentPaneAppFilters from './DevelopmentPane/DevelopmentPaneAppFilters';
import DevelopmentPaneCustomFilter from './DevelopmentPane/DevelopmentPaneCustomFilter';

import { fetchTitlesAndDescriptions } from './DevelopmentPane/fetch';

type Props = {
  country: string,
  unitTypes: string[],
  customFilter?: MarkerParamsWithResult,
  setCustomFilter: (filter?: MarkerParamsWithResult) => void
  unitNameForAction: string,
};

const DevelopmentPane = ({
  country,
  unitTypes,
}: Props) => {
  const updateFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResultsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isFiltersDevelopmentModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
  const isCustomFilterActive = useFiltersDevelopmentStore((state) => state.filter.isActive);
  const filterName = useFiltersDevelopmentStore((state) => state.filter.name);
  const filterPhrases = useFiltersDevelopmentStore((state) => state.filter.phrases);
  const filterInclude = useFiltersDevelopmentStore((state) => state.filter.include);
  const filterExclude = useFiltersDevelopmentStore((state) => state.filter.exclude);
  const [draftFilter, setDraftFilter] = useState<MarkerParams>({
    name: filterName,
    phrases: filterPhrases,
    include: filterInclude,
    exclude: filterExclude,
  });

  const { t } = useTranslation();

  // Not the nicest solution, but it works
  useOutsideClick('#development-pane', () => {
    setActiveMenu('');
  });

  useEffect(() => {
    if (!isOpen || !isFiltersDevelopmentModeActive) {
      setActiveMenu('');
    }
  }, [isOpen, isFiltersDevelopmentModeActive]);
  
  const {
    isLoading,
    // isError,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchTitlesAndDescriptions({ country, unitTypes }),
    queryKey: ['dev', country],
    staleTime: 60 * 60 * 1000,
    enabled: Boolean(activeMenu),
  });

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name);

  const updateResults = useCallback(() => {
    if (!data) {
      return;
    }

    updateCustomFilterResultBasedOnData(data);
  }, [data]);

  useEffectChange(() => {
    const wasIncludeAndExcludeUpdated = JSON.stringify({ filterInclude }) !== JSON.stringify(({ filterInclude: draftFilter.include })) ||
      JSON.stringify({ filterExclude }) !== JSON.stringify(({ filterExclude: draftFilter.exclude }));

    if (wasIncludeAndExcludeUpdated) {
      setDraftFilter((previous) => {
        return {
          ...previous,
          include: filterInclude,
          exclude: filterExclude,
        };
      });
    }
  }, [filterExclude, filterInclude]);

  useEffectChange(() => {
    if (updateFilterTimeoutRef.current) {
      clearTimeout(updateFilterTimeoutRef.current);
      updateFilterTimeoutRef.current = null;
    }

    updateFilterTimeoutRef.current = setTimeout(() => {
      setCustomFilter(draftFilter);
      updateResults();

      if (updateFilterTimeoutRef.current) {
        clearTimeout(updateFilterTimeoutRef.current);
        updateFilterTimeoutRef.current = null;
      }
    }, 2000);
  }, [draftFilter]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!isCustomFilterActive) {
      return;
    }

    if (updateResultsTimeoutRef.current) {
      clearTimeout(updateResultsTimeoutRef.current);
      updateResultsTimeoutRef.current = null;
    }

    updateResultsTimeoutRef.current = setTimeout(() => {
      updateResults()

      if (updateResultsTimeoutRef.current) {
        clearTimeout(updateResultsTimeoutRef.current);
        updateResultsTimeoutRef.current = null;
      }
    }, 300);
  }, [data, updateResults, filterExclude, filterInclude, isCustomFilterActive]);

  const resetCustomFilter = () => {
    clearCustomFilter();
    setDraftFilter({
      ...EMPTY_CUSTOM_FILTER,
    });
  }

  if (!isFiltersDevelopmentModeActive) {
    return null;
  }

  const isProcessing = isLoading || (isCustomFilterActive && (updateFilterTimeoutRef.current || updateResultsTimeoutRef.current));

  return (
    <div className="relative pointer-events-auto" id="development-pane">
      <Pane>
        <ButtonCircle
          onClick={() => setIsOpen(!isOpen)}
          isActive={isOpen}
          label="Custom filters"
          labelPosition="right"
        >
          <IconFlask />
          {isCustomFilterActive && <span className="ui-button-circle-marker !px-[3px]"><IconCheck className="h-[10px]" /></span>}
        </ButtonCircle>
        {isOpen && <>
          <span className="border-t" />
          <ButtonCircle
            onClick={toggleMenu('filters')}
            isActive={activeMenu === 'filters'}
            label="App filters"
            labelPosition="right"
          >
            <IconSelected />
          </ButtonCircle>
          <ButtonCircle
            onClick={toggleMenu('customFilter')}
            isActive={activeMenu === 'customFilter'}
            label="Create your own filter"
            labelPosition="right"
          >
            <IconSelectNew />
          </ButtonCircle>
          <ButtonCircle
              onClick={() => toggleCustomFilterVisiblity()}
              wrapperClassName="ml-auto"
              isActive={isCustomFilterActive}
              isDisabled={!draftFilter}
            >
            {isCustomFilterActive ? <IconSelectionChecked /> : <IconSelectionUnchecked />}
          </ButtonCircle>
        </>}
        {isCustomFilterActive && <>
          <span className="border-t" />
          <ButtonCircle
            onClick={resetCustomFilter}
            label={t('heraldry.clearFilters')}
            labelPosition="right"
          >
            <IconEraser />
          </ButtonCircle>
        </>}
        {isProcessing && <ButtonCircle tagName="span" isActive>
          <IconLoader />
        </ButtonCircle>}
      </Pane>
      {activeMenu === 'filters' &&
        <DevelopmentPaneAppFilters
          country={country}
          setDraftFilter={setDraftFilter}
        />
      }
      {activeMenu === 'customFilter' &&
        <DevelopmentPaneCustomFilter
          draftFilter={draftFilter}
          setDraftFilter={setDraftFilter}
        />
      }
    </div>
  );
}

export default DevelopmentPane;
