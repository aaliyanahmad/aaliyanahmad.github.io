import type { Service, ServiceGroup, ServiceSlug } from "@/types/portfolio";

export const services = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications designed for performance, usability and business goals.",
    order: 1,
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    description:
      "Scalable backend systems, server-side application logic and database-driven platforms.",
    order: 2,
  },
  {
    slug: "api-development",
    title: "API Development",
    description:
      "Well-structured APIs and integrations for web, mobile and business applications.",
    order: 3,
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Cross-platform and mobile application development for product and business use cases.",
    order: 4,
  },
  {
    slug: "dashboards",
    title: "Dashboards",
    description:
      "Administrative dashboards, analytics interfaces and internal operational tools.",
    order: 5,
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    description:
      "E-commerce storefronts and supporting digital commerce experiences.",
    order: 6,
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Technical and on-page SEO improvements focused on visibility, crawlability and search performance.",
    order: 7,
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    description:
      "Practical AI-powered features and integrations incorporated into products and workflows.",
    order: 8,
  },
  {
    slug: "branding",
    title: "Branding",
    description:
      "Digital brand systems and supporting visual and product identity work.",
    order: 9,
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    description:
      "Technical planning, product architecture and practical guidance for software projects.",
    order: 10,
  },
] as const satisfies readonly Service[];

export const serviceGroups = [
  {
    id: "build",
    title: "Build",
    description: "Products, platforms and the systems behind them.",
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
    title: "Grow",
    description: "Digital presence, commerce and discoverability.",
    serviceSlugs: ["e-commerce", "seo", "branding"],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description: "Useful AI capabilities integrated into real workflows.",
    serviceSlugs: ["ai-integration"],
  },
  {
    id: "advise",
    title: "Advise",
    description: "Technical direction for products and software projects.",
    serviceSlugs: ["technical-consulting"],
  },
] as const satisfies readonly ServiceGroup[];

export const servicesSectionContent = {
  eyebrow: "08 / Services",
  heading: {
    lead: "What I can help you",
    emphasis: "build.",
  },
  introduction:
    "From product development and backend engineering to e-commerce, SEO and AI integration, Aaliyan works across the technical and strategic layers required to take digital ideas from concept to execution.",
  availability: "Available for selected projects independently and through Vector Labs.",
  indexLabel: "Capabilities index",
  primaryCta: "Start a Project",
  nextLabel: "Next / Start a Project",
} as const;

export function getOrderedServices() {
  return services.toSorted((first, second) => first.order - second.order);
}

export function getServicesBySlugs(slugs: readonly ServiceSlug[]) {
  return slugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
}

export function getServiceGroups() {
  return serviceGroups.map((group) => ({
    ...group,
    services: getServicesBySlugs(group.serviceSlugs),
  }));
}
