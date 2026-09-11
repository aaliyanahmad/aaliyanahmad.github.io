import type { ReactNode } from "react";

import { Eyebrow } from "./eyebrow";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeader({
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(17rem,0.65fr)] md:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-7 max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-bone">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-xl text-pretty text-base leading-7 text-muted md:justify-self-end">
          {description}
        </p>
      ) : null}
    </header>
  );
}
