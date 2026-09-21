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
    slug: "getproof",
    title: "GetProof.tech",
    category: "product",
    displayCategory: "Product",
    status: "shipped",
    description: "A digital product for creating legally binding online agreements with automated verification.",
    seoTitle: "GetProof.tech | Product Case Study",
    seoDescription:
      "Case study of GetProof.tech, a digital product for creating online agreements, built and presented by Aaliyan Ahmad.",
    coverImage: "/images/projects/getproof-preview.png",
    coverImageAlt: "GetProof.tech digital online agreement creation interface and mobile verification flow",
    technologies: ["nextjs", "typescript", "react", "nodejs"],
    caseStudy: {
      depth: "full",
      overview:
        "A digital agreement platform designed to simplify and streamline creating, verifying, and signing agreements online.",
      context:
        "GetProof.tech is a shipped web product centered on eliminating friction in freelance, consultancy, and business agreement execution.",
      solution:
        "An intuitive web canvas that turns standard legal clauses into modular blocks with digital identity verification, transparent timelines, and automated records.",
      features: [
        "Modular digital agreement builder",
        "Identity verification check flow",
        "Activity audit timeline and secure records",
        "One-click share and counter-signature",
      ],
      architecture: [
        "Next.js App Router for responsive rendering",
        "TypeScript with strict typing for data models",
        "Tailwind CSS responsive design system",
        "Node.js serverless functions for PDF generation and email triggers",
      ],
      outcomes: [
        "Successfully launched to public production",
        "Simplified multi-party agreement signing into a 2-minute digital flow",
      ],
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
      labels: ["Digital Agreement", "Verified Records"],
    },
  },
  {
    slug: "taskconnect",
    title: "TaskConnect",
    category: "fyp",
    displayCategory: "FYP / Marketplace",
    status: "completed",
    role: "Lead Software Developer / Final Year Project",
    description:
      "A comprehensive two-sided local services and odd-jobs marketplace connecting verified clients with available taskers.",
    seoTitle: "TaskConnect | Marketplace Case Study",
    seoDescription:
      "TaskConnect case study: a final-year client and tasker marketplace developed by Aaliyan Ahmad for connecting local jobs with available taskers.",
    coverImage: "/images/projects/taskconnect-preview.jpg",
    coverImageAlt: "TaskConnect two-sided marketplace interface with active tasker bookings and map preview",
    technologies: ["react", "nodejs", "mongodb", "javascript"],
    caseStudy: {
      depth: "full",
      overview:
        "A two-sided local task marketplace designed to seamlessly connect clients requiring odd jobs with skilled taskers nearby.",
      context:
        "Developed as a university Final Year Project (FYP), TaskConnect addressed the fragmented local service sector by creating structured hiring, escrow-style milestones, and transparent reviews.",
      solution:
        "Built a dual-interface web platform with real-time tasker matching, localized geo-filtering, quote negotiations, and milestone completions.",
      features: [
        "Client booking portal with custom requirements posting",
        "Tasker dashboard with skill badges and hourly rates",
        "Interactive localized map search and distance filters",
        "Job status lifecycle: Pending, Confirmed, In Progress, Completed",
      ],
      architecture: [
        "React SPA frontend with optimized state management",
        "Node.js and Express RESTful API backend",
        "MongoDB schema for dynamic service categories and bids",
        "Real-time status updates and messaging triggers",
      ],
      outcomes: [
        "Awarded top grade for Final Year Project defense",
        "Demonstrated viable two-sided marketplace dynamics and concurrent booking flows",
      ],
    },
    featured: true,
    featuredOrder: 2,
    visual: {
      variant: "marketplace",
      labels: ["Client Portal", "Tasker Network"],
    },
  },
  {
    slug: "dashboards-internal-systems",
    title: "Dashboards & Internal Systems",
    category: "internal-system",
    displayCategory: "Enterprise Systems / Admin Tools",
    status: "live",
    role: "Backend & Systems Engineer",
    description:
      "A suite of high-density administrative dashboards, operational interfaces, telemetry monitors, and internal tooling for enterprise business workflows.",
    seoTitle: "Dashboards & Internal Systems | Case Study",
    seoDescription:
      "A case study of administrative dashboards, backend systems and internal operational tools developed by Aaliyan Ahmad.",
    coverImage: "/images/projects/dashboards-preview.jpg",
    coverImageAlt: "Enterprise analytics dashboard with real-time system telemetry, latency charts, and user audit tables",
    technologies: ["nestjs", "postgresql", "typeorm", "react", "typescript"],
    caseStudy: {
      depth: "full",
      overview:
        "A collection of mission-critical administrative dashboards, data monitoring systems, and internal operational portals built to manage complex business data with zero downtime.",
      context:
        "Modern enterprises require rapid visibility into system health, user metrics, and transaction logs without getting bogged down by slow queries or bloated UIs.",
      solution:
        "Designed and engineered low-latency backend APIs and modular frontend dashboard components with real-time telemetry, filterable audit tables, and instant CSV/JSON report exports.",
      features: [
        "Real-time telemetry and API endpoint latency tracking",
        "User activity log stream with IP tracing and status flags",
        "Visual analytics with time-series charts and category donuts",
        "Role-based access control (RBAC) with granular admin permissions",
      ],
      architecture: [
        "NestJS modular backend architecture with dependency injection",
        "PostgreSQL database optimized with composite indexes for audit logging",
        "TypeORM migrations and query builder for high-throughput queries",
        "Next.js / React analytical frontend with virtualized table rendering",
      ],
      outcomes: [
        "Reduced internal report generation time from minutes to milliseconds",
        "Unified multi-department operations into a single pane of glass",
      ],
    },
    featured: true,
    featuredOrder: 3,
    visual: {
      variant: "platform",
      labels: ["Real-time Telemetry", "Audit Logs", "Analytics Engine"],
    },
  },
  {
    slug: "apkamuaalij",
    title: "ApkaMuaalij",
    category: "production-platform",
    displayCategory: "Production Platform / Backend Engineering",
    status: "live",
    role: "Backend Engineer / Platform Contributor",
    description:
      "Production backend engineering and platform systems supporting the live ApkaMuaalij digital healthcare ecosystem across web and mobile applications.",
    seoTitle: "ApkaMuaalij | Backend Engineering Case Study",
    seoDescription:
      "Backend engineering case study covering Aaliyan Ahmad's contributions to the ApkaMuaalij healthcare platform across web and mobile systems.",
    coverImage: "/images/projects/apkamuaalij-preview.png",
    coverImageAlt: "ApkaMuaalij digital healthcare platform interface for doctor consultations and appointments",
    technologies: ["nestjs", "postgresql", "typeorm", "nodejs"],
    caseStudy: {
      depth: "full",
      overview:
        "Production backend and platform engineering contributing to ApkaMuaalij, an active digital healthcare ecosystem connecting patients with doctors for in-clinic visits and video consultations.",
      context:
        "ApkaMuaalij operates in real-time healthcare delivery, requiring robust, HIPAA/privacy-conscious backend services capable of handling appointment scheduling, doctor availability calendars, and tele-consultation data flows.",
      solution:
        "Aaliyan develops and maintains scalable backend services, REST APIs, and database schemas that power core platform features across the web platform and mobile application.",
      responsibilities: [
        "Architecting and optimizing REST APIs for doctor search, appointment booking, and tele-consultations",
        "Database schema design, query optimization, and transaction safety in PostgreSQL with TypeORM",
        "Maintaining platform reliability and low response times across concurrent booking flows",
        "Integrating secure data communication pipelines between web frontend and Flutter mobile app",
      ],
      features: [
        "Video consultation and clinic appointment scheduling engine",
        "Specialist doctor directory with multi-city localized filtering",
        "Multi-channel booking confirmation and notifications pipeline",
      ],
      architecture: [
        "NestJS enterprise backend framework",
        "PostgreSQL relational database with connection pooling",
        "TypeORM object-relational mapping with strict database migrations",
        "RESTful API contracts synchronized across web and mobile clients",
      ],
      outcomes: [
        "Supports thousands of live patient queries and bookings across Lahore and beyond",
        "Maintained sub-100ms average response times across mission-critical endpoints",
      ],
    },
    links: [
      {
        label: "Visit Platform",
        href: "https://apkamuaalij.com/",
        type: "live",
      },
    ],
    featured: false,
    featuredOrder: 4,
    visual: {
      variant: "platform",
      labels: ["Backend APIs", "Healthcare Database", "Doctor Scheduling"],
    },
  },
  {
    slug: "dental-clinic",
    title: "Dental Clinic",
    category: "personal-project",
    displayCategory: "Web Experience",
    description: "A luxury modern dental clinic website and patient consultation web experience.",
    seoTitle: "Dental Clinic | Web Experience Case Study",
    seoDescription:
      "Case study of a modern dental clinic website and web experience developed and presented by Aaliyan Ahmad.",
    coverImage: "/images/projects/dental-clinic-preview.jpg",
    coverImageAlt: "Modern dental clinic web experience with online consultation booking and treatment showcase",
    technologies: ["nextjs", "react", "typescript"],
    caseStudy: {
      depth: "light",
      overview: "A modern, high-converting dental clinic web experience featuring online patient consultation booking, treatment catalogs, and pristine aesthetics.",
    },
    links: [
      {
        label: "View Live Site",
        href: "https://dental-clinic-ten-chi.vercel.app/",
        type: "live",
      },
    ],
    featured: false,
    featuredOrder: 5,
  },
  {
    slug: "finance-manager",
    title: "Finance Manager",
    category: "personal-project",
    displayCategory: "Personal Project",
    description: "A personal finance and expense management software application with visual cashflow analytics.",
    seoTitle: "Finance Manager | Application Case Study",
    seoDescription:
      "Case study of Finance Manager, a personal finance management application project by Aaliyan Ahmad.",
    coverImage: "/images/projects/finance-manager-preview.jpg",
    coverImageAlt: "Personal finance manager dashboard with spending breakdown, category donut chart, and budget tracker",
    technologies: ["react", "typescript", "nodejs"],
    caseStudy: {
      depth: "light",
      overview: "A personal finance management application with real-time budget tracking, spending breakdown charts, and transaction history.",
    },
    links: [
      {
        label: "View GitHub",
        href: "https://github.com/aaliyanahmad/finance_manager",
        type: "github",
      },
    ],
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
