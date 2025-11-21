import Link from "next/link";
import { Card } from "@learning-monorepo-poc/ui";
import { Button } from "@learning-monorepo-poc/ui";

/**
 * Home page - displays available learning modules
 */
export default function HomePage() {
  const modules = [
    {
      slug: "onboarding-101",
      title: "Onboarding 101",
      description: "Get started with the basics of our platform and workflow.",
    },
    {
      slug: "security-basics",
      title: "Security Basics",
      description: "Learn fundamental security practices and best practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Micro-Academy
          </h1>
          <p className="text-xl text-gray-600">
            Explore our learning modules and enhance your skills
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <Card key={module.slug} className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {module.title}
              </h2>
              <p className="text-gray-600 mb-6">{module.description}</p>
              <Link href={`/projects/${module.slug}`}>
                <Button className="w-full">Start Learning</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
