import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { removeDiacratics } from '@/utils/text';

import { getInitCookiesSettings, saveCookies, CookiesValue } from '@/topic/Heraldry/features/tracking/utils/getInit';


export const IS_MAIN_INSTANCE = window && ['localhost', 'deykun'].some(phrase => (window?.location?.href || '').includes(phrase)) || false;

export const IS_DEV = (window.location.origin || '')?.includes('localhost') || false;

// Just put your ID inside the single quotes if you want to use your own GA instance. ;)
export const TRACKER_GA_ID = IS_MAIN_INSTANCE ? 'G-RTPFBWF3B4' : '';

type TrackingStoreState = CookiesValue & {
  isPopupOpen: boolean,
};

const initial = getInitCookiesSettings();

const emptyState: TrackingStoreState = {
  isPopupOpen: false,
  wasPopupClosed: false,
  didAgreeToGA: false,
};

export const useTrackingStore = create<TrackingStoreState>()(
  devtools(
    () => ({
      isPopupOpen: false,
      wasPopupClosed: initial.wasPopupClosed || emptyState.wasPopupClosed,
      didAgreeToGA: initial.didAgreeToGA || emptyState.didAgreeToGA,
    } as TrackingStoreState),
    { name: 'trackinStore' },
  )
)

export const toggleCookiesPopup = () => {
  useTrackingStore.setState(state => ({
    isPopupOpen: !state.isPopupOpen && state.wasPopupClosed, // It is forced until rejected or accepted
  }));
};

export const acceptAll = () => {
  const values = {
    wasPopupClosed: true,
    didAgreeToGA : true,
  };

  saveCookies(values);

  useTrackingStore.setState({
    isPopupOpen: false,
    ...values,
  });
};

export const rejectGA = () => {
  const values = {
    wasPopupClosed: true,
    didAgreeToGA : false,
  };

  saveCookies(values);

  useTrackingStore.setState({
    isPopupOpen: false,
    ...values,
  });
};

type EventParams = {
  name: string,
  params?: {
    [key: string]: string | number
  },
  withCountry?: boolean,
};

export const track = ({ name: initName, params = {}, withCountry = false }: EventParams) => {
  const didAgreeToGA = useTrackingStore.getState().didAgreeToGA;

  let name = initName;

  if (withCountry) {
    const country = document.documentElement.getAttribute('country');

    if (country) {
      name = `${country}_${name}`;
    }
  }

  if (IS_DEV) {
    console.info('event', name, params);

    return;
  }

  if (didAgreeToGA) {
    try {
      (window as any)?.gtag('event', name, params);
    } catch {
      //
    }
  }
};

export const trackFilter = (label: string) => {
  track({ name: removeDiacratics(`filter_${label.toLocaleLowerCase().replaceAll(' ', '_')}`), withCountry: true });
}

export default useTrackingStore;