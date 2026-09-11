import "server-only";

import { githubConfig } from "@/data/github";
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionLevel,
  GitHubDataResult,
  GitHubProfileData,
  GitHubRepository,
} from "@/types/github";

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REST_ENDPOINT = "https://api.github.com";

const GITHUB_QUERY = `
  query PortfolioGitHubProfile($login: String!) {
    user(login: $login) {
      login
      name
      url
      followers {
        totalCount
      }
      repositories(
        first: 30
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          description
          url
          homepageUrl
          primaryLanguage {
            name
          }
          stargazerCount
          forkCount
          updatedAt
          isFork
          isArchived
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
          months {
            name
            year
            firstDay
            totalWeeks
          }
        }
      }
    }
  }
`;

interface GraphQLRepositoryNode {
  readonly description: string | null;
  readonly forkCount: number;
  readonly homepageUrl: string | null;
  readonly isArchived: boolean;
  readonly isFork: boolean;
  readonly name: string;
  readonly primaryLanguage: { readonly name: string } | null;
  readonly stargazerCount: number;
  readonly updatedAt: string;
  readonly url: string;
}

interface GraphQLContributionDay {
  readonly contributionCount: number;
  readonly date: string;
  readonly weekday: number;
}

interface GraphQLUser {
  readonly contributionsCollection: {
    readonly contributionCalendar: {
      readonly months: readonly {
        readonly firstDay: string;
        readonly name: string;
        readonly totalWeeks: number;
        readonly year: number;
      }[];
      readonly totalContributions: number;
      readonly weeks: readonly {
        readonly contributionDays: readonly GraphQLContributionDay[];
      }[];
    };
  };
  readonly followers: { readonly totalCount: number };
  readonly login: string;
  readonly name: string | null;
  readonly repositories: {
    readonly nodes: readonly (GraphQLRepositoryNode | null)[];
    readonly totalCount: number;
  };
  readonly url: string;
}

interface GraphQLResponse {
  readonly data?: { readonly user: GraphQLUser | null };
  readonly errors?: readonly { readonly message: string }[];
}

interface RestProfileResponse {
  readonly followers: number;
  readonly html_url: string;
  readonly login: string;
  readonly name: string | null;
  readonly public_repos: number;
}

interface RestRepositoryResponse {
  readonly archived: boolean;
  readonly description: string | null;
  readonly fork: boolean;
  readonly forks_count: number;
  readonly homepage: string | null;
  readonly html_url: string;
  readonly language: string | null;
  readonly name: string;
  readonly stargazers_count: number;
  readonly updated_at: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGraphQLResponse(value: unknown): value is GraphQLResponse {
  return isRecord(value) && (value.data === undefined || isRecord(value.data));
}

function isRestProfile(value: unknown): value is RestProfileResponse {
  return (
    isRecord(value) &&
    typeof value.login === "string" &&
    typeof value.html_url === "string" &&
    typeof value.followers === "number" &&
    typeof value.public_repos === "number" &&
    (typeof value.name === "string" || value.name === null)
  );
}

function isRestRepository(value: unknown): value is RestRepositoryResponse {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.html_url === "string" &&
    typeof value.fork === "boolean" &&
    typeof value.archived === "boolean" &&
    typeof value.forks_count === "number" &&
    typeof value.stargazers_count === "number" &&
    typeof value.updated_at === "string" &&
    (typeof value.description === "string" || value.description === null) &&
    (typeof value.homepage === "string" || value.homepage === null) &&
    (typeof value.language === "string" || value.language === null)
  );
}

function contributionLevel(
  count: number,
  thresholds: readonly number[],
): ContributionLevel {
  if (count === 0) return 0;
  if (count <= thresholds[0]) return 1;
  if (count <= thresholds[1]) return 2;
  if (count <= thresholds[2]) return 3;
  return 4;
}

function quantileThresholds(days: readonly GraphQLContributionDay[]) {
  const positiveCounts = days
    .map((day) => day.contributionCount)
    .filter((count) => count > 0)
    .toSorted((first, second) => first - second);

  if (positiveCounts.length === 0) return [0, 0, 0] as const;

  const at = (position: number) =>
    positiveCounts[Math.min(positiveCounts.length - 1, Math.floor(position * positiveCounts.length))];

  return [at(0.25), at(0.5), at(0.75)] as const;
}

function normalizeCalendar(
  rawCalendar: GraphQLUser["contributionsCollection"]["contributionCalendar"],
): ContributionCalendar {
  const rawDays = rawCalendar.weeks.flatMap((week) => week.contributionDays);
  const thresholds = quantileThresholds(rawDays);

  return {
    months: rawCalendar.months.map((month) => ({ ...month })),
    totalContributions: rawCalendar.totalContributions,
    weeks: rawCalendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map(
        (day): ContributionDay => ({
          ...day,
          level: contributionLevel(day.contributionCount, thresholds),
        }),
      ),
    })),
  };
}

function normalizeGraphQLRepository(
  repository: GraphQLRepositoryNode,
): GitHubRepository {
  return {
    description: repository.description,
    forkCount: repository.forkCount,
    homepageUrl: repository.homepageUrl,
    isArchived: repository.isArchived,
    isFork: repository.isFork,
    name: repository.name,
    primaryLanguage: repository.primaryLanguage?.name ?? null,
    stargazerCount: repository.stargazerCount,
    updatedAt: repository.updatedAt,
    url: repository.url,
  };
}

function normalizeRestRepository(
  repository: RestRepositoryResponse,
): GitHubRepository {
  return {
    description: repository.description,
    forkCount: repository.forks_count,
    homepageUrl: repository.homepage,
    isArchived: repository.archived,
    isFork: repository.fork,
    name: repository.name,
    primaryLanguage: repository.language,
    stargazerCount: repository.stargazers_count,
    updatedAt: repository.updated_at,
    url: repository.html_url,
  };
}

function selectRepositories(
  repositories: readonly GitHubRepository[],
): readonly GitHubRepository[] {
  const eligible = repositories
    .filter((repository) => !repository.isFork && !repository.isArchived)
    .toSorted(
      (first, second) =>
        new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime(),
    );
  const featuredNames = new Set(
    githubConfig.featuredRepositories.map((name) => name.toLowerCase()),
  );
  const featured = eligible.filter((repository) =>
    featuredNames.has(repository.name.toLowerCase()),
  );
  const remaining = eligible.filter(
    (repository) => !featuredNames.has(repository.name.toLowerCase()),
  );

  return [...featured, ...remaining].slice(0, githubConfig.repositoryLimit);
}

function emptyProfile(): GitHubProfileData {
  return {
    calendar: null,
    followers: null,
    name: null,
    profileUrl: githubConfig.profile.url,
    publicRepositoryCount: null,
    repositories: [],
    username: githubConfig.profile.username,
  };
}

async function fetchGraphQL(token: string): Promise<GitHubProfileData | null> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { login: githubConfig.profile.username },
      }),
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "aaliyan-portfolio",
      },
      method: "POST",
      next: { revalidate: githubConfig.revalidateSeconds },
      signal: AbortSignal.timeout(githubConfig.requestTimeoutMilliseconds),
    });

    if (!response.ok) return null;

    const payload: unknown = await response.json();
    if (!isGraphQLResponse(payload) || payload.errors?.length) return null;

    const user = payload.data?.user;
    if (!user) return null;

    const repositories = user.repositories.nodes
      .filter((repository): repository is GraphQLRepositoryNode => repository !== null)
      .map(normalizeGraphQLRepository);

    return {
      calendar: normalizeCalendar(
        user.contributionsCollection.contributionCalendar,
      ),
      followers: user.followers.totalCount,
      name: user.name,
      profileUrl: githubConfig.profile.url,
      publicRepositoryCount: user.repositories.totalCount,
      repositories: selectRepositories(repositories),
      username: githubConfig.profile.username,
    };
  } catch {
    return null;
  }
}

async function fetchRestResource(endpoint: string): Promise<unknown | null> {
  try {
    const response = await fetch(`${REST_ENDPOINT}${endpoint}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "aaliyan-portfolio",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: githubConfig.revalidateSeconds },
      signal: AbortSignal.timeout(githubConfig.requestTimeoutMilliseconds),
    });

    if (!response.ok) return null;
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

async function fetchRestFallback(): Promise<GitHubDataResult> {
  const username = encodeURIComponent(githubConfig.profile.username);
  const [profilePayload, repositoriesPayload] = await Promise.all([
    fetchRestResource(`/users/${username}`),
    fetchRestResource(
      `/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=30`,
    ),
  ]);

  const profile = isRestProfile(profilePayload) ? profilePayload : null;
  const repositories = Array.isArray(repositoriesPayload)
    ? repositoriesPayload.filter(isRestRepository).map(normalizeRestRepository)
    : [];
  const base = emptyProfile();
  const data: GitHubProfileData = {
    ...base,
    followers: profile?.followers ?? null,
    name: profile?.name ?? null,
    profileUrl: base.profileUrl,
    publicRepositoryCount: profile?.public_repos ?? null,
    repositories: selectRepositories(repositories),
    username: base.username,
  };

  return profile || repositories.length > 0
    ? { status: "partial", data }
    : { status: "unavailable", data };
}

export async function getGitHubData(): Promise<GitHubDataResult> {
  try {
    const token = process.env.GITHUB_TOKEN?.trim();

    if (token) {
      const data = await fetchGraphQL(token);
      if (data) return { status: "success", data };
    }

    return await fetchRestFallback();
  } catch {
    return { status: "unavailable", data: emptyProfile() };
  }
}
