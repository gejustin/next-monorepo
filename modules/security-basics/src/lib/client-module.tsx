"use client";

import { Card } from "@learning-monorepo-poc/ui";
import { Button } from "@learning-monorepo-poc/ui";

/**
 * ClientModule - Client component for interactive UI
 * This module doesn't need interactivity, so this is minimal.
 * If you add interactive features later, add them here.
 */
export function ClientModule() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Security Basics</h1>
      <p className="mb-4">
        Welcome to the security basics module. This is static content for now.
        You can replace this with v0-generated UI.
      </p>
      <Button variant="outline">Learn more</Button>
    </Card>
  );
}

