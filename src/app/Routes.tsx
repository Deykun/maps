import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';

import { PATHS_DATA } from '../constants';

import Home from '../pages/Home';
import HeraldryET from '../pages/eesti-heraldika/HeraldryET';
import HeraldryPL from '../pages/heraldyka/HeraldryPL';
import HeraldryFI from '../pages/suomalainen-heraldikka/HeraldryFI';
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
        <Route path="/maps/eesti-heraldika" component={HeraldryET} />
        <Route path="/maps/heraldyka" component={HeraldryPL} />
        <Route path="/maps/suomalainen-heraldikka" component={HeraldryFI} />
      </Switch>
    </>
  )
}

export default Routes
