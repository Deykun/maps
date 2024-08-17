type SettingsParams = {
  latTop: number,
  latShift: number,
  mapHeightStreech: number,
};

type Props = {
  settings: SettingsParams,
  setSettings: (params: SettingsParams) => void,
}

const HeraldryCanvasAligmentTools = ({ settings, setSettings }: Props) => {
  return (
    <>
      <div className="fixed top-[80px] left-2 z-20 flex flex-col gap-3">
        <span className="bg-white p-2">
          PaddingTop: {settings.latTop.toFixed(6)}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings({ ...settings, latShift: settings.latTop - 0.00005 })}>-</button>
            <input
              type="range"
              min="-8"
              max="8"
              defaultValue={settings.latTop}
              step="0.00005"
              onChange={(e) => {
                e.preventDefault();
                setSettings({ ...settings, latTop: Number(e.target.value) });
              }}
            />
            <button onClick={() => setSettings({ ...settings, latShift: settings.latTop + 0.00005 })}>+</button>
          </div>
        </span>
        <span className="bg-white p-2">
          LatShift: {settings.latShift.toFixed(6)}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings(({ ...settings, latShift: settings.latShift - 0.0005 }))}>-</button>
            <input
              type="range"
              min="-3"
              max="10"
              defaultValue={settings.latShift}
              step="0.0005"
              onChange={(e) => {
                e.preventDefault();
                setSettings({ ...settings, latShift: Number(e.target.value) });
              }}
            />
            <button onClick={() => setSettings({ ...settings, latShift: settings.latShift + 0.0005 })}>+</button>
          </div>
        </span>
        <span className="bg-white p-2">
          mapHeightStreech: {settings.mapHeightStreech.toFixed(6)}
          <br />
          <div className="flex gap-2">
            <button onClick={() => setSettings(({ ...settings, mapHeightStreech: settings.mapHeightStreech - 0.001 }))}>-</button>
            <input
              type="range"
              min="0.001"
              max="2"
              defaultValue={settings.mapHeightStreech}
              step="0.001"
              onChange={(e) => {
                e.preventDefault();
                setSettings({ ...settings, mapHeightStreech: Number(e.target.value) });
              }}
            />
            <button onClick={() => setSettings(({ ...settings, mapHeightStreech: settings.mapHeightStreech + 0.001 }))}>+</button>
          </div>
        </span>
      </div>
    </>
  );
}

export default HeraldryCanvasAligmentTools;
