import {useEffect, useLayoutEffect, useRef, useState} from "react";

const useIsomorphicLayoutEffect =
  typeof document !== "undefined" && document.createElement !== void 0
    ? useLayoutEffect
    : useEffect;

/* eslint-disable indent, operator-linebreak */
const getScrolledState =
  typeof window === "undefined" ? () => false :
  window.scrollY !== void 0     ? () => window.scrollY > 100 :
  window.pageYOffset !== void 0 ? () => window.pageYOffset > 100 :
  /* else */                      () => false;
/* eslint-enable indent, operator-linebreak */

/** */
export function useWindowScrolled() {
  const [isScrolled, setIsScrolled] = useState(getScrolledState);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    let didUnsubscribe = false;
    let lastCall = 0;

    const performance = "performance" in window ? window.performance : Date;

    const listener = () => {
      if (didUnsubscribe) return;
      const now = performance.now();
      if (now - lastCall > 18) {
        lastCall = now;
        setIsScrolled(getScrolledState());
      }
    };

    window.addEventListener("scroll", listener);

    return () => {
      didUnsubscribe = true;
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return isScrolled;
}
