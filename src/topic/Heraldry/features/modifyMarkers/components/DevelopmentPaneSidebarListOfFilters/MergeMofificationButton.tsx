import { MarkerParams, ComplexManualMarker } from '@/topic/Heraldry/types';
import { useTranslation } from 'react-i18next';

import { copyText } from '@/utils/text';

import IconCopy from '@/components/Icons/IconCopy';
import IconSelectNew from '@/components/Icons/IconSelectNew';


import ButtonText from '@/components/UI/ButtonText';

type Props = {
  filter: MarkerParams,
  include: ComplexManualMarker[],
  exclude: ComplexManualMarker[],
  setDraftFilter: (v: MarkerParams) => void,
}

const MergeMofificationButton = ({ filter: initFliter, include, exclude, setDraftFilter }: Props) => {
  const { t } = useTranslation();

  const mergeData = () => {
    const hashesIncluded = (initFliter.include || []).map((ruleToCheck) => typeof ruleToCheck === 'string' ? '' : ruleToCheck.imageHash).filter(Boolean)
    const hashesExcluded = (initFliter.exclude || []).map((ruleToCheck) => typeof ruleToCheck === 'string' ? '' : ruleToCheck.imageHash).filter(Boolean)

    const hashesToRemove = [...include, ...exclude].map(({ imageHash }) => imageHash);
    const titlesToRemove = [...include, ...exclude].map(({ note }) => note);

    const rulesToInclude = include.filter(({ imageHash }) => !hashesExcluded.includes(imageHash));
    const rulesToExclude = exclude.filter(({ imageHash }) => !hashesIncluded.includes(imageHash));

    const includeWithRemoved = (initFliter.include || []).filter((ruleToCheck) =>
      typeof ruleToCheck === 'string'
        ? !titlesToRemove.includes(ruleToCheck)
        : !hashesToRemove.includes(ruleToCheck.imageHash)
    );

    const excludeWithRemoved = (initFliter.exclude || []).filter((ruleToCheck) =>
      typeof ruleToCheck === 'string'
        ? !titlesToRemove.includes(ruleToCheck)
        : !hashesToRemove.includes(ruleToCheck.imageHash)
    );

    return {
      ...initFliter,
      include: [...includeWithRemoved, ...rulesToInclude],
      exclude: [...excludeWithRemoved, ...rulesToExclude],
    }
  }

  const handleClick = () => {
    const mergedFilter = mergeData();

    setDraftFilter(mergedFilter);
  }

  const handleCopyFiler = () => {
    const mergedFilter = mergeData();

    copyText(`${JSON.stringify(mergedFilter, null, 4)},`)
  }

  return (
    <>
      <ButtonText  
        size="small"
        onClick={handleCopyFiler}
      >
        <span>{t('main.copy')}</span>
        <IconCopy />
      </ButtonText>
      <ButtonText
        size="small"
        onClick={handleClick}
        wrapperClassName="ml-auto"
        isActive
      >
        <span>Use</span>
        <IconSelectNew />
      </ButtonText>
    </>
  );
};

export default MergeMofificationButton;
