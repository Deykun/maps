import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { MarkerParams } from '@/topic/Heraldry/types';

import {
  EMPTY_CUSTOM_FILTER,
  clearCustomFilter,
  useFiltersDevelopmentStore,
  setCustomFilter,
  toggleCustomFilterVisiblity,
  updateCustomFilterResultBasedOnData,
  showOnlyUnitsWithDescriptionInCustomFilter,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import useEffectChange from '@/hooks/useEffectChange';
import useOutsideClick from '@/hooks/useOutsideClick';

import IconCheck from '@/components/Icons/IconCheck';
import IconControls from '@/components/Icons/IconControls';
import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';
import IconSelectionChecked from '@/components/Icons/IconSelectionChecked';
import IconSelectionUnchecked from '@/components/Icons/IconSelectionUnchecked';
import IconEraser from '@/components/Icons/IconEraser';
import IconFlask from '@/components/Icons/IconFlask';
import IconLoader from '@/components/Icons/IconLoader';
import IconSelected from '@/components/Icons/IconSelected';
import IconSelectNew from '@/components/Icons/IconSelectNew';
import IconQuote from '@/components/Icons/IconQuote';

import Space from '@/components/UI/Space';
import Panel from '@/components/UI/Panel';
import SubPanel from '@/components/UI/SubPanel';

import ButtonIcon from '@/components/UI/ButtonIcon';

import { fetchTitlesAndDescriptions } from './DevelopmentPane/fetch';

import DevelopmentPaneSidebarCustomFilter from './DevelopmentPane/DevelopmentPaneSidebarCustomFilter';
import DevelopmentPaneSidebarListOfFilters from './DevelopmentPane/DevelopmentPaneSidebarListOfFilters';

type Props = {
  country: string,
  unitTypes: string[],
};

const DevelopmentPane = ({
  country,
  unitTypes,
}: Props) => {
  const [shouldReverseCustomFilter, setShouldReverseCustomFilter] = useState(false);
  const updateFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResultsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeMenu, setActiveMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);
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

  
  const [shouldShowOnlyValid, setShouldShowOnlyValid] = useState(false);

  const { t } = useTranslation();

  // Not the nicest solution, but it works
  useOutsideClick('#development-pane', () => {
    setActiveMenu('');
  });

  useEffect(() => {
    if (!isOpen || !isFiltersDevModeActive) {
      setActiveMenu('');
    }
  }, [isOpen, isFiltersDevModeActive]);
  
  const {
    isLoading,
    // isError,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchTitlesAndDescriptions({ country, unitTypes }),
    queryKey: ['dev', country],
    staleTime: 60 * 60 * 1000,
    enabled: window?.location?.href?.includes('localhost') || Boolean(activeMenu),
  });

  const toggleMenu = (name: string) => () => setActiveMenu((v) => v === name ? '' : name);

  const updateResults = useCallback(() => {
    if (!data) {
      return;
    }

    if (shouldShowOnlyValid) {
      showOnlyUnitsWithDescriptionInCustomFilter(data, { shouldReverse: shouldReverseCustomFilter });

      return;
    }

    updateCustomFilterResultBasedOnData(data, { shouldReverse: shouldReverseCustomFilter });
  }, [data, shouldShowOnlyValid, shouldReverseCustomFilter]);

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

  if (!isFiltersDevModeActive) {
    return (<Space side="left" isLast />);
  }

  const isProcessing = isLoading || (isCustomFilterActive && (updateFilterTimeoutRef.current || updateResultsTimeoutRef.current));

  return (
    <>
      <Space side="left" />
      <div className="relative pointer-events-auto" id="development-pane">
        <Panel className="ui-panel--rounded-r">
          <ButtonIcon
            onClick={() => setIsOpen(!isOpen)}
            isActive={isOpen}
            label="Custom filters"
            labelPosition="right"
          >
            <IconFlask />
            {isCustomFilterActive && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>}
          </ButtonIcon>
          {isOpen && <>
            <span className="border-t" />
            <ButtonIcon
              onClick={toggleMenu('filters')}
              isActive={activeMenu === 'filters'}
              label="App filters"
              labelPosition="right"
            >
              <IconSelected />
            </ButtonIcon>
            <ButtonIcon
              onClick={toggleMenu('customFilter')}
              isActive={activeMenu === 'customFilter'}
              isDisabled={shouldShowOnlyValid}
              label="Create your own filter"
              labelPosition="right"
            >
              <IconSelectNew />
            </ButtonIcon>
            <ButtonIcon
              onClick={() => setShouldShowOnlyValid(!shouldShowOnlyValid)}
              isActive={shouldShowOnlyValid}
              label="Show only those with text"
              labelPosition="right"
            >
              <IconQuote />
            </ButtonIcon>
            <ButtonIcon
              onClick={toggleMenu('settings')}
              isActive={activeMenu === 'settings'}
              label={t('heraldry.titleSettings')}
              labelPosition="right"
            >
              <IconControls />
              {shouldReverseCustomFilter && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
            </ButtonIcon>
            <ButtonIcon
                onClick={() => toggleCustomFilterVisiblity()}
                wrapperClassName="ml-auto"
                isActive={isCustomFilterActive}
                isDisabled={!draftFilter}
              >
              {isCustomFilterActive ? <IconSelectionChecked /> : <IconSelectionUnchecked />}
            </ButtonIcon>
          </>}
          {isCustomFilterActive && <>
            <span className="border-t" />
            <ButtonIcon
              onClick={resetCustomFilter}
              label={t('heraldry.clearFilters')}
              labelPosition="right"
            >
              <IconEraser />
            </ButtonIcon>
          </>}
          {isProcessing && <ButtonIcon tagName="span" isActive>
            <IconLoader />
          </ButtonIcon>}
        </Panel>
        {activeMenu === 'filters' &&
          <DevelopmentPaneSidebarListOfFilters
            country={country}
            setDraftFilter={setDraftFilter}
          />
        }
        {activeMenu === 'customFilter' &&
          <DevelopmentPaneSidebarCustomFilter
            draftFilter={draftFilter}
            setDraftFilter={setDraftFilter}
          />
        }
        {activeMenu === 'settings' && <SubPanel order={4} className="ui-slide-from-left-sidebar z-[-1] mt-1 absolute left-12 ml-3 flex-row">
        <ButtonIcon
          wrapperClassName="ml-auto"
          onClick={() => setShouldReverseCustomFilter(!shouldReverseCustomFilter)}
          label={`${t('heraldry.filterReverse')} ${t(`heraldry.filterReverse.${shouldReverseCustomFilter ? 'yes' : 'no'}`)}`}
          labelPosition="bottomRight"
        >
          {shouldReverseCustomFilter ? <IconEyeCrossed /> : <IconEye />}
          {shouldReverseCustomFilter && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft">!</span>}
        </ButtonIcon>
      </SubPanel>}
      </div>
      <Space side="left" isLast />
    </>
  );
}

export default DevelopmentPane;
