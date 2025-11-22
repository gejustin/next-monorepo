import Link from "next/link";
import { Card, Button } from "@learning-monorepo-poc/ui";

export default function HomePage() {
  const modules = [
    {
      slug: "math-basics",
      title: "Math Basics",
      description: "Master the fundamentals of mathematics with interactive exercises.",
      icon: <MathIcon />,
      difficulty: "Beginner",
      duration: "2 hours"
    },
    {
      slug: "introduction-to-react",
      title: "React Fundamentals",
      description: "Learn modern web development with React server components.",
      icon: <CodeIcon />,
      difficulty: "Intermediate",
      duration: "4 hours"
    },
    {
      slug: "system-design",
      title: "System Design",
      description: "Architect scalable distributed systems and microservices.",
      icon: <ServerIcon />,
      difficulty: "Advanced",
      duration: "6 hours"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-12 text-left shadow-lg">
        <div className="relative z-10 flex justify-between items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
              Continue Learning
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              You're making great progress! Pick up where you left off in <strong>Math Basics</strong> or explore a new topic below.
            </p>
            <Link href="/projects/math-basics">
              <Button className="bg-white !text-blue-600 hover:!bg-blue-50 dark:!text-blue-600 dark:!bg-white dark:hover:!bg-blue-50 border-none px-6 py-3 text-base rounded-lg font-semibold">
                Resume Math Basics
              </Button>
            </Link>
          </div>
          <div className="hidden md:block text-white opacity-20">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Modules</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Select a module to start learning</p>
          </div>
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">All</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">In Progress</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: any }) {
  return (
    <Link href={`/projects/${module.slug}`} className="block group">
      <Card className="h-full p-6 transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 group-hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
            {module.icon}
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            module.difficulty === "Beginner" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
            module.difficulty === "Intermediate" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}>
            {module.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {module.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2">
          {module.description}
        </p>

        <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm mt-auto">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {module.duration}
        </div>
      </Card>
    </Link>
  );
}

// Icons
function MathIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7h6m-6 4h6m-6 4h6M5 7h.01M5 11h.01M5 15h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polyline points="16 18 22 12 16 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="8 6 2 12 8 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
