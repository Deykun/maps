import clsx from 'clsx';

import { MarkerParams } from '@/topic/Heraldry/types';

import './DevelopmentPaneSnippet.scss';

type Props = MarkerParams & {
  className?: string,
};

const DevelopmentPaneSnippet = ({
  className,
  name,
  phrases = [],
  include = [],
  exclude = [],
}: Props) => {
  return (
    <pre className={clsx('development-pane-snippet sans w-full px-2 whitespace-break-spaces text-[#fdb39d] tracking-widest text-[12px]', {
      [className || '']: className,
    })}>
      {JSON.stringify({
          name,
          phrases,
          include,
          exclude,
      }, null, 4)}
    </pre>
  );
};

export default DevelopmentPaneSnippet;
