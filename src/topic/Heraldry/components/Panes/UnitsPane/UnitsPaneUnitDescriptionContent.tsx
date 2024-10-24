import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useFiltersDevelopmentStore,
} from '@/topic/Heraldry/stores/filtersDevelopmentStore';

import { copyText } from '@/utils/text';

import { queryClient } from '@/main';

import IconCopy from '@/components/Icons/IconCopy';

import ButtonIcon from '@/components/UI/ButtonIcon';

type Props = {
  id: string,
  country: string,
  shouldShowUnitTitle?: boolean,
}

const UnitsPaneUnitDescriptionContent = ({ id, country, shouldShowUnitTitle = false }: Props) => {
  const isFiltersDevModeActive = useFiltersDevelopmentStore((state) => state.isModeActive);

  const { t } = useTranslation();

  const { 
    title,
    description,
  } = useMemo(() => {
    if (!isFiltersDevModeActive) {
      return {
        title: '',
        description: '',
      }
    }

    const data = queryClient.getQueryData(['dev', country]);

    if (data) {
      const unitData = Object.values(data).find(({ id: idToCheck }) => idToCheck === id);
      return {
        title: unitData?.title || '',
        description: unitData?.description || '',
      }
    }

    return {
      title: '',
      description: '',
    }
  }, [id, country]);

  if (!isFiltersDevModeActive) {
    return null;
  }

  const hasContent = description || (shouldShowUnitTitle && title);

  if (!hasContent) {
    return null;
  }

  return (
    <div className="mt-4 text-ui-dark-contrast">
      <h3 className="flex gap-2 items-center text-[14px]">
        <span>
          {t('heraldry.list.labelDescription')}
        </span>
        <ButtonIcon
          size="small"
          wrapperClassName="ml-auto"
          onClick={() => copyText(description)}
          label={t('main.copy')}
          labelPosition="left"
        >
          <IconCopy />
        </ButtonIcon>
      </h3>
      {shouldShowUnitTitle && title && <div className="-mb-2 text-[10px] text-justify hyphens-auto">{title}</div>}
      <div
        className="my-2 text-[10px] text-justify hyphens-auto line-clamp-6"
        dangerouslySetInnerHTML={{
          __html: description.includes('||||') ?
          (description as string).split('||||').map((paragraph) => `<p class="mb-2 last:mb-0">${paragraph}</p>`).join('')
          : `<p class="mb-2 last:mb-0">${description}<p>`,
        }}
      />
    </div>
  );
};

export default UnitsPaneUnitDescriptionContent;
