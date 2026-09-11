import type { Experience } from "@/types/portfolio";

export const experiences = [
  {
    id: "genetics-pharmaceuticals-associate-backend-engineer",
    company: "Genetics Pharmaceuticals",
    context: "Digital Transformation",
    title: "Associate Backend Engineer & Developer",
    startDate: "2026-03-24",
    endDate: null,
    location: "Lahore, Pakistan",
    responsibilities: [
      "Backend development",
      "Database work",
      "API development",
    ],
    technologies: ["nestjs", "typeorm", "postgresql", "mongodb"],
  },
] as const satisfies readonly Experience[];
