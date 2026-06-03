"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** CSS class applied when not-yet-visible (defaults to "reveal") */
  className?: string;
  /** Extra classes added always */
  extraClass?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
}

export default function RevealOnScroll({
  children,
  className = "reveal",
  extraClass = "",
  delay = 0,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${className} ${extraClass}`}>
      {children}
    </div>
  );
}
