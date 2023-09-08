import React, { useEffect, useRef, useState } from "react";

interface RefObject<t> {
  readonly current: t | null;
}

const useElementsOnScreen = (options: IntersectionObserverInit | undefined) => {
  const containerRef = useRef<HTMLDivElement>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const callbackFunction = (
      entries: IntersectionObserverEntry[],
    ) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    const theCurrent = containerRef.current;
    if (theCurrent) observer.observe(theCurrent);
    return () => {
      if (theCurrent) observer.unobserve(theCurrent);
    };
  }, [containerRef, options, isVisible]);

  return [containerRef, isVisible];
  // return <div className="" ref={containerRef}>scroll up</div>
};

export default useElementsOnScreen;
