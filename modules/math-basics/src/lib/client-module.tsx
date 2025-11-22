"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@learning-monorepo-poc/ui";

// --- Types ---

type Operation = "addition" | "subtraction";

interface Question {
  id: string;
  a: number;
  b: number;
  op: Operation;
  correctAnswer: number;
  options: number[];
}

type Phase = "lesson" | "quiz" | "results";

// --- Helper Functions ---

function generateOptions(correctAnswer: number): number[] {
  const options = new Set<number>();
  options.add(correctAnswer);

  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 10) - 5; // Random offset between -5 and 4
    const candidate = correctAnswer + offset;
    if (candidate >= 0 && candidate !== correctAnswer) {
      options.add(candidate);
    }
  }
  return Array.from(options).sort((a, b) => a - b);
}

function generateQuizQuestions(count: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const op = Math.random() > 0.5 ? "addition" : "subtraction";
    let a, b, correctAnswer;

    if (op === "addition") {
      a = Math.floor(Math.random() * 11); // 0-10
      b = Math.floor(Math.random() * 11); // 0-10
      correctAnswer = a + b;
    } else {
      // Ensure positive result
      a = Math.floor(Math.random() * 21); // 0-20
      b = Math.floor(Math.random() * (a + 1)); // 0-a
      correctAnswer = a - b;
    }

    questions.push({
      id: Math.random().toString(36).substr(2, 9),
      a,
      b,
      op,
      correctAnswer,
      options: generateOptions(correctAnswer),
    });
  }
  return questions;
}

// --- Components ---

export function ClientModule() {
  const [phase, setPhase] = useState<Phase>("lesson");
  const [lessonStep, setLessonStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const newQuestions = generateQuizQuestions(10);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setPhase("quiz");
  };

  const handleQuizComplete = (finalAnswers: Record<string, boolean>) => {
    const correctCount = Object.values(finalAnswers).filter((v) => v).length;
    setScore(correctCount);
    setPhase("results");
  };

  const restart = () => {
    setLessonStep(0);
    setPhase("lesson");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {phase === "lesson" && (
        <LessonView
          step={lessonStep}
          setStep={setLessonStep}
          onComplete={startQuiz}
        />
      )}

      {phase === "quiz" && (
        <QuizView
          questions={questions}
          currentIndex={currentQuestionIndex}
          setIndex={setCurrentQuestionIndex}
          onComplete={handleQuizComplete}
          answers={userAnswers}
          setAnswers={setUserAnswers}
        />
      )}

      {phase === "results" && (
        <ResultsView
          score={score}
          total={questions.length}
          onRetry={startQuiz}
          onReview={restart}
        />
      )}
    </div>
  );
}

function LessonView({
  step,
  setStep,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  onComplete: () => void;
}) {
  const steps = [
    {
      title: "Welcome to Math Basics",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We're going to learn how to add and subtract numbers up to 20.
          </p>
          <div className="flex justify-center py-8">
            <span className="text-6xl">🧮</span>
          </div>
          <p className="dark:text-gray-300">You'll master these concepts in no time!</p>
        </div>
      ),
    },
    {
      title: "Addition: Combining Numbers",
      content: (
        <div className="space-y-6">
          <p className="text-lg dark:text-gray-300">
            Addition is when we bring two groups of things together.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl flex items-center justify-center gap-4 text-4xl">
            <div className="flex flex-col items-center">
              <span>🍎🍎</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">2</span>
            </div>
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
              <span>+</span>
              <span className="text-sm mt-2 invisible">0</span>
            </div>
            <div className="flex flex-col items-center">
              <span>🍎🍎🍎</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">3</span>
            </div>
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
              <span>=</span>
              <span className="text-sm mt-2 invisible">0</span>
            </div>
            <div className="flex flex-col items-center font-bold text-blue-600 dark:text-blue-400">
              <span>🍎🍎🍎🍎🍎</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">5</span>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">2 plus 3 equals 5</p>
        </div>
      ),
    },
    {
      title: "Subtraction: Taking Away",
      content: (
        <div className="space-y-6">
          <p className="text-lg dark:text-gray-300">
            Subtraction is when we take some things away from a group.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl flex items-center justify-center gap-4 text-4xl">
            <div className="flex flex-col items-center">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">5</span>
            </div>
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
              <span>-</span>
              <span className="text-sm mt-2 invisible">0</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <span>⭐⭐</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">2</span>
            </div>
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
              <span>=</span>
              <span className="text-sm mt-2 invisible">0</span>
            </div>
            <div className="flex flex-col items-center font-bold text-red-600 dark:text-red-400">
              <span>⭐⭐⭐</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">3</span>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">5 minus 2 equals 3</p>
        </div>
      ),
    },
  ];

  const currentLesson = steps[step];

  return (
    <Card className="min-h-[400px] flex flex-col overflow-hidden shadow-lg">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentLesson.title}
          </h2>
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        {currentLesson.content}
      </div>

      <div className="p-6 flex justify-end gap-4">
        {step > 0 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>Next Lesson</Button>
        ) : (
          <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white transition-all active:scale-95">
            Ready for Quiz?
          </Button>
        )}
      </div>
    </Card>
  );
}

function QuizView({
  questions,
  currentIndex,
  setIndex,
  onComplete,
  answers,
  setAnswers,
}: {
  questions: Question[];
  currentIndex: number;
  setIndex: (i: number) => void;
  onComplete: (answers: Record<string, boolean>) => void;
  answers: Record<string, boolean>;
  setAnswers: (a: Record<string, boolean>) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [currentIndex]);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === question.correctAnswer;
    const newAnswers = { ...answers, [question.id]: isCorrect };
    setAnswers(newAnswers);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex(currentIndex + 1);
    }
  };

  return (
    <Card className="p-8 shadow-xl rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      {/* Header / Progress */}
      <div className="space-y-4 mb-12">
        <div className="text-sm font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 dark:bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Display */}
      <div className="text-center mb-12">
        <div className="text-8xl sm:text-9xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-6 tabular-nums">
          <span>{question.a}</span>
          <span className="text-gray-400 dark:text-gray-600">
            {question.op === "addition" ? "+" : "−"}
          </span>
          <span>{question.b}</span>
          <span className="text-gray-400 dark:text-gray-600">=</span>
          <span className="text-blue-600 dark:text-blue-400">?</span>
        </div>
      </div>

      {/* Options Grid - fixed 2x2 layout */}
      <div
        className="grid grid-cols-2 gap-4 sm:gap-6 mb-12"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === question.correctAnswer;

          let className = "h-20 sm:h-24 text-2xl sm:text-3xl transition-all duration-200 active:scale-95";

          if (isSubmitted) {
            if (isCorrect) {
              className += " bg-green-100 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-500 dark:text-green-300";
            } else if (isSelected && !isCorrect) {
              className += " bg-red-100 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-500 dark:text-red-300";
            } else {
              className += " opacity-30 dark:opacity-20 grayscale border-gray-200 dark:border-gray-700";
            }
          } else {
            if (isSelected) {
              className += " border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-offset-2 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-offset-gray-900 dark:border-blue-500";
            } else {
              className += " bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800";
            }
          }

          return (
            <button
              key={opt}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(opt)}
              className={`border-2 rounded-2xl font-bold flex items-center justify-center ${className}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback & Action */}
      <div className="space-y-6">
        {/* Feedback Area - Fixed height to prevent layout jump */}
        <div className="h-8 flex items-center justify-center">
           {isSubmitted && (
            <div className="animate-in fade-in slide-in-from-bottom-2 font-medium text-lg">
              {selectedOption === question.correctAnswer ? (
                <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                   Correct! 🎉
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                   Incorrect. The answer is {question.correctAnswer}.
                </span>
              )}
            </div>
           )}
        </div>

        <div className="flex justify-center">
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full sm:w-auto min-w-[200px] h-12 text-lg rounded-xl transition-all ${
                selectedOption !== null
                  ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
              }`}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto min-w-[200px] h-12 text-lg rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {isLast ? "Finish Quiz" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function ResultsView({
  score,
  total,
  onRetry,
  onReview,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  onReview: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 80;

  return (
    <Card className="p-8 text-center shadow-lg">
      <div className="mb-8 animate-in fade-in zoom-in duration-500">
        <div className="text-8xl mb-6 drop-shadow-sm">{passed ? "🏆" : "💪"}</div>
        <h2 className="text-4xl font-bold mb-3 dark:text-white tracking-tight">
          {passed ? "Congratulations!" : "Keep Practicing!"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
          {passed
            ? "You've mastered these math concepts. Great work!"
            : "You're almost there. Try reviewing the lessons again to boost your score."}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl mb-10 inline-block w-full max-w-xs border border-gray-100 dark:border-gray-800 shadow-inner">
        <div className="text-6xl font-bold mb-2 text-gray-900 dark:text-white tabular-nums tracking-tighter">
          {score}<span className="text-3xl text-gray-400 dark:text-gray-600 font-normal">/{total}</span>
        </div>
        <div
          className={`text-lg font-bold uppercase tracking-widest ${
            passed ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
          }`}
        >
          {percentage}% Score
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRetry}
          variant="outline"
          className="h-12 px-8 text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Try Quiz Again
        </Button>
        <Button
          onClick={onReview}
          className="h-12 px-8 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Review Lessons
        </Button>
      </div>
    </Card>
  );
}
