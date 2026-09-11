import type { GitHubRepository } from "@/types/github";

type RepositoryListProps = {
  repositories: readonly GitHubRepository[];
};

const updatedDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatUpdatedDate(date: string) {
  return updatedDateFormatter.format(new Date(date));
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className="border-y border-[var(--line)] py-8 text-sm text-muted">
        Public repositories are temporarily unavailable. The profile link remains
        available above.
      </div>
    );
  }

  return (
    <ol className="grid border-t border-[var(--line)] md:grid-cols-2">
      {repositories.map((repository, index) => (
        <li
          className="border-b border-[var(--line)] md:odd:border-r md:odd:border-[var(--line)]"
          key={repository.name}
        >
          <a
            aria-label={`View ${repository.name} repository on GitHub (opens in a new tab)`}
            className="repository-link group flex min-h-full flex-col px-1 py-8 sm:px-6 md:min-h-64"
            href={repository.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex items-center justify-between gap-4 text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
              <span className="text-copper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>Updated {formatUpdatedDate(repository.updatedAt)}</span>
            </div>

            <h3 className="repository-title mt-8 break-words text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.045em] text-bone">
              {repository.name}
            </h3>
            {repository.description ? (
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {repository.description}
              </p>
            ) : null}

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-[0.58rem] uppercase tracking-[0.14em] text-muted-dark">
              {repository.primaryLanguage ? (
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 bg-copper" />
                  {repository.primaryLanguage}
                </span>
              ) : null}
              {repository.stargazerCount > 0 ? (
                <span>
                  {repository.stargazerCount.toLocaleString("en-US")} stars
                </span>
              ) : null}
              <span className="interaction-arrow interaction-arrow--external ml-auto text-bone">
                ↗
              </span>
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}
