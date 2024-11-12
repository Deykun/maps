import { memo, useCallback, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import IconCopy from '@/components/Icons/IconCopy';
import IconFolderDownload from '@/components/Icons/IconFolderDownload';
import IconFolderUpload from '@/components/Icons/IconFolderUpload';
import IconSelectNew from '@/components/Icons/IconSelectNew';

import Space from '@/components/UI/Space';
import Panel from '@/components/UI/Panel';
import ButtonText from '@/components/UI/ButtonText';

import { removeDiacratics, copyText } from '@/utils/text';

import { MarkerParamsWithResult } from '@/topic/Heraldry/types';

import DevelopmentPaneSnippet from './DevelopmentPaneSnippet';

type Props = {
  draftFilter: MarkerParamsWithResult,
  setDraftFilter: Dispatch<SetStateAction<MarkerParamsWithResult>>,
};

const DevelopmentPaneSidebarCustomFilter = ({
  draftFilter,
  setDraftFilter,
}: Props) => {
  const { t } = useTranslation();

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="ui-slide-from-left-sidebar fixed top-0 left-0 z-[-1] max-h-[100dvh] overflow-auto no-scrollbar">
      <div className="mr-auto w-[400px] max-w-[100vw]">
        <div className="bg-ui-dark text-ui-dark-contrast p-[12px] pl-[60px] rounded-br-[18px] flex flex-col gap-[12px] relative">
          <h3 className="flex gap-3 items-center text-[14px]">
            <IconSelectNew className="size-5 text-white" />
            <span>
              Create a custom filter
            </span>
          </h3>
          <Panel className="ui-panel--rounded-l ui-panel--rounded-r gap-2">
            <input
              onChange={handleChange}
              name="name"
              className="block w-full text-[12px] bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-full py-2 px-4"
              placeholder='name (ex. "eagle", "apple")'
              defaultValue={draftFilter.name}
            />
            <textarea
              onChange={handleChange}
              name="phrases"
              className="block w-full text-[12px] bg-ui-contrast text-ui-dark placeholder-ui-dark caret-marker rounded-[8px] py-2 px-4 min-h-[200px]"
              placeholder='phrases (ex. "eagle, eagles", "apple, apples")'
              defaultValue={draftFilter.phrases?.join(', ')}
              spellCheck="false"
            />
          </Panel>
          <div className="flex gap-2 mt-5">
            <ButtonText
              onClick={() => {
                const value = localStorage.getItem('draft');

                if (value) {
                  setDraftFilter(JSON.parse(value));
                }
              }}
            >
              <span>Load</span>
              <IconFolderDownload />
            </ButtonText>
            <ButtonText
              onClick={() => localStorage.setItem('draft', JSON.stringify(draftFilter))}
              isDisabled={!draftFilter}
            >
              <span>Save</span>
              <IconFolderUpload />
            </ButtonText>
            <ButtonText
              wrapperClassName="ml-auto"
              isActive={Boolean(draftFilter)}
              onClick={() => copyText(`${JSON.stringify({
                name: draftFilter.name,
                ...((draftFilter.phrases || []).length > 0 ? { phrases: draftFilter.phrases } : {}),
                ...((draftFilter.include || []).length > 0 ? { include: draftFilter.include } : {}),
                ...((draftFilter.exclude || []).length > 0 ? { exclude: draftFilter.exclude } : {}),
              }, null, 4)},`)}
            >
              <span>{t('main.copy')}</span>
              <IconCopy />
            </ButtonText>
          </div>
          {draftFilter && <DevelopmentPaneSnippet {...draftFilter} />}
        </div>
        <Space side="left" isLast isLarge className="bg-ui-dark mb-5" />
      </div>
    </div>
  );
}

export default memo(DevelopmentPaneSidebarCustomFilter);
