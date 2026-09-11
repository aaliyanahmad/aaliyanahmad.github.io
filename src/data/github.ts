import { getSocialByPlatform } from "./socials";

const githubProfile = getSocialByPlatform("github");

if (!githubProfile) {
  throw new Error("The centralized GitHub profile configuration is missing.");
}

export const githubConfig = {
  profile: githubProfile,
  featuredRepositories: ["finance_manager"],
  repositoryLimit: 6,
  revalidateSeconds: 21_600,
  requestTimeoutMilliseconds: 5_000,
} as const;

export const githubSectionContent = {
  eyebrow: "05 / GitHub",
  heading: {
    lead: "Code leaves",
    emphasis: "a trail.",
  },
  introduction:
    "A view into Aaliyan's public engineering activity, recent contribution patterns and selected repositories.",
  sourceLabel: "Source / GitHub API",
  activityLabel: "Contribution activity",
  totalLabel: "Total contributions",
  repositoriesLabel: "Selected public repositories",
  unavailableMessage: "GitHub activity is temporarily unavailable.",
  profileCta: "View GitHub Profile",
  nextLabel: "Next / Vector Labs",
} as const;
