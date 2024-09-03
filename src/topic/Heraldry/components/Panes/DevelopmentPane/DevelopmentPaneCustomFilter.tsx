import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

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

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type FetchParmas = {
  country: string,
  unitTypes: string[],
}

const fetchData = async ({ country, unitTypes }: FetchParmas) => {
  const devData = await Promise.all(
    unitTypes.map((unit) => fetch(`/maps/data/heraldry/${country}/${unit}-dev.json`).then((response) => response.json()).then(
      (byKey) => Object.values(byKey) as AdministrativeUnitIndex[])
    ),
  );

  return devData.flatMap((unit) => unit);
};

type Props = FetchParmas & {
  customFilter?: MarkerParamsWithResult,
  setCustomFilter: (filter?: MarkerParamsWithResult) => void,
  activeCustomAction?: string,
  setActiveCustomAction: (action?: 'plus' | 'minus') => void,
};

const DevelopmentPaneCustomFilter = ({
  country,
  unitTypes,
  customFilter,
  setCustomFilter,
  activeCustomAction,
  setActiveCustomAction,
}: Props) => {
  const [processingStatus, setProcessingStatus] = useState<string | undefined>(undefined);
  const [draftFilter, setDraftFilter] = useState<MarkerParams>({
    name: customFilter?.name || '',
    phrases: customFilter?.phrases || [],
    include: customFilter?.include || [],
    exclude: customFilter?.exclude || [],
  });

  const { t } = useTranslation();

  const {
    isLoading,
    // isError,
    // error,
    data,
  } = useQuery({
    queryFn: () => fetchData({ country, unitTypes }),
    queryKey: ['dev', country],
    staleTime: 60 * 60 * 1000,
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const name = (event.target.name || '');
    const value = (event.target.value || '');

    if (name === 'name') {
      setDraftFilter(prev => ({
        ...prev, 
        name: removeDiacratics(value).replaceAll(' ', '').replace(/[^a-zA-Z]+/g, ''),
      }));
    }

    if (name === 'phrases') {
      const phrases = Array.from(new Set(value.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean))).sort((a, b) => a.localeCompare(b));

      setDraftFilter(prev => ({
        ...prev, 
        phrases,
      }));
    }
  }, []);

  const applyFilter = () => {
    setProcessingStatus('fetching...')

    if (!data) {
      return;
    }

    const filteredUnits = data.filter(({ title, description }) => getHasMarker(
      {
        title,
        text: description,
      }, {
        phrases: draftFilter.phrases,
        include: draftFilter.include,
        exclude: draftFilter.exclude,
      },
    ));

    setProcessingStatus(undefined);

    if ((draftFilter.phrases?.length || 0) === 0) {
      setCustomFilter();

      return;
    }

    setCustomFilter({
      ...draftFilter,
      isActive: true,
      result: filteredUnits ? filteredUnits.map(({ id }) => id) : undefined,
    });
  }

  const isDisabled = isLoading || Boolean(processingStatus);

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
          isDisabled={(customFilter?.phrases || []).length === 0}
        >
          <span>Exclude</span>
          <IconMarkerMinus />
        </Button>
        <Button
          onClick={() => setActiveCustomAction(activeCustomAction === 'plus' ? undefined : 'plus')}
          isActive={activeCustomAction === 'plus'}
          isDisabled={(customFilter?.phrases || []).length === 0}
        >
          <span>Include</span>
          <IconMarkerPlus />
        </Button>
        <ButtonCircle
          onClick={() => customFilter ? setCustomFilter({ ...customFilter, isActive: !customFilter.isActive }) : {}}
          wrapperClassName="ml-auto"
          isDisabled={isDisabled || !customFilter}
        >
          {customFilter?.isActive ? <IconEye /> : <IconEyeCrossed />}
        </ButtonCircle>
        <Button
          onClick={applyFilter}
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
              setDraftFilter(JSON.parse(value));
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