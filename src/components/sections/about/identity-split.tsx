"use client";

import { useState } from "react";

type IdentityItem = {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly label: string;
  readonly description: string;
};

type IdentitySplitProps = {
  identities: readonly IdentityItem[];
  introduction: string;
};

export function IdentitySplit({
  identities,
  introduction,
}: IdentitySplitProps) {
  const [activeIdentity, setActiveIdentity] = useState(identities[0]?.id);

  return (
    <div className="border-y border-[var(--line)]">
      <p className="max-w-2xl py-6 text-sm leading-6 text-muted">
        {introduction}
      </p>
      <div className="grid md:grid-cols-2">
        {identities.map((identity, index) => {
          const isActive = activeIdentity === identity.id;

          return (
            <button
              aria-pressed={isActive}
              className={`identity-card group relative min-h-52 border-t border-[var(--line)] px-0 py-7 text-left md:px-7 ${
                index > 0 ? "md:border-l" : ""
              }`}
              key={identity.id}
              onClick={() => setActiveIdentity(identity.id)}
              type="button"
            >
              <span className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                <span className={isActive ? "text-copper" : ""}>
                  {identity.number}
                </span>
                <span>{identity.label}</span>
              </span>
              <span className="mt-12 block text-[clamp(1.8rem,4vw,3.8rem)] font-medium leading-none tracking-[-0.05em] text-bone">
                {identity.name}
              </span>
              <span className="mt-4 block max-w-sm text-sm leading-6 text-muted">
                {identity.description}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-copper transition-transform duration-[var(--motion-normal)] ease-[var(--ease-emphasized)] md:inset-x-7 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
