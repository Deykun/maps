import { useState, useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';

import { removeDiacratics } from '@/utils/text';

import { MarkerParams, MarkerParamsWithResult, AdministrativeUnitIndex } from '@/topic/Heraldry/types';
import { getHasMarker } from '@/topic/Heraldry/utils/markers/getMarker';

import IconEye from '@/components/Icons/IconEye';
import IconEyeCrossed from '@/components/Icons/IconEyeCrossed';
import IconFolderDownload from '@/components/Icons/IconFolderDownload';
import IconFolderUpload from '@/components/Icons/IconFolderUpload';
import IconSelectNew from '@/components/Icons/IconSelectNew';
import IconMarkerMinus from '@/components/Icons/IconMarkerMinus';
import IconMarkerPlus from '@/components/Icons/IconMarkerPlus';

import Pane from '@/components/UI/Pane';
import Button from '@/components/UI/Button';
import ButtonCircle from '@/components/UI/ButtonCircle';

import {
  toggleCustomFilterVisiblity,
  customFilterName,
  customFilterPhrases,
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';
import { fetchTitlesAndDescriptions } from './fetch';

type Props = {
  draftFilter: MarkerParamsWithResult,
  setDraftFilter: Dispatch<SetStateAction<MarkerParamsWithResult>>,
  activeCustomAction?: string,
  setActiveCustomAction: (action?: 'plus' | 'minus') => void,
};

const DevelopmentPaneCustomFilter = ({
  draftFilter,
  setDraftFilter,
  activeCustomAction,
  setActiveCustomAction,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const name = (event.target.name || '');
    const value = (event.target.value || '');

    if (name === 'name') {
      setDraftFilter(state => ({
        ...state,
        name: removeDiacratics(value).replaceAll(' ', '').replace(/[^a-zA-Z]+/g, ''),
      }));
    }

    if (name === 'phrases') {
      const phrases = Array.from(new Set(value.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

      setDraftFilter(state => ({
        ...state,
        phrases,
      }));
    }
  }, []);

  const isDisabled = isProcessing;

  return (
    <Pane className="fixed left-12 mt-3 w-[400px] max-h-[calc(100%_-_1.5rem)] overflow-auto top-0 ml-6">
      <h3 className="flex gap-3 items-center">
        <IconSelectNew className="size-5" />
        <span>
          Create a custom filter
        </span>
      </h3>
      <div className="sans text-[14px] flex flex-col gap-2">
          <input
            onChange={handleChange}
            name="name"
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='name (ex. "eagle", "apple")'
            defaultValue={draftFilter.name}
            disabled={isDisabled}
          />
          <input
            onChange={handleChange}
            name="phrases"
            className="sans w-full p-1 px-2 text-[14px] bg-white border"
            placeholder='phrases (ex. "eagle, eagles", "apple, apples")'
            defaultValue={draftFilter.phrases?.join(', ')}
            disabled={isDisabled}
          />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setActiveCustomAction(activeCustomAction === 'minus' ? undefined : 'minus')}
          isActive={activeCustomAction === 'minus'}
          isDisabled={(draftFilter?.phrases || []).length === 0}
        >
          <span>Exclude</span>
          <IconMarkerMinus />
        </Button>
        <Button
          onClick={() => setActiveCustomAction(activeCustomAction === 'plus' ? undefined : 'plus')}
          isActive={activeCustomAction === 'plus'}
          isDisabled={(draftFilter?.phrases || []).length === 0}
        >
          <span>Include</span>
          <IconMarkerPlus />
        </Button>
        <ButtonCircle
          onClick={() => toggleCustomFilterVisiblity()}
          wrapperClassName="ml-auto"
          isDisabled={isDisabled || !draftFilter}
        >
          {draftFilter?.isActive ? <IconEye /> : <IconEyeCrossed />}
        </ButtonCircle>
        <Button
          // onClick={applyFilter}
          wrapperClassName="ml-auto"
          isDisabled={isDisabled}
        >
          <span>Use</span>
          <IconSelectNew />
        </Button>
      </div>
      <div className="flex gap-2 mt-5">
        <Button
          onClick={() => {
            const value = localStorage.getItem('draft');

            if (value) {
              // setDraftFilter(JSON.parse(value));
            }
          }}
        >
          <span>Load</span>
          <IconFolderDownload />
        </Button>
        <Button
          onClick={() => localStorage.setItem('draft', JSON.stringify(draftFilter))}
        >
          <span>Save</span>
          <IconFolderUpload />
        </Button>
      </div>
      {draftFilter && <DevelopmentPaneSnippet {...draftFilter} />}
    </Pane>
  );
}

export default DevelopmentPaneCustomFilter;

// import IconFolderDownload from '@/components/Icons/IconFolderDownload';
// import IconFolderUpload from '@/components/Icons/IconFolderUpload';