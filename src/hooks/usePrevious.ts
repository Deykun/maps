import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T, defaultValue: T): T {
  const ref = useRef<T>(defaultValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
