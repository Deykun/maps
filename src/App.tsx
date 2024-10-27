import useAddTrackersScriptsIfNeeded from '@/topic/Heraldry/features/tracking/hooks/useAddTrackersScriptsIfNeeded';

import Routes from './app/Routes';

const App = () => {
  useAddTrackersScriptsIfNeeded();

  return (
    <>
      <Routes />
    </>
  );
}

export default App
