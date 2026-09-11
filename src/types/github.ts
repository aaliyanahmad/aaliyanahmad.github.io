export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  readonly contributionCount: number;
  readonly date: string;
  readonly level: ContributionLevel;
  readonly weekday: number;
}

export interface ContributionWeek {
  readonly contributionDays: readonly ContributionDay[];
}

export interface ContributionMonth {
  readonly firstDay: string;
  readonly name: string;
  readonly totalWeeks: number;
  readonly year: number;
}

export interface ContributionCalendar {
  readonly months: readonly ContributionMonth[];
  readonly totalContributions: number;
  readonly weeks: readonly ContributionWeek[];
}

export interface GitHubRepository {
  readonly description: string | null;
  readonly forkCount: number;
  readonly homepageUrl: string | null;
  readonly isArchived: boolean;
  readonly isFork: boolean;
  readonly name: string;
  readonly primaryLanguage: string | null;
  readonly stargazerCount: number;
  readonly updatedAt: string;
  readonly url: string;
}

export interface GitHubProfileData {
  readonly calendar: ContributionCalendar | null;
  readonly followers: number | null;
  readonly name: string | null;
  readonly profileUrl: string;
  readonly publicRepositoryCount: number | null;
  readonly repositories: readonly GitHubRepository[];
  readonly username: string;
}

export type GitHubDataResult =
  | { readonly status: "success"; readonly data: GitHubProfileData }
  | { readonly status: "partial"; readonly data: GitHubProfileData }
  | { readonly status: "unavailable"; readonly data: GitHubProfileData };
