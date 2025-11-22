"use client";

import { Card } from "@learning-monorepo-poc/ui";
import { Button } from "@learning-monorepo-poc/ui";

/**
 * ClientModule - Client component for interactive UI
 * This is where v0-generated interactive UI should live.
 * Can use hooks, state, event handlers, etc.
 */
export function ClientModule() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-semibold mb-4"><%= titleCaseName %></h1>
      <p className="mb-4">
        Welcome to the <%= moduleName %> module. This is a new module.
        You can replace this with v0-generated UI.
      </p>
      <Button variant="outline">Get started</Button>
    </Card>
  );
}

