import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import ButtonIcon from '@/components/NewUI/ButtonIcon';

import IconInfo from '@/components/Icons/IconInfo';

import { SubtitlePart } from '@/topic/Heraldry/utils/getFilteredUnits';

type Props = {
  className?: string,
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
  className,
  subtitleParts,
  shouldReverseFilters,
  zoomLevel,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  if (zoomLevel > 1 && !isOpen) {
    return (
      <ButtonIcon
        className="-mx-2"
        onClick={() => setIsOpen(true)}
      >
        <IconInfo />
      </ButtonIcon>
    )
  }

  return (
    <h2
      className={clsx('text-center relative', {
        'mt-2 md:text-[16px]': zoomLevel === 1,
        'text-[14px] md:text-[16px] min-h-[20px] leading-[20px]': zoomLevel > 1,
        [className || '']: className
      })}
      onClick={() => zoomLevel > 1 ? setIsOpen(false) : {}}
    >
      {subtitleParts.length > 0 && <span>
        <small className="mr-1">
          {t(shouldReverseFilters ? 'heraldry.activeExclusionFilters' : 'heraldry.activeFilters')}
        </small>
          {subtitleParts.map(({ operator, labels }, indexParts) => {
            if (labels.length === 1) {
              return (
                <>
                  <strong dangerouslySetInnerHTML={{ __html: t(labels[0]) }} />
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
                    <strong dangerouslySetInnerHTML={{ __html: t(label) }} />
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
