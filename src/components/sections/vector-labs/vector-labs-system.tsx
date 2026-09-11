import type { CompanyCapability } from "@/types/portfolio";

type VectorLabsSystemProps = {
  capabilities: readonly CompanyCapability[];
  companyName: string;
};

const nodePositions = [
  "left-[8%] top-[10%]",
  "right-[8%] top-[10%]",
  "bottom-[10%] left-[8%]",
  "right-[8%] bottom-[10%]",
] as const;

export function VectorLabsSystem({
  capabilities,
  companyName,
}: VectorLabsSystemProps) {
  return (
    <div
      aria-hidden="true"
      className="vector-system relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden border border-[var(--line)] bg-carbon"
    >
      <span className="absolute top-4 left-4 text-[0.5rem] uppercase tracking-[0.16em] text-muted-dark">
        System / 06
      </span>
      <span className="absolute right-4 bottom-4 text-[0.5rem] uppercase tracking-[0.16em] text-muted-dark">
        Capability network
      </span>

      <svg
        className="absolute inset-[12%] size-[76%]"
        fill="none"
        viewBox="0 0 100 100"
      >
        <path className="vector-system-line" d="M50 50 L10 10" pathLength="1" />
        <path className="vector-system-line" d="M50 50 L90 10" pathLength="1" />
        <path className="vector-system-line" d="M50 50 L10 90" pathLength="1" />
        <path className="vector-system-line" d="M50 50 L90 90" pathLength="1" />
        <path className="vector-system-line vector-system-line--quiet" d="M10 10 H90 V90 H10 Z" pathLength="1" />
        <circle className="vector-system-ring" cx="50" cy="50" r="20" />
      </svg>

      {capabilities.map((capability, index) => (
        <span
          className={`vector-system-node absolute ${nodePositions[index]}`}
          key={capability.id}
        >
          {capability.label}
        </span>
      ))}

      <div className="vector-system-core absolute top-1/2 left-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center border border-copper bg-surface text-center">
        <span className="text-[clamp(0.65rem,2vw,0.9rem)] font-semibold uppercase leading-tight tracking-[0.14em] text-bone">
          {companyName}
        </span>
      </div>
    </div>
  );
}
