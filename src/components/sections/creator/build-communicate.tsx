type Practice = {
  readonly title: string;
  readonly items: readonly string[];
};

type BuildCommunicateProps = {
  build: Practice;
  communicate: Practice;
  connection: string;
  label: string;
};

function PracticeBlock({ practice, number }: { practice: Practice; number: string }) {
  return (
    <article className="creator-practice min-w-0 p-6 md:p-8 lg:p-10">
      <p className="text-[0.56rem] uppercase tracking-[0.18em] text-muted-dark">
        {number} / Medium
      </p>
      <h3 className="mt-8 text-[clamp(1.85rem,7.6vw,4.5rem)] font-medium uppercase leading-[0.82] tracking-[-0.065em] text-bone lg:text-[clamp(3.1rem,5vw,4.5rem)]">
        {practice.title}
      </h3>
      <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {practice.items.map((item) => (
          <li className="flex items-center gap-2" key={item}>
            <span aria-hidden="true" className="size-1 bg-copper" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function BuildCommunicate({
  build,
  communicate,
  connection,
  label,
}: BuildCommunicateProps) {
  return (
    <div>
      <p className="mb-5 text-[0.6rem] uppercase tracking-[0.18em] text-muted-dark">
        {label}
      </p>
      <div className="creator-bridge grid border border-[var(--line)] lg:grid-cols-[1fr_minmax(10rem,0.5fr)_1fr]">
        <PracticeBlock number="01" practice={build} />

        <div className="creator-bridge-connection relative flex min-h-56 items-center justify-center border-y border-[var(--line)] p-8 text-center lg:border-x lg:border-y-0">
          <span aria-hidden="true" className="creator-bridge-line absolute" />
          <p className="relative max-w-44 bg-[var(--creator-surface)] px-4 py-5 text-sm leading-6 text-bone-soft">
            {connection}
            <span className="mt-4 block font-serif text-3xl italic text-copper">
              People
            </span>
          </p>
        </div>

        <PracticeBlock number="02" practice={communicate} />
      </div>
    </div>
  );
}
