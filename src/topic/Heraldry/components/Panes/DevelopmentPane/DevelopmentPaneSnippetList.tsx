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
        {list.map((value, index) => <>
          {'  '}"<span key={value} className="text-white">{value}</span>"{index !== (list.length - 1) && <>,<br /></>}
        </>)}
        <br />
      {' '}],
    </>
  );
};

export default DevelopmentPaneSnippetList;
