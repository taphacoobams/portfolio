import { useEffect, useState, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T>,
  options: ScrollRevealOptions = {}
): boolean {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    direction = "up",
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, rootMargin, delay]);

  return isVisible;
}

export default useScrollReveal;
