// https://stackoverflow.com/a/72207078/6743808
// NOTE: the any[] here is still type-safe: we're just
// constraining the generic to be a function type and the
// concrete type of T will be determined at the call site
export const debounce = <T extends (...args: any[]) => void>(
  wait: number,
  callback: T,
  immediate = false,
) => {
  // This is a number in the browser and an object in Node.js,
  // so we'll use the ReturnType utility to cover both cases.
  let timeout: ReturnType<typeof setTimeout> | null;

  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    const context = this;
    const later = () => {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    if (typeof timeout === "number") {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
}