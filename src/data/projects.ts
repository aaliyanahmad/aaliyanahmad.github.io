import type { Project, ProjectCategory } from "@/types/portfolio";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  product: "Product",
  fyp: "Final Year Project",
  "client-work": "Client Work",
  "production-platform": "Production Platform",
  "internal-system": "Internal Systems",
  "personal-project": "Personal Project",
};

export const projects = [
  {
    slug: "taskconnect",
    title: "TaskConnect",
    category: "fyp",
    displayCategory: "FYP / Marketplace",
    status: "completed",
    role: "Final Year Project / Software Developer",
    description:
      "A client and tasker marketplace designed to connect people who need local odd jobs completed with individuals available to perform those tasks.",
    seoTitle: "TaskConnect | Marketplace Case Study",
    seoDescription:
      "TaskConnect case study: a final-year client and tasker marketplace developed by Aaliyan Ahmad for connecting local jobs with available taskers.",
    caseStudy: {
      depth: "full",
      overview:
        "A two-sided local task marketplace designed to connect clients who need odd jobs completed with taskers available to perform them.",
      context:
        "TaskConnect was developed as a Final Year Project around a practical marketplace model with two connected participant groups: clients and taskers.",
      solution:
        "The product model connects demand for local task completion with people available to carry out suitable work.",
      features: [
        "Client side of the marketplace",
        "Tasker side of the marketplace",
        "Local and odd-job focus",
      ],
    },
    featured: true,
    featuredOrder: 2,
    visual: {
      variant: "marketplace",
      labels: ["Client", "Tasker"],
    },
  },
  {
    slug: "getproof",
    title: "GetProof.tech",
    category: "product",
    displayCategory: "Product",
    status: "shipped",
    description: "A digital product for creating online agreements.",
    seoTitle: "GetProof.tech | Product Case Study",
    seoDescription:
      "Case study of GetProof.tech, a digital product for creating online agreements, built and presented by Aaliyan Ahmad.",
    caseStudy: {
      depth: "full",
      overview:
        "A digital agreement product designed to simplify the process of creating agreements online.",
      context:
        "GetProof.tech is a shipped web product centered on a focused agreement-creation experience.",
      solution:
        "A web-based product that makes agreement creation available through a clear digital flow.",
    },
    links: [
      {
        label: "Visit Product",
        href: "https://getproof.tech/",
        type: "live",
      },
    ],
    featured: true,
    featuredOrder: 1,
    visual: {
      variant: "document",
      labels: ["Digital Agreement"],
    },
  },
  {
    slug: "apkamuaalij",
    title: "ApkaMuaalij",
    category: "production-platform",
    displayCategory: "Production Platform",
    status: "live",
    role: "Backend Engineer / Backend Development",
    description:
      "Backend and platform systems work contributing to the live ApkaMuaalij healthcare platform across its web platform and mobile application.",
    seoTitle: "ApkaMuaalij | Backend Engineering Case Study",
    seoDescription:
      "Backend engineering case study covering Aaliyan Ahmad's contributions to the ApkaMuaalij healthcare platform across web and mobile systems.",
    caseStudy: {
      depth: "full",
      overview:
        "Production backend and platform work contributing to the ApkaMuaalij digital healthcare ecosystem across web and mobile experiences.",
      context:
        "ApkaMuaalij is a live healthcare platform supporting real digital product workflows.",
      solution:
        "Aaliyan contributes backend and platform work supporting product functionality across the web platform and mobile application.",
    },
    responsibilities: [
      "Backend development",
      "Platform systems supporting the web platform",
      "Platform systems supporting the mobile application",
    ],
    links: [
      {
        label: "Visit Platform",
        href: "https://apkamuaalij.com/",
        type: "live",
      },
    ],
    featured: true,
    featuredOrder: 3,
    visual: {
      variant: "platform",
      labels: ["Backend Systems", "Web Platform", "Mobile Application"],
    },
  },
  {
    slug: "dental-clinic",
    title: "Dental Clinic",
    category: "personal-project",
    displayCategory: "Web Experience",
    description: "A modern dental clinic website and web experience.",
    seoTitle: "Dental Clinic | Web Experience Case Study",
    seoDescription:
      "Case study of a modern dental clinic website and web experience developed and presented by Aaliyan Ahmad.",
    caseStudy: {
      depth: "light",
      overview: "A modern dental clinic website and web experience available online.",
    },
    links: [
      {
        label: "View Live Site",
        href: "https://dental-clinic-ten-chi.vercel.app/",
        type: "live",
      },
    ],
    featured: false,
    featuredOrder: 4,
  },
  {
    slug: "finance-manager",
    title: "Finance Manager",
    category: "personal-project",
    displayCategory: "Personal Project",
    description: "A finance management application and project.",
    seoTitle: "Finance Manager | Application Case Study",
    seoDescription:
      "Case study of Finance Manager, a personal finance management application project by Aaliyan Ahmad.",
    caseStudy: {
      depth: "light",
      overview: "A finance management application and personal software project.",
    },
    links: [
      {
        label: "View GitHub",
        href: "https://github.com/aaliyanahmad/finance_manager",
        type: "github",
      },
    ],
    featured: false,
    featuredOrder: 5,
  },
  {
    slug: "dashboards-internal-systems",
    title: "Dashboards & Internal Systems",
    category: "internal-system",
    displayCategory: "Internal Systems",
    description:
      "A collection of administrative dashboards, internal tools, backend systems and operational interfaces developed for business workflows.",
    seoTitle: "Dashboards & Internal Systems | Case Study",
    seoDescription:
      "A grouped case study of administrative dashboards, backend systems and internal operational tools developed by Aaliyan Ahmad.",
    caseStudy: {
      depth: "light",
      overview:
        "A grouped body of administrative dashboards, internal interfaces, backend systems and operational tools developed for business workflows.",
      constraints: [
        "Individual system details and media are not presented publicly.",
      ],
    },
    featured: false,
    featuredOrder: 6,
  },
] as const satisfies readonly Project[];

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .toSorted((first, second) => first.featuredOrder - second.featuredOrder);
}

export function getSecondaryProjects() {
  return projects
    .filter((project) => !project.featured)
    .toSorted((first, second) => first.featuredOrder - second.featuredOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getOrderedProjects() {
  return projects.toSorted(
    (first, second) => first.featuredOrder - second.featuredOrder,
  );
}

export function getProjectCaseStudyHref(project: Project) {
  return `/work/${project.slug}` as const;
}

export function getProjectCategoryLabel(project: Project) {
  return project.displayCategory ?? projectCategoryLabels[project.category];
}
