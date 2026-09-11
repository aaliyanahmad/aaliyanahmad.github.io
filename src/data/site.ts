import type { CompanyProfile, SiteConfig } from "@/types/portfolio";

export const siteConfig = {
  name: "Aaliyan Ahmad",
  nickname: "Ibn Ishfaq",
  url: "https://aaliyanahmad.tech",
  professionalTitles: [
    "Software Engineer",
    "Founder",
    "Product Builder",
    "Digital Creator",
  ],
  heroRoles: ["Software Engineer", "Product Builder", "Founder", "Creator"],
  shortBio:
    "Aaliyan Ahmad, also known as Ibn Ishfaq, builds digital products, software and experiences.",
  location: {
    city: "Lahore",
    country: "Pakistan",
    countryCode: "PK",
    label: "Lahore, Pakistan",
  },
  portrait: {
    src: "/images/aaliyan-ahmad.jpg",
    alt: "Portrait of Aaliyan Ahmad",
  },
  metadata: {
    title: "Aaliyan Ahmad — Software Engineer, Founder & Creator",
    description:
      "Personal portfolio of Aaliyan Ahmad, also known as Ibn Ishfaq — software engineer, founder, product builder and digital creator based in Lahore, Pakistan.",
  },
  contact: {
    email: "aaliyanahmad146@gmail.com",
    emailHref: "mailto:aaliyanahmad146@gmail.com",
  },
  resume: {
    enabled: false,
    filePath: null,
  },
} as const satisfies SiteConfig;

export const vectorLabs: CompanyProfile = {
  name: "Vector Labs",
  relationship: "Founder",
  status: "Current Venture",
  description:
    "Vector Labs is the company Aaliyan is building around software, digital products and systems — bringing engineering, design, strategy and execution into one focused practice.",
  portfolioContext:
    "This portfolio documents the individual work. Vector Labs is the larger structure for turning that capability into products and commercial technology work.",
  principle: "Build the system. Not just the screen.",
  capabilities: [
    {
      id: "build",
      label: "Build",
      description:
        "Software, web platforms, mobile applications and the backend systems behind them.",
      serviceSlugs: [
        "web-development",
        "backend-development",
        "api-development",
        "mobile-applications",
        "dashboards",
      ],
    },
    {
      id: "grow",
      label: "Grow",
      description:
        "Search visibility, digital commerce and the infrastructure for a stronger online presence.",
      serviceSlugs: ["seo", "e-commerce"],
    },
    {
      id: "identity",
      label: "Identity",
      description:
        "Digital brand systems that give products and businesses a coherent presence.",
      serviceSlugs: ["branding"],
    },
    {
      id: "intelligence",
      label: "Intelligence",
      description:
        "Practical AI integration and technical product planning grounded in real workflows.",
      serviceSlugs: ["ai-integration", "technical-consulting"],
    },
  ],
  url: null,
};
