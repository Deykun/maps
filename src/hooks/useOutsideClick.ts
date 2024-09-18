// https://stackoverflow.com/a/65821541/6743808
import { useEffect } from "react";

export default function useOutsideClick(selector: string, onClickOut: () => void, ignoreSelectors?: string){
  useEffect(() => {
      const onClick = (event: MouseEvent) => {
        const wasElementInsideSelectorClicked = Boolean((event.target as HTMLElement)?.closest(selector));
        if (!wasElementInsideSelectorClicked) {
          const isInBody = document.body.contains((event.target as HTMLElement));
          if (isInBody) {
            if  (ignoreSelectors) {
              const wasClickedInsideIgnored = Boolean((event.target as HTMLElement)?.closest(ignoreSelectors));
              if (wasClickedInsideIgnored) {
                return;
              }
            }

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
