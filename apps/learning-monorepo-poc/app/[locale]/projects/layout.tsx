import type { ReactNode } from "react";

/**
 * Projects layout - serves as a shell for all project routes.
 * This is where we can add auth guards, navigation, analytics wrappers, etc. in the future.
 */
interface ProjectsLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ProjectsLayout({ children, params }: ProjectsLayoutProps) {
  await params; // Await params even if not used, to satisfy Next.js requirements
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}

