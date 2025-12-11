"use client";

import { useMemo, useState } from "react";
import { Button, Card } from "@learning-monorepo-poc/ui";

export type LessonStep = {
  title: string;
  focus: string;
  description: string;
  code: string;
  checklist: string[];
  keywords: string[];
};

export type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  snippet?: string;
};

export type ClientModuleProps = {
  lessonPlan: LessonStep[];
  quizQuestions: QuizQuestion[];
};

type Phase = "lesson" | "quiz" | "results";

const cheatSheet = [
  {
    label: "Primitives",
    example: "const active: boolean = true;",
    tip: "Annotate values shared outside the file.",
  },
  {
    label: "Objects",
    example: "type User = { id: string; name: string };",
    tip: "Prefer type aliases for flexible shapes.",
  },
  {
    label: "Functions",
    example: "const add = (a: number, b: number): number => a + b;",
    tip: "Types live on both params and return values.",
  },
  {
    label: "Unions",
    example: "type Mode = \"view\" | \"edit\";",
    tip: "Narrow with equality or typeof checks.",
  },
] as const;

export function ClientModule({
  lessonPlan,
  quizQuestions,
}: ClientModuleProps) {
  const [phase, setPhase] = useState<Phase>("lesson");
  const [lessonStep, setLessonStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verdicts, setVerdicts] = useState<Record<string, boolean>>({});
  const [responses, setResponses] = useState<Record<string, number>>({});

  const currentLesson = lessonPlan[lessonStep];
  const currentQuestion = quizQuestions[questionIndex];

  const lessonProgress = Math.round(
    ((lessonStep + 1) / lessonPlan.length) * 100
  );

  const score = useMemo(
    () => Object.values(verdicts).filter(Boolean).length,
    [verdicts]
  );

  const totalQuestions = quizQuestions.length;

  const startQuiz = () => {
    setPhase("quiz");
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setVerdicts({});
    setResponses({});
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.answerIndex;
    setIsSubmitted(true);
    setVerdicts((prev) => ({ ...prev, [currentQuestion.id]: isCorrect }));
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }));
  };

  const gotoNextQuestion = () => {
    if (questionIndex === totalQuestions - 1) {
      setPhase("results");
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const restartLessons = () => {
    setPhase("lesson");
    setLessonStep(0);
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setVerdicts({});
    setResponses({});
  };

  const incorrectQuestions = useMemo(() => {
    return quizQuestions.filter((question) => verdicts[question.id] === false);
  }, [quizQuestions, verdicts]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card className="p-6 shadow-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Guided lesson + quiz
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            TypeScript Basics
          </h1>
          <p className="text-base text-slate-200 max-w-2xl">
            Build intuition for TypeScript’s type system, then prove what you
            learned with a short certification-style quiz.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-sm text-slate-300">
            <span className="px-3 py-1 rounded-full border border-white/20">
              4 lesson cards
            </span>
            <span className="px-3 py-1 rounded-full border border-white/20">
              5 quiz questions
            </span>
            <span className="px-3 py-1 rounded-full border border-white/20">
              Hands-on practice
            </span>
          </div>
        </div>
      </Card>

      {phase === "lesson" && (
        <div className="space-y-4">
          <LessonStepper
            step={lessonStep}
            totalSteps={lessonPlan.length}
            progress={lessonProgress}
            lesson={currentLesson}
            onNext={() => setLessonStep((step) => Math.min(step + 1, lessonPlan.length - 1))}
            onBack={() => setLessonStep((step) => Math.max(step - 1, 0))}
            onStartQuiz={startQuiz}
          />

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Quick TypeScript cheat sheet
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Save for future reference
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cheatSheet.map((item) => (
                <div
                  key={item.label}
                  className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/60 dark:bg-slate-900/40"
                >
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                    {item.label}
                  </p>
                  <p className="font-mono text-sm bg-white dark:bg-slate-900/60 rounded-md px-3 py-2 text-slate-800 dark:text-slate-200 mb-2">
                    {item.example}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {phase === "quiz" && currentQuestion && (
        <QuizPanel
          question={currentQuestion}
          index={questionIndex}
          total={totalQuestions}
          selectedOption={selectedOption}
          isSubmitted={isSubmitted}
          verdict={verdicts[currentQuestion.id]}
          onSelect={setSelectedOption}
          onSubmit={submitAnswer}
          onNext={gotoNextQuestion}
        />
      )}

      {phase === "results" && (
        <ResultsPanel
          score={score}
          total={totalQuestions}
          incorrect={incorrectQuestions}
          responses={responses}
          onRetry={() => {
            setPhase("quiz");
            setQuestionIndex(0);
            setSelectedOption(null);
            setIsSubmitted(false);
            setVerdicts({});
            setResponses({});
          }}
          onReviewLessons={restartLessons}
        />
      )}
    </div>
  );
}

function LessonStepper({
  step,
  totalSteps,
  progress,
  lesson,
  onNext,
  onBack,
  onStartQuiz,
}: {
  step: number;
  totalSteps: number;
  progress: number;
  lesson: LessonStep;
  onNext: () => void;
  onBack: () => void;
  onStartQuiz: () => void;
}) {
  const isLast = step === totalSteps - 1;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Step {step + 1} of {totalSteps}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {lesson.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300">{lesson.focus}</p>
          </div>
          <div className="min-w-[160px]">
            <div className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Lesson progress {progress}%
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          {lesson.description}
        </p>

        <pre className="bg-slate-900 text-slate-100 text-sm rounded-xl p-4 overflow-auto">
{lesson.code}
        </pre>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Checklist
            </p>
            <ul className="space-y-2">
              {lesson.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-slate-700 dark:text-slate-200"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {lesson.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          {step > 0 && (
            <Button variant="ghost" onClick={onBack}>
              Back
            </Button>
          )}
          {!isLast && (
            <Button onClick={onNext} className="min-w-[160px]">
              Next concept
            </Button>
          )}
          {isLast && (
            <Button
              onClick={onStartQuiz}
              className="min-w-[200px] bg-green-600 hover:bg-green-700 text-white"
            >
              I'm ready for the quiz
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function QuizPanel({
  question,
  index,
  total,
  selectedOption,
  isSubmitted,
  verdict,
  onSelect,
  onSubmit,
  onNext,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  selectedOption: number | null;
  isSubmitted: boolean;
  verdict?: boolean;
  onSelect: (optionIndex: number) => void;
  onSubmit: () => void;
  onNext: () => void;
}) {
  const actionLabel =
    isSubmitted && index === total - 1 ? "See results" : isSubmitted ? "Next question" : "Check answer";

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Question {index + 1} of {total}
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {question.prompt}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Category: {question.category}
          </p>
        </div>
        <div className="min-w-[160px]">
          <div className="text-xs font-semibold text-right text-slate-500 dark:text-slate-400 mb-1">
            Progress {Math.round(((index + 1) / total) * 100)}%
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {question.snippet && (
        <pre className="bg-slate-900 text-slate-100 text-sm rounded-xl p-4 overflow-auto">
{question.snippet}
        </pre>
      )}

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => {
          const isActive = selectedOption === optionIndex;
          const isCorrect = optionIndex === question.answerIndex;

          let borderClasses =
            "border-2 rounded-xl px-4 py-3 text-left transition-all hover:border-indigo-500";

          if (!isSubmitted && isActive) {
            borderClasses += " border-indigo-600 bg-indigo-50";
          }

          if (isSubmitted) {
            if (isCorrect) {
              borderClasses += " border-emerald-500 bg-emerald-50";
            } else if (isActive && !verdict) {
              borderClasses += " border-rose-500 bg-rose-50";
            } else {
              borderClasses += " opacity-70";
            }
          }

          return (
            <button
              key={option}
              className={borderClasses}
              disabled={isSubmitted}
              onClick={() => onSelect(optionIndex)}
            >
              <span className="font-medium text-slate-900 dark:text-white">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {isSubmitted && (
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              verdict
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {verdict ? "Nice! That's correct." : "Not quite. Review the explanation below."}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={isSubmitted ? onNext : onSubmit}
            disabled={!isSubmitted && selectedOption === null}
            className="min-w-[180px]"
          >
            {actionLabel}
          </Button>
        </div>

        {isSubmitted && (
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold mb-1 text-slate-800 dark:text-slate-100">
              Explanation
            </p>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function ResultsPanel({
  score,
  total,
  incorrect,
  responses,
  onRetry,
  onReviewLessons,
}: {
  score: number;
  total: number;
  incorrect: QuizQuestion[];
  responses: Record<string, number>;
  onRetry: () => void;
  onReviewLessons: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 80;

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-3">
        <div className="text-6xl">{passed ? "🚀" : "🛠️"}</div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {passed ? "Certified TS Beginner!" : "Almost there"}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {passed
            ? "Great fundamentals! Keep practicing by annotating more real-world code."
            : "Revisit the lessons, tighten your intuition, and retry the quiz when ready."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-center">
          <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
            Score
          </p>
          <p className="text-4xl font-bold text-slate-900 dark:text-white">
            {score}/{total}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-center">
          <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
            Accuracy
          </p>
          <p className="text-4xl font-bold text-slate-900 dark:text-white">
            {percentage}%
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-center">
          <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
            Next step
          </p>
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            {passed ? "Try advanced generics" : "Master narrowing"}
          </p>
        </div>
      </div>

      {incorrect.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Review these questions
          </p>
          {incorrect.map((question) => {
            const answer = responses[question.id];
            return (
              <div
                key={question.id}
                className="border border-rose-100 dark:border-rose-900/40 rounded-xl p-4 bg-rose-50/60 dark:bg-rose-900/20"
              >
                <p className="text-sm font-semibold text-rose-700 dark:text-rose-300 mb-1">
                  {question.prompt}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-1">
                  Your answer:{" "}
                  <span className="font-semibold">
                    {typeof answer === "number" ? question.options[answer] : "No answer"}
                  </span>
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Correct: {question.options[question.answerIndex]}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {question.explanation}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onReviewLessons}>
          Review lessons
        </Button>
        <Button onClick={onRetry} className="min-w-[180px]">
          Retry quiz
        </Button>
      </div>
    </Card>
  );
}

