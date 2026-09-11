export type ProfessionalTitle =
  | "Software Engineer"
  | "Founder"
  | "Product Builder"
  | "Digital Creator";

export type ProjectCategory =
  | "product"
  | "fyp"
  | "client-work"
  | "production-platform"
  | "internal-system"
  | "personal-project";

export type ProjectStatus = "completed" | "shipped" | "live" | "ongoing";

export type ProjectVisualVariant = "document" | "marketplace" | "platform";

export type ProjectLinkType =
  | "live"
  | "github"
  | "company"
  | "case-study"
  | "app";

export type SocialPlatform = "github" | "linkedin" | "instagram" | "tiktok";

export type ServiceSlug =
  | "web-development"
  | "backend-development"
  | "api-development"
  | "mobile-applications"
  | "dashboards"
  | "e-commerce"
  | "seo"
  | "ai-integration"
  | "branding"
  | "technical-consulting";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "platforms"
  | "automation";

export type TechnologyId =
  | "nestjs"
  | "typeorm"
  | "nodejs"
  | "postgresql"
  | "mongodb"
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "flutter"
  | "shopify"
  | "selenium"
  | "puppeteer";

export interface SiteConfig {
  readonly name: string;
  readonly nickname: string;
  readonly url: `https://${string}`;
  readonly professionalTitles: readonly ProfessionalTitle[];
  readonly heroRoles: readonly string[];
  readonly shortBio: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly countryCode: string;
    readonly label: string;
  };
  readonly portrait: {
    readonly src: string | null;
    readonly alt: string;
  };
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
  readonly contact: ContactInformation;
  readonly resume: ResumeConfig;
}

export interface ContactInformation {
  readonly email: string;
  readonly emailHref: `mailto:${string}`;
}

export interface ResumeConfig {
  readonly enabled: boolean;
  readonly filePath: string | null;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface SocialProfile {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly username: string;
  readonly url: `https://${string}`;
  readonly followerCount?: number;
  readonly displayFollowerCount?: string;
  readonly icon: SocialPlatform;
  readonly featured?: boolean;
}

export interface PortfolioStat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly context?: string;
  readonly title: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly location: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly TechnologyId[];
}

export interface Education {
  readonly id: string;
  readonly degree: string;
  readonly institution: string;
  readonly years: string;
  readonly location: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly href: `https://${string}` | `/${string}`;
  readonly type: ProjectLinkType;
}

export interface ProjectCaseStudy {
  readonly overview?: string;
  readonly depth?: "full" | "light";
  readonly challenge?: string;
  readonly context?: string;
  readonly solution?: string;
  readonly role?: string;
  readonly responsibilities?: readonly string[];
  readonly architecture?: readonly string[];
  readonly features?: readonly string[];
  readonly outcomes?: readonly string[];
  readonly learnings?: readonly string[];
  readonly constraints?: readonly string[];
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly caseStudy?: ProjectCaseStudy;
  readonly displayCategory?: string;
  readonly status?: ProjectStatus;
  readonly description: string;
  readonly longDescription?: string;
  readonly year?: string;
  readonly role?: string;
  readonly technologies?: readonly TechnologyId[];
  readonly links?: readonly ProjectLink[];
  readonly screenshots?: readonly string[];
  readonly coverImage?: string;
  readonly coverImageAlt?: string;
  readonly mobileImages?: readonly string[];
  readonly tags?: readonly string[];
  readonly responsibilities?: readonly string[];
  readonly outcomes?: readonly string[];
  readonly featured?: boolean;
  readonly featuredOrder?: number;
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  readonly visual?: {
    readonly variant: ProjectVisualVariant;
    readonly labels?: readonly string[];
  };
}

export interface Service {
  readonly slug: ServiceSlug;
  readonly title: string;
  readonly shortDescription?: string;
  readonly description: string;
  readonly icon?: string;
  readonly featured?: boolean;
  readonly order?: number;
}

export interface ServiceGroup {
  readonly id: "build" | "grow" | "intelligence" | "advise";
  readonly title: string;
  readonly description: string;
  readonly serviceSlugs: readonly ServiceSlug[];
}

export interface Technology {
  readonly id: TechnologyId;
  readonly name: string;
  readonly category: TechnologyCategory;
}

export interface CompanyCapability {
  readonly id: "build" | "grow" | "identity" | "intelligence";
  readonly label: string;
  readonly description: string;
  readonly serviceSlugs: readonly ServiceSlug[];
}

export interface CompanyProfile {
  readonly name: string;
  readonly relationship: "Founder";
  readonly status: "Current Venture";
  readonly description: string;
  readonly portfolioContext: string;
  readonly principle: string;
  readonly capabilities: readonly CompanyCapability[];
  readonly url: `https://${string}` | null;
}

export type TimelineEntryType = "work" | "venture" | "education";

export interface TimelineEntry {
  readonly id: string;
  readonly type: TimelineEntryType;
  readonly displayDate: string;
  readonly dateTime?: string;
  readonly organization: string;
  readonly role: string;
  readonly context?: string;
  readonly location?: string;
  readonly description: string;
  readonly technologies?: readonly string[];
  readonly reference?: {
    readonly label: string;
    readonly title: string;
  };
}
