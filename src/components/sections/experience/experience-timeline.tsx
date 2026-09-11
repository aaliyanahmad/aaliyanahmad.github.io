"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ExperienceTimelineProps = {
  children: ReactNode;
};

export function ExperienceTimeline({ children }: ExperienceTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const items = Array.from(
      timeline.querySelectorAll<HTMLElement>("[data-timeline-entry]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.setAttribute("data-active", "true"));
      timeline.style.setProperty("--timeline-progress", "1");
      return;
    }

    const activateItem = (item: HTMLElement) => {
      items.forEach((entry) => entry.setAttribute("data-active", "false"));
      item.setAttribute("data-active", "true");

      const index = items.indexOf(item);
      const progress = (index + 1) / items.length;
      timeline.style.setProperty("--timeline-progress", String(progress));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - window.innerHeight * 0.4) -
              Math.abs(second.boundingClientRect.top - window.innerHeight * 0.4),
          );

        const closestEntry = visibleEntries[0]?.target;
        if (closestEntry instanceof HTMLElement) activateItem(closestEntry);
      },
      {
        rootMargin: "-22% 0px -42% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="experience-timeline relative"
      ref={timelineRef}
      style={{ "--timeline-progress": 1 / 3 } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[0.3rem] top-0 w-px bg-[var(--line)] md:left-[10.75rem]"
      />
      <span
        aria-hidden="true"
        className="timeline-progress absolute left-[0.3rem] top-0 h-full w-px origin-top bg-copper md:left-[10.75rem]"
      />
      <ol>{children}</ol>
    </div>
  );
}
