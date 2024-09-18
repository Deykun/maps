import { useEffect, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

function useDebouncedResizeObserver<T extends HTMLElement>(debounceDelay: number = 300) {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  const ref = useRef<T>(null);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0]; // You may want to handle multiple elements if needed
      if (!entry?.contentRect) {
        return;
      }

      // Clear previous timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Set a debounced timeout to update the dimensions
      resizeTimeoutRef.current = window.setTimeout(() => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }, debounceDelay);
    };

    const observer = new ResizeObserver((entries) => handleResize(entries));

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [debounceDelay]);

  return { ref, dimensions };
}

export default useDebouncedResizeObserver;