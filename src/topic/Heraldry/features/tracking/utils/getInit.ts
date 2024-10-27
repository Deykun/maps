
export type CookiesValue = {
  wasPopupClosed: boolean,
  didAgreeToGA: boolean,
};

export const getInitCookiesSettings = (): Partial<CookiesValue> => {
  const savedCookies = localStorage.getItem('maps_cookies') || '';
  if (savedCookies) {
    try {
      const savedCookiesJSON = JSON.parse(savedCookies) || {};

      return {
        wasPopupClosed: savedCookiesJSON.wasPopupClosed,
        didAgreeToGA: savedCookiesJSON.didAgreeToGA,
      }
    } catch {
      // Cookies policy has been changed
    }
  }

  return {};
};

export const saveCookies = (cookies: CookiesValue) => {
  localStorage.setItem('maps_cookies', JSON.stringify(cookies));
};
