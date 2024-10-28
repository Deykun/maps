import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <pre
      className={clsx(
        'development-pane-snippet w-full px-2',
        'whitespace-break-spaces text-[#fdb39d] tracking-widest text-[10px]', {
          [className || '']: className,
          'max-h-[200px] overflow-hidden': !isOpen,
        },
      )}
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        name,
        phrases,
        include,
        exclude,
      }, null, 2).replaceAll('"', '<span class="text-[#fffa2b]">"</span>') }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
};

export default DevelopmentPaneSnippet;
