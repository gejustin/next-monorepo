import {
  ClientModule,
  type LessonStep,
  type QuizQuestion,
} from "./client-module";

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
const lessonPlan: LessonStep[] = [
  {
    title: "Why TypeScript at all?",
    focus: "Adopt a typed mindset to catch bugs before runtime.",
    description:
      "TypeScript layers a type system on top of JavaScript. It documents intent, powers editor tooling, and shifts feedback left so mistakes are caught while coding.",
    code: `const username: string = "Ada Lovelace";
let isDarkMode = false; // inferred as boolean

// compile-time error: Type 'number' is not assignable to type 'string'
// username = 42;`,
    checklist: [
      "Annotate boundary inputs (API payloads, component props)",
      "Rely on inference for simple internal values",
      "Embrace compiler errors as friendly guard rails",
    ],
    keywords: ["static analysis", "feedback loop", "tooling"],
  },
  {
    title: "Annotations & inference",
    focus: "Mix explicit annotations with inference for clarity.",
    description:
      "TypeScript can often infer the right type, but annotations communicate intent when inference is ambiguous or when you want to lock something down.",
    code: `const scores = [89, 93, 77]; // number[]
const topScore = scores[0];

type Theme = "light" | "dark";
let currentTheme: Theme = "light";
currentTheme = "dark";`,
    checklist: [
      "Use literal unions for constrained values",
      "Annotate objects that cross module boundaries",
      "Let TS infer local implementation details",
    ],
    keywords: ["inference", "literal types", "unions"],
  },
  {
    title: "Functions, interfaces & generics",
    focus: "Describe the shape of functions and objects.",
    description:
      "Interfaces and type aliases capture the structure of data, while generics keep helpers flexible without losing type information.",
    code: `interface User {
  id: string;
  name: string;
  isAdmin?: boolean;
}

function toLabel<T extends { name: string }>(entity: T) {
  return entity.name.toUpperCase();
}`,
    checklist: [
      "Use optional properties for truly optional data",
      "Prefer readonly when values must not mutate",
      "Use generics to keep helpers reusable",
    ],
    keywords: ["interfaces", "generics", "optional props"],
  },
  {
    title: "Union types & narrowing",
    focus: "Model multiple possibilities and narrow them safely.",
    description:
      "Unions let variables represent multiple shapes. Type guards (typeof, in, equality checks) narrow to a specific branch before you use it.",
    code: `type Result = { status: "ok"; value: number } | { status: "error"; message: string };

function handle(result: Result) {
  if (result.status === "ok") {
    return result.value.toFixed(1);
  }
  return result.message;
}`,
    checklist: [
      "Create discriminated unions with a shared literal field",
      "Narrow using equality checks or custom type predicates",
      "Avoid casting unless you absolutely know better than TS",
    ],
    keywords: ["unions", "narrowing", "type guards"],
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: "annotation-basics",
    category: "Annotations",
    prompt: "Which snippet correctly forces count to stay numeric?",
    snippet: `// choose the safest declaration
???`,
    options: [
      "let count;",
      "let count: number = 0;",
      "const count = \"0\";",
      "count!: number;",
    ],
    answerIndex: 1,
    explanation:
      "Annotating with `: number` locks the variable to numbers. The other options either allow any type, start as a string, or use the non-null assertion without a declaration.",
  },
  {
    id: "inference-trap",
    category: "Inference",
    prompt:
      "Given `const status = \"ready\" as const`, what is the inferred type of status?",
    options: [
      "string",
      "\"ready\"",
      "string | undefined",
      "never",
    ],
    answerIndex: 1,
    explanation:
      "Using `as const` preserves literal types, so `status` is the string literal type `\"ready\"`, not the broader `string`.",
  },
  {
    id: "interface-optionals",
    category: "Interfaces",
    prompt: "How do you mark `nickname` as optional on a `User` interface?",
    snippet: `interface User {
  id: string;
  nickname ??? string;
}`,
    options: ["nickname =?", "nickname?:", "nickname!:", "nickname??:"],
    answerIndex: 1,
    explanation:
      "Optional properties use the `?:` modifier (`nickname?: string`). TypeScript will then allow the property to be omitted.",
  },
  {
    id: "union-guard",
    category: "Unions",
    prompt:
      "Which check safely narrows `payload` defined as `string | number`?",
    options: [
      "if (payload)",
      "if (typeof payload === \"number\")",
      "if (payload as number)",
      "if (!!payload)",
    ],
    answerIndex: 1,
    explanation:
      "`typeof payload === \"number\"` is a built-in type guard that narrows the union to the numeric branch inside the block.",
  },
  {
    id: "generic-helper",
    category: "Generics",
    prompt:
      "Complete the function so it keeps the type of whatever is passed in.",
    snippet: `function wrap(value ???) {
  return { value };
}`,
    options: [
      "<T>(value: T)",
      "<T extends unknown>(value: never)",
      "(value: any)",
      "(value: unknown)",
    ],
    answerIndex: 0,
    explanation:
      "Declaring the function as `<T>(value: T)` makes it generic. The returned object will preserve the specific type of `value`.",
  },
];

export async function Module() {
  return <ClientModule lessonPlan={lessonPlan} quizQuestions={quizQuestions} />;
}

