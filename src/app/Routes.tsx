import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';

import Home from '../pages/Home';
import Heraldyka from '../pages/heraldyka/Heraldyka';
import { useMemo } from "react";

const Routes = () => {
  const [path] = useLocation();

  const title = useMemo(() => {
    // TODO: add custom titles

    return '🗺️ maps';
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/maps" component={Home} />
        <Route path="/maps/heraldyka" component={Heraldyka} />
      </Switch>
    </>
  )
}

export default Routes
