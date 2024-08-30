import { MarkerParams } from '@/topic/Heraldry/types';

import DevelopmentPaneSnippetList from './DevelopmentPaneSnippetList';

type Props = MarkerParams;

const DevelopmentPaneSnippet = ({
  name,
  phrases = [],
  include = [],
  exclude = [],
}: Props) => {
  if (!name) {
    return null;
  }

  return (
    <pre className="w-full p-2 bg-black whitespace-break-spaces text-[#fdb39d] text-[12px] leading-[16px] rounded-b-[4px]">
      {'{'}
      <br />
      {' '}"name": "<span className="text-white">{name}</span>",
      <DevelopmentPaneSnippetList name="phrases" list={phrases} />
      <DevelopmentPaneSnippetList name="exclude" list={exclude} />
      <DevelopmentPaneSnippetList name="include" list={include} />
      <br />
      {'}'}
    </pre>
  );
};

export default DevelopmentPaneSnippet;
