import type { ComponentType } from "react";

/**
 * Module Registry
 * Maps projectSlug strings to lazy-loaded server module components.
 *
 * IMPORTANT: Modules are SERVER COMPONENTS (no "use client").
 * Each module's Module.tsx is a server component that can:
 * - Call server-only code (databases, APIs, etc.)
 * - Render a ClientModule.tsx for interactive UI
 *
 * Modules are dynamically imported to enable code splitting and reduce initial bundle size.
 *
 * To add a new module:
 * 1. Create the module lib under modules/<module-name>
 * 2. Create src/lib/module.tsx (server component, named export, no props)
 * 3. Create src/lib/client-module.tsx (client component with "use client" for interactivity)
 * 4. Export Module from src/index.ts
 * 5. Add a lazy import here and add it to the registry
 */
export const moduleRegistry: Record<string, () => Promise<{ Module: ComponentType }>> = {
  "math-basics": () => import("@learning-monorepo-poc/math-basics").then(m => ({ Module: m.Module })),
};

