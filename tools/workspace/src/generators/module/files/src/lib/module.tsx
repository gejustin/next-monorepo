import { ClientModule } from "./client-module";

// Optionally import server-only helpers later:
// import { getProjectConfig } from "@learning-monorepo-poc/learning-core/server";

/**
 * Module - Server Component Entry Point
 *
 * Contract:
 * - Server component (no "use client")
 * - Named export
 * - Takes NO props
 * - Can call server-only code (databases, APIs, etc.)
 * - Renders ClientModule for interactive UI
 */
export async function Module() {
  // Example of server-side work:
  // const config = await getProjectConfig("<%= moduleName %>");
  // const data = await fetchModuleData("<%= moduleName %>");

  // Contract: no props from the route.
  // All data fetching happens here on the server.
  return <ClientModule />;
}

