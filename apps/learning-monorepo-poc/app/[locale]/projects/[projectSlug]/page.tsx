import { notFound } from "next/navigation";
import { ProjectShell } from "@learning-monorepo-poc/learning-core";
import { moduleRegistry } from "../module-registry";

/**
 * Project Page - Server Component
 *
 * Renders the correct module based on projectSlug from the URL.
 * The module is wrapped in ProjectShell for consistent layout and future features.
 *
 * IMPORTANT: This is a SERVER COMPONENT (no "use client").
 * - Module components are SERVER COMPONENTS
 * - Modules can call server-only code and render ClientModule for interactivity
 * - Modules are lazy-loaded for better performance and code splitting
 */
interface PageProps {
  params: Promise<{
    locale: string;
    projectSlug: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectSlug, locale } = await params;
  const moduleLoader = moduleRegistry[projectSlug];

  if (!moduleLoader) {
    return notFound();
  }

  // Lazy load the module component
  const { Module } = await moduleLoader();

  return (
    <ProjectShell locale={locale} projectSlug={projectSlug}>
      <Module />
    </ProjectShell>
  );
}

