import type {
  PortfolioStat,
  SocialPlatform,
  SocialProfile,
} from "@/types/portfolio";

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 0,
});

export function formatApproximateAudience(value: number) {
  return `${compactNumberFormatter.format(value)}+`;
}

export const socialProfiles = [
  {
    platform: "github",
    label: "GitHub",
    username: "aaliyanahmad",
    url: "https://github.com/aaliyanahmad/",
    icon: "github",
    featured: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    username: "aaliyanahmad",
    url: "https://www.linkedin.com/in/aaliyanahmad/",
    icon: "linkedin",
    featured: true,
  },
  {
    platform: "instagram",
    label: "Instagram",
    username: "aaliy4n",
    url: "https://instagram.com/aaliy4n",
    followerCount: 130_000,
    displayFollowerCount: formatApproximateAudience(130_000),
    icon: "instagram",
    featured: true,
  },
  {
    platform: "tiktok",
    label: "TikTok",
    username: "aaliy4nahmad",
    url: "https://www.tiktok.com/@aaliy4nahmad",
    followerCount: 13_000,
    displayFollowerCount: formatApproximateAudience(13_000),
    icon: "tiktok",
    featured: true,
  },
] as const satisfies readonly SocialProfile[];

export const creatorSocialProfiles = socialProfiles.filter(
  (profile) =>
    (profile.platform === "instagram" || profile.platform === "tiktok") &&
    "followerCount" in profile,
);

const creatorAudienceTotal = creatorSocialProfiles.reduce(
  (total, profile) => total + profile.followerCount,
  0,
);

const creatorAudienceMarketingCount =
  Math.floor(creatorAudienceTotal / 10_000) * 10_000;

export const creatorAudience = {
  total: creatorAudienceTotal,
  marketingCount: creatorAudienceMarketingCount,
  displayValue: formatApproximateAudience(creatorAudienceMarketingCount),
} as const;

export const portfolioStats = [
  {
    id: "social-audience",
    value: creatorAudience.displayValue,
    label: "Across social media",
  },
] as const satisfies readonly PortfolioStat[];

export function getSocialByPlatform(platform: SocialPlatform) {
  return socialProfiles.find((profile) => profile.platform === platform);
}
