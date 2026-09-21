"use client";

import { useState, type ReactNode } from "react";

type TechCategory = "all" | "backend" | "frontend" | "database" | "platforms";

interface TechItem {
  id: string;
  name: string;
  category: "backend" | "frontend" | "database" | "platforms";
  categoryLabel: string;
  experience: string;
  projects: string[];
  icon: ReactNode;
}

const techItems: TechItem[] = [
  {
    id: "nestjs",
    name: "NestJS",
    category: "backend",
    categoryLabel: "Backend Architecture",
    experience: "Primary Framework",
    projects: ["Genetics Pharma", "ApkaMuaalij", "Dashboards"],
    icon: (
      <svg className="size-6 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.996.002a.856.856 0 0 0-.586.257L.268 11.401a.857.857 0 0 0 0 1.212l5.142 5.143a.858.858 0 0 0 1.213 0l5.373-5.372 3.125 3.124a.857.857 0 0 0 1.213 0l7.397-7.397a.857.857 0 0 0 0-1.213L12.582.26A.856.856 0 0 0 11.996 0zm0 2.424 9.92 9.92-6.184 6.185-3.125-3.124a.857.857 0 0 0-1.213 0l-5.373 5.372-3.93-3.93L11.996 2.424z" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "backend",
    categoryLabel: "Core Language",
    experience: "Strict Typing / Advanced",
    projects: ["Production Microservices", "Full-Stack Platforms"],
    icon: (
      <svg className="size-6 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.44 11.23h3.5v1.85h-1.6v6.62h-2.1v-6.62h-1.6v-1.85h1.8zm5.4 0h2.15v5.82c0 1.83-1.07 2.8-2.98 2.8-.82 0-1.65-.22-2.12-.55l.5-1.72c.4.25.95.42 1.5.42.92 0 1.45-.48 1.45-1.42v-5.35h-.5z" />
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Relational Database",
    experience: "Complex Queries / Tuning",
    projects: ["ApkaMuaalij", "Enterprise Dashboards"],
    icon: (
      <svg className="size-6 text-[#4169E1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0a11.944 11.944 0 0 0-1.748.128c-.89.13-1.754.402-2.553.805a11.91 11.91 0 0 0-4.877 4.877 11.96 11.96 0 0 0-.933 4.301c0 1.503.278 2.943.784 4.269a11.962 11.962 0 0 0 4.908 5.679 11.922 11.922 0 0 0 6.06 1.879c1.558 0 3.05-.302 4.414-.85a11.93 11.93 0 0 0 5.37-4.829 11.964 11.964 0 0 0 1.567-5.898c0-1.75-.382-3.41-1.074-4.898a11.934 11.934 0 0 0-4.869-5.188A11.895 11.895 0 0 0 11.944 0zm0 2.215c1.472 0 2.87.318 4.128.89a9.71 9.71 0 0 1 4.12 4.12c.571 1.258.89 2.656.89 4.128s-.319 2.87-.89 4.128a9.714 9.714 0 0 1-4.12 4.12c-1.258.572-2.656.89-4.128.89s-2.87-.318-4.128-.89a9.71 9.71 0 0 1-4.12-4.12 9.756 9.756 0 0 1-.89-4.128c0-1.472.319-2.87.89-4.128a9.71 9.71 0 0 1 4.12-4.12c1.258-.572 2.656-.89 4.128-.89z" />
      </svg>
    ),
  },
  {
    id: "typeorm",
    name: "TypeORM",
    category: "backend",
    categoryLabel: "ORM / Migrations",
    experience: "Data Modeling & Transactions",
    projects: ["Genetics Pharma", "ApkaMuaalij"],
    icon: (
      <svg className="size-6 text-[#F36F21]" viewBox="0 0 24 24" fill="currentColor">
        <path d="m13.794 3.737-1.794.996-1.794-.996L3 7.734v8.532l7.2 4 1.8-.996 1.8.996 7.2-4V7.734l-7.206-3.997zm-1.794 2.997 4.8 2.665-4.8 2.665-4.8-2.665 4.8-2.665zm-6.6 4.33 4.8 2.664v5.334l-4.8-2.665V11.064zm13.2 5.333-4.8 2.665v-5.333l4.8-2.665v5.333z" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Full-Stack Web",
    experience: "App Router / SSR",
    projects: ["GetProof.tech", "Engineering Portfolio"],
    icon: (
      <svg className="size-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.665 21.978C16.66 23.25 14.397 24 11.976 24 5.362 24 0 18.638 0 12.024 0 5.41 5.362.048 11.976.048c6.614 0 11.976 5.362 11.976 11.976 0 3.32-1.353 6.32-3.528 8.472l-9.87-12.83h-2.12v12.67h1.96V9.458l9.27 12.52zM16.543 7.824h1.96v7.41h-1.96v-7.41z" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: "UI Engineering",
    experience: "State / Concurrent Features",
    projects: ["TaskConnect", "GetProof", "Dashboards"],
    icon: (
      <svg className="size-6 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9.08a2.92 2.92 0 1 0 0 5.84 2.92 2.92 0 0 0 0-5.84zm0-6.08c-3.13 0-5.88.66-7.83 1.78C2.2 5.9.9 7.55.9 9.5c0 1.95 1.3 3.6 3.27 4.72 1.95 1.12 4.7 1.78 7.83 1.78s5.88-.66 7.83-1.78c1.97-1.12 3.27-2.77 3.27-4.72 0-1.95-1.3-3.6-3.27-4.72C17.88 3.66 15.13 3 12 3zm0 15c-3.13 0-5.88-.66-7.83-1.78C2.2 15.1.9 13.45.9 11.5c0-1.95 1.3-3.6 3.27-4.72C6.12 5.66 8.87 5 12 5s5.88.66 7.83 1.78c1.97 1.12 3.27 2.77 3.27 4.72 0 1.95-1.3 3.6-3.27 4.72C17.88 17.34 15.13 18 12 18z" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Runtime Engine",
    experience: "High-Throughput APIs",
    projects: ["TaskConnect API", "Serverless Functions"],
    icon: (
      <svg className="size-6 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.5 6.063v11.874L12 24l10.5-6.063V6.063L12 0zm0 2.375l8.4 4.85v9.55L12 21.625l-8.4-4.85v-9.55L12 2.375z" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    categoryLabel: "Document Store",
    experience: "Dynamic Schemas & Aggregations",
    projects: ["TaskConnect Marketplace", "Genetics Pharma"],
    icon: (
      <svg className="size-6 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.228-4.66-7.842-4.996-8.625-.195-.456-.37-.93-.418-1.077a.64.64 0 0 0-.555-.453.68.68 0 0 0-.585.347c-.244.407-.585 1.05-1.054 2.05C8.01 5.17 6.13 9.948 7.02 14.542c.813 4.21 3.52 7.04 4.673 8.237.214.223.376.39.467.502.13.16.29.219.457.219.168 0 .328-.06.457-.22.092-.11.254-.278.468-.5 1.153-1.2 3.86-4.028 4.673-8.238.273-1.41.24-3.327-.022-4.987zm-5.412 11.247c-.015-.015-.03-.03-.044-.045v-9.08l.195-.194v9.32zm.543-16.124c.03.05.06.1.088.15 1.088 1.83 3.69 6.208 4.316 9.695.534 2.973-.207 5.86-2.188 8.49v-13.43l-.116-.115c-.71-.703-1.424-1.393-2.1-4.79z" />
      </svg>
    ),
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "platforms",
    categoryLabel: "Cross-Platform Mobile",
    experience: "Client Apps & Native Interop",
    projects: ["ApkaMuaalij Mobile", "Vector Labs"],
    icon: (
      <svg className="size-6 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6.027 15.688L2.3 19.414 6.886 24h7.37L6.027 15.688zm5.714-5.713l-3.9 3.9 3.9 3.9 3.9-3.9-3.9-3.9z" />
      </svg>
    ),
  },
  {
    id: "shopify",
    name: "Shopify / E-Com",
    category: "platforms",
    categoryLabel: "Digital Commerce",
    experience: "Liquid / Custom Storefronts",
    projects: ["Vector Labs Commercial Clients"],
    icon: (
      <svg className="size-6 text-[#96BF48]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.785 4.542a.753.753 0 0 0-.695-.516l-2.735-.27a.754.754 0 0 0-.756.442L14.28 7.02l-2.096-4.996a.755.755 0 0 0-.753-.443l-2.736.27a.755.755 0 0 0-.695.516l-4.14 14.614a.754.754 0 0 0 .546.929l13.67 3.86a.755.755 0 0 0 .93-.547l4.14-14.615a.754.754 0 0 0-.361-.832z" />
      </svg>
    ),
  },
  {
    id: "automation",
    name: "Puppeteer & Selenium",
    category: "platforms",
    categoryLabel: "Browser Automation",
    experience: "E2E Testing & Scraping",
    projects: ["Internal Data Scrapers", "Quality Pipelines"],
    icon: (
      <svg className="size-6 text-[#00B4B6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    ),
  },
];

const categories: { id: TechCategory; label: string }[] = [
  { id: "all", label: "Full Stack" },
  { id: "backend", label: "Backend & Systems" },
  { id: "frontend", label: "Frontend & Web" },
  { id: "database", label: "Databases" },
  { id: "platforms", label: "Mobile & Platforms" },
];

export function TechRadar() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all");

  const filteredItems = techItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory,
  );

  return (
    <div className="tech-radar mt-14">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`cursor-pointer rounded px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] transition-all ${
              activeCategory === cat.id
                ? "bg-copper text-carbon font-semibold shadow-sm"
                : "text-muted hover:text-bone hover:bg-surface border border-transparent hover:border-[var(--line)]"
            }`}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((tech) => (
          <div
            key={tech.id}
            className="group relative flex flex-col justify-between rounded border border-[var(--line)] bg-surface/70 p-5 transition-all duration-300 hover:border-copper/40 hover:bg-surface-raised hover:shadow-[0_8px_24px_rgba(184,121,82,0.08)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded border border-[var(--line-strong)] bg-carbon transition-colors group-hover:border-copper/40">
                  {tech.icon}
                </div>
                <span className="text-[0.55rem] uppercase tracking-widest text-muted-dark">
                  {tech.categoryLabel}
                </span>
              </div>

              <h4 className="mt-4 text-base font-semibold tracking-tight text-bone transition-colors group-hover:text-copper">
                {tech.name}
              </h4>

              <p className="mt-1 text-xs text-muted-dark">
                {tech.experience}
              </p>
            </div>

            <div className="mt-5 border-t border-[var(--line)]/50 pt-3">
              <p className="text-[0.55rem] uppercase tracking-wider text-muted-dark">
                Production Use
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {tech.projects.map((proj) => (
                  <span
                    key={proj}
                    className="rounded bg-carbon px-2 py-0.5 text-[0.62rem] text-bone-soft/80"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
