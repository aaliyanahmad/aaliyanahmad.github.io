import type { Technology } from "@/types/portfolio";

export const technologies = [
  { id: "react", name: "React", category: "frontend" },
  { id: "nextjs", name: "Next.js", category: "frontend" },
  { id: "typescript", name: "TypeScript", category: "frontend" },
  { id: "javascript", name: "JavaScript", category: "frontend" },
  { id: "nestjs", name: "NestJS", category: "backend" },
  { id: "typeorm", name: "TypeORM", category: "backend" },
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "postgresql", name: "PostgreSQL", category: "database" },
  { id: "mongodb", name: "MongoDB", category: "database" },
  { id: "flutter", name: "Flutter", category: "mobile" },
  { id: "shopify", name: "Shopify", category: "platforms" },
  { id: "selenium", name: "Selenium", category: "automation" },
  { id: "puppeteer", name: "Puppeteer", category: "automation" },
] as const satisfies readonly Technology[];
