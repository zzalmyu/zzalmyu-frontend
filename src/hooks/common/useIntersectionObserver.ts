import { RefObject, useEffect, useRef } from "react";

interface Props {
  target: RefObject<Element>;
  handleIntersect: (element: Element) => void;
  options?: IntersectionObserverInit;
}

const defaultOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const useIntersectionObserver = ({
  target,
  handleIntersect,
  options = defaultOptions,
}: Props): RefObject<IntersectionObserver | null> => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!target.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleIntersect(entry.target);
        }
      });
    }, options);

    observerRef.current.observe(target.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [target, handleIntersect, options]);

  return observerRef;
};

export default useIntersectionObserver;
