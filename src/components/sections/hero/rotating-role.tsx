"use client";

import { useEffect, useState } from "react";

type RotatingRoleProps = {
  roles: readonly string[];
};

export function RotatingRole({ roles }: RotatingRoleProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || roles.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % roles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [roles]);

  if (roles.length === 0) return null;

  return (
    <span className="relative inline-grid min-h-[1.5em] min-w-[13em] overflow-hidden align-bottom">
      <span className="sr-only">{roles[0]}</span>
      <span
        aria-hidden="true"
        className="animate-role-in col-start-1 row-start-1 text-bone"
        key={activeIndex}
      >
        {roles[activeIndex]}
      </span>
    </span>
  );
}
