import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';

import { PATHS_DATA } from '../constants';

import Home from '../pages/Home';
import HeraldryPL from '../pages/heraldyka/HeraldryPL';
import { useMemo } from "react";

const Routes = () => {
  const [path] = useLocation();

  const title = useMemo(() => {
    const pathToCompare = path.replace('/maps/', '');
    const pathData = PATHS_DATA.find(({ path: itemPath }) => pathToCompare === itemPath);

    if (pathData) {
      return pathData.title;
    }

    return '🗺️ maps';
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/maps" component={Home} />
        <Route path="/maps/heraldyka" component={HeraldryPL} />
      </Switch>
    </>
  )
}

export default Routes
