import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { SubtitlePart } from '../utils/getFilteredUnits';

type Props = {
  subtitleParts: SubtitlePart[],
  shouldReverseFilters: boolean,
  zoomLevel: number,
}

/*
  tl; dr;
  We can do {arr.map((x) => <span>x</span>).join(', ')}.

  But we can't put .join(<span>, </span>) - this component does it + adds formating logic.
*/

const HeraldrySubtitle = ({
  subtitleParts,
  shouldReverseFilters,
  zoomLevel,
}: Props) => {
  const { t } = useTranslation();

  return (
    <h2 className={clsx('text-center relative', {
      'mt-2 md:text-[16px]': zoomLevel === 1,
      'text-[14px] md:text-[18px] min-h-[20px] leading-[20px]': zoomLevel > 1,
    })}>
      {subtitleParts.length > 0 && <span className="text-[#4b4b4b]">
        <small className="mr-1">
          {t(shouldReverseFilters ? 'heraldry.activeExclusionFilters' : 'heraldry.activeFilters')}
        </small>
          {subtitleParts.map(({ operator, labels }, indexParts) => {
            if (labels.length === 1) {
              return (
                <>
                  <span className="text-black" dangerouslySetInnerHTML={{ __html: t(labels[0]) }} />
                  {indexParts < subtitleParts.length - 1 && <small className="mx-1">
                    {' '}{t('heraldry.filterOperator.and')}{' '}
                  </small>}
                </>
              )
            }

            return (
              <>
                {operator === 'or' && subtitleParts.length > 1 && <small>{'( '}</small>}
                {labels.map((label, indexLabel) => (
                  <>
                    <span className="text-black" dangerouslySetInnerHTML={{ __html: t(label) }} />
                    {indexLabel < labels.length - 1 && <small className="mx-1">
                      {' '}{t(`heraldry.filterOperator.${operator}`)}{' '}
                    </small>}
                  </>
                ))}
                {operator === 'or' && subtitleParts.length > 1 && <small>{' )'}</small>}
                {indexParts < subtitleParts.length - 1 && <small className="mx-1">
                  {' '}{t('heraldry.filterOperator.and')}{' '}
                </small>}
              </>
            );
          })}
      </span>}
    </h2>
  );
};

export default HeraldrySubtitle;
