import clsx from 'clsx';

import { MarkerParams } from '@/topic/Heraldry/types';

import './DevelopmentPaneSnippet.scss';

type Props = Partial<MarkerParams> & {
  className?: string,
};

const DevelopmentPaneSnippet = ({
  className,
  name,
  phrases,
  include = [],
  exclude = [],
}: Props) => {
  return (
    <pre
      className={clsx(
        'development-pane-snippet w-full px-2',
        'whitespace-break-spaces text-[#fdb39d] tracking-widest text-[10px]', {
          [className || '']: className,
        },
      )}
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        name,
        phrases,
        include,
        exclude,
      }, null, 2).replaceAll('"', '<span class="text-[#fffa2b]">"</span>') }}  
    />
  );
};

export default DevelopmentPaneSnippet;
