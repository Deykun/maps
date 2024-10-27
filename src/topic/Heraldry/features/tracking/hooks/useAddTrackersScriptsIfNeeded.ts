import { useEffect } from 'react';

import { TRACKER_GA_ID } from '@/constants';

import useTrackingStore from '@/topic/Heraldry/features/tracking/stores/trackingStore';

export default function useAddTrackersScriptsIfNeeded() {
  const isGoogleAnalyticsAccepted = useTrackingStore(state => state.didAgreeToGA);

  useEffect(() => {
    if (isGoogleAnalyticsAccepted) {
      if (TRACKER_GA_ID) {
        const isAlreadyAdded = document.getElementById('tracker-ga');

        if (isAlreadyAdded) {
          return;
        }
  
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKER_GA_ID}`;
        script.async = true;
        script.id = 'tracker-ga';
  
        document.getElementsByTagName('head')[0]?.appendChild(script);
  
        const scriptText = document.createElement('script');
        scriptText.innerText = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
          gtag('config', '${TRACKER_GA_ID}');
        `;
  
        document.getElementsByTagName('head')[0]?.appendChild(scriptText);
      }
    } else {
      const wasAdded = document.getElementById('tracker-ga');

      if (!wasAdded) {
        return;
      }

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isGoogleAnalyticsAccepted]);
}