const grid = [
  { name: '62', top: `30.3%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
  // { name: '60', top: `31.3%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
  { name: '52', top: `36.7%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
  { name: '42', top: `41.9%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
  { name: '0 - fałszywe', top: `50%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
  { name: '0 - prawdziwe', top: `58%`, left: 0, right: 0, width: '100%', height: '3px', backgroundColor: 'red' },
];

const MapGrid = () => {
  return (
    <>
      {grid.map(({ name, ...line }) => <span className="absolute" style={line}>
        <span className="absolute left-1/2 -top-3 z-10 bg-white px-2 rounded-sm">{name}</span>
      </span>)};
    </>
  );
}

export default MapGrid;
