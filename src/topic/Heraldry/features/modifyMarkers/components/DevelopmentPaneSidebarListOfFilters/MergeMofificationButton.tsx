import { MarkerParams, ComplexManualMarker } from '@/topic/Heraldry/types';

import IconSelectNew from '@/components/Icons/IconSelectNew';

import ButtonText from '@/components/UI/ButtonText';

type Props = {
  filter: MarkerParams,
  include: ComplexManualMarker[],
  exclude: ComplexManualMarker[],
  setDraftFilter: (v: MarkerParams) => void,
}

const MergeMofificationButton = ({ filter: initFliter, include, exclude, setDraftFilter }: Props) => {
  const handleClick = () => {
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

    setDraftFilter({
      ...initFliter,
      include: [...includeWithRemoved, ...rulesToInclude],
      exclude: [...excludeWithRemoved, ...rulesToExclude],
    });
  }

  return (
    <ButtonText
      size="small"
      onClick={handleClick}
      wrapperClassName="ml-auto"
      isActive
    >
      <span>Use</span>
      <IconSelectNew />
    </ButtonText>
  );
};

export default MergeMofificationButton;
