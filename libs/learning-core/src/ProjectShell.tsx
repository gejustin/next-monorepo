import type { ReactNode } from "react";

/**
 * ProjectShell provides a shared shell wrapper for all learning modules.
 * This is where we can add learner state, analytics, navigation, etc. in the future.
 * For now, it provides a simple container with consistent styling.
 */
interface ProjectShellProps {
  locale: string;
  projectSlug: string;
  children: ReactNode;
}

export function ProjectShell({ locale, projectSlug, children }: ProjectShellProps) {
  // Later we can add learner state, analytics, etc. Here keep it minimal.
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {children}
    </div>
  );
}

