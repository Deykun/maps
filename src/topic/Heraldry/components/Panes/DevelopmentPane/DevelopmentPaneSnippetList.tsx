const DevelopmentPaneSnippetList = ({
  name,
  list = [],
}: {
  name: string,
  list: string[],
}) => {
  if (list.length === 0) {
    return null;
  }

  return (
    <>
      <br />
      {' '}"{name}": [
        <br />
        {list.map((v, index) => <>
          {'  '}"<span className="text-white text-[12px]">{v}</span>"{index !== (list.length - 1) && <>,<br /></>}
        </>)}
        <br />
      {' '}],
    </>
  );
};

export default DevelopmentPaneSnippetList;
