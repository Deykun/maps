// https://stackoverflow.com/a/65821541/6743808
import { useEffect } from "react";

export default function useOutsideClick(selector: string, onClickOut: () => void){
  useEffect(() => {
      const onClick = (event: MouseEvent) => {
        const wasElementInsideSelectorClicked = Boolean((event.target as HTMLElement)?.closest(selector));
        if (!wasElementInsideSelectorClicked) {
          const isInBody = document.body.contains((event.target as HTMLElement));
          if (isInBody) {
            onClickOut();
          } else {
            // Was probably removed by click
          }
        }
      }

      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
  }, [selector, onClickOut]);
};
