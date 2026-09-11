import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.72rem] font-semibold uppercase leading-none tracking-[0.2em] text-muted ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-copper" />
      {children}
    </p>
  );
}
