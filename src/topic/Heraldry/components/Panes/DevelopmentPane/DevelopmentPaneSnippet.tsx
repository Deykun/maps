import { MarkerParams } from '@/topic/Heraldry/types';

import DevelopmentPaneSnippetList from './DevelopmentPaneSnippetList';

type Props = MarkerParams;

const DevelopmentPaneSnippet = ({
  name,
  phrases = [],
  include = [],
  exclude = [],
}: Props) => {
  return (
    <pre className="w-full p-2 bg-black whitespace-break-spaces text-[#fdb39d] text-[12px] leading-[16px]">
      {'{'}
      <br />
      {' '}"name": "<span className="text-white">{name}</span>",
      <DevelopmentPaneSnippetList key="phrases" name="phrases" list={phrases} />
      <DevelopmentPaneSnippetList key="exclude" name="exclude" list={exclude} />
      <DevelopmentPaneSnippetList key="include" name="include" list={include} />
      <br />
      {'},'}
    </pre>
  );
};

export default DevelopmentPaneSnippet;
