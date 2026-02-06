import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  /** Only animate when element is in view */
  triggerOnView?: boolean;
}

/**
 * Animates a number counting up from `start` to `end`.
 * Returns [displayValue, ref] — attach ref to the element for viewport trigger.
 */
export function useCountUp({
  end,
  duration = 1200,
  start = 0,
  triggerOnView = true,
}: UseCountUpOptions): [number, React.RefObject<HTMLElement | null>] {
  const [value, setValue] = useState(triggerOnView ? start : end);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!triggerOnView) {
      setValue(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, start, triggerOnView]);

  return [value, ref];
}
