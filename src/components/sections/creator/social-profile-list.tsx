type CreatorPlatform = {
  readonly index: string;
  readonly label: string;
  readonly handle: string;
  readonly audience: string;
  readonly url: `https://${string}`;
};

type SocialProfileListProps = {
  platforms: readonly CreatorPlatform[];
};

export function SocialProfileList({ platforms }: SocialProfileListProps) {
  return (
    <ul className="grid border-y border-[var(--line)] md:grid-cols-2">
      {platforms.map((platform, index) => (
        <li
          className={index > 0 ? "border-t border-[var(--line)] md:border-l md:border-t-0" : ""}
          key={platform.label}
        >
          <article className="creator-social-row relative flex h-full min-h-72 flex-col p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-5 text-[0.58rem] uppercase tracking-[0.18em] text-muted-dark">
              <span>{platform.index}</span>
              <span>Social profile</span>
            </div>

            <h3 className="mt-10 text-[clamp(1.8rem,4vw,3.5rem)] font-medium uppercase leading-none tracking-[-0.05em] text-bone">
              {platform.label}
            </h3>
            <p className="mt-3 text-sm text-muted">{platform.handle}</p>

            <div className="mt-auto flex items-end justify-between gap-5 pt-12">
              <p>
                <span className="sr-only">Approximate audience: </span>
                <span className="creator-social-audience text-[clamp(2.5rem,5vw,4.75rem)] font-medium tabular-nums leading-none tracking-[-0.065em] text-bone-soft">
                  {platform.audience}
                </span>
              </p>
              <a
                aria-label={`View ${platform.label} profile for ${platform.handle} (opens in a new tab)`}
                className="creator-social-link group inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] text-xs font-medium uppercase tracking-[0.12em] text-bone transition-[color,border-color] duration-[var(--motion-fast)] hover:border-copper hover:text-copper"
                href={platform.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                View profile
                <span aria-hidden="true" className="interaction-arrow interaction-arrow--external">↗</span>
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
