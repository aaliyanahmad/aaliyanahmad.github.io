"use client";

import { useEffect, useRef } from "react";

type AudienceCounterProps = {
  displayValue: string;
  marketingCount: number;
};

export function AudienceCounter({
  displayValue,
  marketingCount,
}: AudienceCounterProps) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const target = marketingCount / 1_000;
    element.textContent = "0K+";

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 1_100;

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}K+`;

          if (progress < 1) {
            animationFrame = requestAnimationFrame(update);
          } else {
            element.textContent = displayValue;
          }
        };

        animationFrame = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [displayValue, marketingCount]);

  return (
    <span
      aria-hidden="true"
      className="creator-audience-value block tabular-nums"
      ref={valueRef}
    >
      {displayValue}
    </span>
  );
}
