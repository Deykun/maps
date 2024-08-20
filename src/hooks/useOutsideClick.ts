// https://stackoverflow.com/a/65821541/6743808
import { useEffect } from "react";

export default function useOutsideClick(selector: string, onClickOut: () => void){
  useEffect(() => {
      const onClick = (event: MouseEvent) => {
        if (!(event.target as HTMLElement)?.closest(selector)) {
          onClickOut();
        }
      }

      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
  }, [selector, onClickOut]);
};
