import { useState, useEffect, useRef } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

export default function useHeraldryCursorPosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setPosition({ x, y });
      }
    };

    const currentElement = elementRef.current;
    currentElement?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentElement?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { position, elementRef };
}
