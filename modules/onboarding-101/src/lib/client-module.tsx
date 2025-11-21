"use client";

import { useState } from "react";
import { Card } from "@learning-monorepo-poc/ui";
import { Button } from "@learning-monorepo-poc/ui";

/**
 * ClientModule - Client component for interactive UI
 * This is where v0-generated interactive UI should live.
 * Can use hooks, state, event handlers, etc.
 */
export function ClientModule() {
  const [step, setStep] = useState(0);

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Onboarding 101</h1>
      <p className="mb-4">
        Welcome to the onboarding module. Step {step + 1}
      </p>
      <p className="mb-4 text-sm text-gray-600">
        This is interactive content. You can replace this with v0-generated UI.
      </p>
      <Button onClick={() => setStep((s) => s + 1)}>Next Step</Button>
    </Card>
  );
}

