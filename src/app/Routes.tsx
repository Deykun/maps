import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { PATHS_DATA } from '../constants';

import Home from '@/pages/Home';

import HeraldryDK from '@/pages/dansk-heraldik/HeraldryDK';
import HeraldryDE from '@/pages/deutsche-heraldik/HeraldryDE';
import HeraldryET from '@/pages/eesti-heraldika/HeraldryET';
import HeraldryPL from '@/pages/heraldyka/HeraldryPL';
import HeraldryNO from '@/pages/norges-heraldikk/HeraldryNO';
import HeraldryFI from '@/pages/suomalainen-heraldikka/HeraldryFI';

import { track } from '@/topic/Heraldry/features/tracking/stores/trackingStore';

import { useEffect, useMemo } from "react";

const Routes = () => {
  const [path] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== document.documentElement?.lang) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  const title = useMemo(() => {
    const pathToCompare = path.replace('/maps/', '');
    const pathData = PATHS_DATA.find(({ path: itemPath }) => pathToCompare === itemPath);

    document.documentElement.setAttribute('country', pathData?.country || '');
    
    if (pathData) {
      if (pathData.type === 'heraldryCountry') {
        track({ name: `country_map_page_${pathData.country}` });
      }

      return pathData.title;
    }

    return 'Heraldic maps';
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/maps" component={Home} />
        <Route path="/maps/dansk-heraldik" component={HeraldryDK} />
        <Route path="/maps/deutsche-heraldik" component={HeraldryDE} />
        <Route path="/maps/eesti-heraldika" component={HeraldryET} />
        <Route path="/maps/heraldyka" component={HeraldryPL} />
        <Route path="/maps/norges-heraldikk" component={HeraldryNO} />
        <Route path="/maps/suomalainen-heraldikka" component={HeraldryFI} />
      </Switch>
    </>
  )
}

export default Routes
