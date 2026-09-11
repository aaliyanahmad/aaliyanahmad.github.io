import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)] ${className}`}
    >
      {children}
    </div>
  );
}
