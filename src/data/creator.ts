import { siteConfig } from "./site";
import {
  creatorAudience,
  creatorSocialProfiles,
} from "./socials";

export const creatorContent = {
  eyebrow: "07 / Creator",
  heading: {
    lead: "Code is one medium.",
    emphasis: "Storytelling is another.",
  },
  identity: siteConfig.nickname,
  identityLabel: `Creator identity of ${siteConfig.name}`,
  category: "Digital Creator",
  narrative: [
    `Under the name ${siteConfig.nickname}, ${siteConfig.name} creates content for an audience of ${creatorAudience.displayValue} people across Instagram and TikTok. Audience-building develops another side of the same instinct he brings to engineering: understanding people, structuring information and making ideas clear enough to earn attention.`,
    "It means learning what communicates, what people respond to and how ideas move through digital spaces. Those skills carry directly into products, brands and digital experiences.",
  ],
  audience: {
    ...creatorAudience,
    label: "Audience",
    context: "People across social media",
  },
  platforms: creatorSocialProfiles.map((profile, index) => ({
    ...profile,
    index: String(index + 1).padStart(2, "0"),
    handle: `@${profile.username}`,
    audience: profile.displayFollowerCount,
  })),
  bridge: {
    label: "One practice / two mediums",
    build: {
      title: "Build",
      items: ["Software", "Products", "Systems"],
    },
    communicate: {
      title: "Communicate",
      items: ["Ideas", "Stories", "Audience"],
    },
    connection: "Both begin with understanding people.",
  },
  nextLabel: "Next / Services",
} as const;
