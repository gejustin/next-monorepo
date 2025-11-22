"use client";

import { Card, Button } from "@learning-monorepo-poc/ui";
import { useState, useMemo, useEffect } from "react";

// --- Types ---

type Operation = "addition" | "subtraction";

interface Question {
  id: string;
  a: number;
  b: number;
  op: Operation;
  correctAnswer: number;
}

type Phase = "welcome" | "lesson" | "quiz" | "results";

interface Lesson {
  title: string;
  text: string;
  a: number;
  b: number;
  op: Operation;
  visual: string;
  explanation: string;
}

// --- Helpers ---

function generateQuizQuestions(count: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const op = Math.random() > 0.5 ? "addition" : "subtraction";
    let a = 0;
    let b = 0;

    if (op === "addition") {
      // Sum up to 20
      a = Math.floor(Math.random() * 11); // 0-10
      b = Math.floor(Math.random() * 11); // 0-10
    } else {
      // Subtraction: result >= 0
      a = Math.floor(Math.random() * 21); // 0-20
      b = Math.floor(Math.random() * (a + 1)); // 0 to a
    }

    questions.push({
      id: `q-${i}-${Date.now()}`,
      a,
      b,
      op,
      correctAnswer: op === "addition" ? a + b : a - b,
    });
  }
  return questions;
}

const LESSONS: Lesson[] = [
  {
    title: "Let's Add!",
    text: "Addition is bringing numbers together.",
    a: 2,
    b: 3,
    op: "addition",
    visual: "🍎",
    explanation: "2 apples plus 3 apples equals 5 apples.",
  },
  {
    title: "Adding Bigger Numbers",
    text: "It works the same way for bigger groups.",
    a: 5,
    b: 4,
    op: "addition",
    visual: "⭐️",
    explanation: "5 stars and 4 stars make 9 stars.",
  },
  {
    title: "Let's Subtract!",
    text: "Subtraction is taking numbers away.",
    a: 5,
    b: 2,
    op: "subtraction",
    visual: "🍪",
    explanation: "If you have 5 cookies and eat 2, you have 3 left.",
  },
  {
    title: "Zero",
    text: "If you take away everything, you have zero.",
    a: 3,
    b: 3,
    op: "subtraction",
    visual: "🎈",
    explanation: "3 balloons minus 3 balloons is 0 balloons.",
  },
];

// --- Components ---

function VisualAid({ count, symbol }: { count: number; symbol: string }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="text-3xl transform hover:scale-125 transition-transform duration-200 cursor-default animate-in zoom-in fade-in fill-mode-backwards"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const progress = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
        <span>{label}</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <Card className="p-8 md:p-12 max-w-2xl mx-auto text-center shadow-xl border-0 ring-1 ring-slate-900/5 rounded-3xl backdrop-blur-sm bg-white/90">
      <div className="mb-8 inline-flex p-4 bg-blue-50 rounded-full text-5xl animate-bounce">
        👋
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
        Arithmetic Trainer
      </h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto">
        Master the basics of addition and subtraction! We'll start with simple lessons, then test your skills.
      </p>

      <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12 max-w-md mx-auto">
        <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 transition-all hover:shadow-md hover:-translate-y-1">
          <span className="block text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">➕</span>
          <span className="font-bold text-blue-700 text-lg">Addition</span>
        </div>
        <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 transition-all hover:shadow-md hover:-translate-y-1">
          <span className="block text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">➖</span>
          <span className="font-bold text-purple-700 text-lg">Subtraction</span>
        </div>
      </div>

      <Button
        size="lg"
        onClick={onStart}
        className="w-full sm:w-auto px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white font-bold"
      >
        Start Learning
      </Button>
    </Card>
  );
}

function LessonView({ onComplete }: { onComplete: () => void }) {
  const [lessonStep, setLessonStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const lesson = LESSONS[lessonStep];
  const isLastLesson = lessonStep === LESSONS.length - 1;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [lessonStep]);

  return (
    <Card className="p-8 md:p-10 max-w-2xl mx-auto shadow-xl border-0 ring-1 ring-slate-900/5 rounded-3xl bg-white/95">
      <ProgressBar current={lessonStep + 1} total={LESSONS.length} label="Lesson Progress" />

      <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        <h2 className="text-3xl font-bold mb-3 text-slate-900">{lesson.title}</h2>
        <p className="text-xl mb-8 text-slate-600 leading-relaxed">{lesson.text}</p>

        <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl mb-8 flex flex-col items-center justify-center gap-8 shadow-inner">
          <div className="flex items-center gap-6 text-5xl font-mono font-bold text-slate-800">
            <span className="w-16 text-center">{lesson.a}</span>
            <span className="text-blue-500">{lesson.op === "addition" ? "+" : "-"}</span>
            <span className="w-16 text-center">{lesson.b}</span>
            <span className="text-slate-400">=</span>
            <span className="text-indigo-600 w-16 text-center">?</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-w-[100px] flex justify-center items-center">
              <VisualAid count={lesson.a} symbol={lesson.visual} />
            </div>
            <span className="text-3xl text-slate-300 font-bold">
              {lesson.op === "addition" ? "+" : "-"}
            </span>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-w-[100px] flex justify-center items-center">
              <VisualAid count={lesson.b} symbol={lesson.visual} />
            </div>
          </div>

          <div className="text-center mt-2 p-4 bg-indigo-50 rounded-xl w-full border border-indigo-100">
            <p className="text-lg font-medium text-indigo-900 mb-2">{lesson.explanation}</p>
            <p className="text-3xl font-bold text-indigo-600">
              Answer: {lesson.op === "addition" ? lesson.a + lesson.b : lesson.a - lesson.b}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={() => setLessonStep((prev) => Math.max(0, prev - 1))}
          disabled={lessonStep === 0}
          className="rounded-full px-6 border-slate-200 hover:bg-slate-50 text-slate-600"
        >
          Previous
        </Button>

        {isLastLesson ? (
          <Button
            onClick={onComplete}
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-200 font-bold"
          >
            Start Quiz! 🚀
          </Button>
        ) : (
          <Button
            onClick={() => setLessonStep((prev) => prev + 1)}
            className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-md"
          >
            Next Lesson
          </Button>
        )}
      </div>
    </Card>
  );
}

interface QuizViewProps {
  question: Question;
  index: number;
  total: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  showFeedback: boolean;
  selectedAnswer: number | null;
  isLastQuestion: boolean;
}

function QuizView({
  question,
  index,
  total,
  onAnswer,
  onNext,
  showFeedback,
  selectedAnswer,
  isLastQuestion,
}: QuizViewProps) {
  const options = useMemo(() => {
    const correct = question.correctAnswer;
    const opts = new Set<number>([correct]);
    while (opts.size < 4) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const sign = Math.random() > 0.5 ? 1 : -1;
      const wrong = correct + offset * sign;
      if (wrong >= 0) opts.add(wrong);
    }
    return Array.from(opts).sort((a, b) => a - b);
  }, [question.id, question.correctAnswer]);

  return (
    <Card className="p-8 md:p-10 max-w-2xl mx-auto shadow-xl border-0 ring-1 ring-slate-900/5 rounded-3xl bg-white/95">
      <ProgressBar current={index + 1} total={total} label="Quiz Progress" />

      <div className="text-center mb-10 animate-in slide-in-from-right-8 fade-in duration-300">
        <div className="text-6xl md:text-7xl font-mono font-bold text-slate-800 mb-12 tracking-wider">
          {question.a} <span className="text-blue-500">{question.op === "addition" ? "+" : "-"}</span> {question.b} <span className="text-slate-300">=</span> <span className="text-indigo-600">?</span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto">
          {options.map((opt) => {
            let variant: "default" | "outline" = "outline";
            let className = "text-2xl py-8 rounded-2xl transition-all duration-200 border-2";

            if (showFeedback) {
              if (opt === question.correctAnswer) {
                className += " bg-green-50 border-green-500 text-green-700 hover:bg-green-50 ring-4 ring-green-100";
              } else if (opt === selectedAnswer) {
                className += " bg-red-50 border-red-500 text-red-700 hover:bg-red-50 opacity-50";
              } else {
                className += " opacity-30 border-slate-100";
              }
            } else {
              className += " border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md hover:-translate-y-1";
            }

            return (
              <Button
                key={opt}
                variant={variant}
                className={className}
                onClick={() => onAnswer(opt)}
                disabled={showFeedback}
              >
                {opt}
              </Button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <div className="animate-in zoom-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col items-center">
          <div
            className={`px-8 py-4 rounded-2xl text-center mb-8 shadow-sm border ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-50 border-green-100 text-green-800"
                : "bg-red-50 border-red-100 text-red-800"
            }`}
          >
            <p className="font-bold text-xl flex items-center gap-2">
              {selectedAnswer === question.correctAnswer
                ? <><span>🎉</span> Correct! Great job!</>
                : <><span>😕</span> Not quite. The answer is {question.correctAnswer}.</>
              }
            </p>
          </div>
          <Button
            onClick={onNext}
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all bg-slate-900 text-white font-bold"
          >
            {isLastQuestion ? "See Results 🏆" : "Next Question ➡️"}
          </Button>
        </div>
      )}
    </Card>
  );
}

interface ResultsViewProps {
  score: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  onRetry: () => void;
  onReview: () => void;
}

function ResultsView({ score, correctCount, totalCount, passed, onRetry, onReview }: ResultsViewProps) {
  return (
    <Card className="p-10 md:p-12 max-w-2xl mx-auto text-center shadow-2xl border-0 ring-1 ring-slate-900/5 rounded-3xl bg-white relative overflow-hidden">
      {passed && (
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent" />
      )}

      <div className="mb-8 relative">
        <div className="text-8xl mb-4 animate-bounce">
          {passed ? "🏆" : "💪"}
        </div>
        <h2 className="text-4xl font-black mb-2 text-slate-900">
          {passed ? "You Did It!" : "Good Try!"}
        </h2>
        <p className="text-xl text-slate-500">
          {passed ? "You're a math wizard!" : "Keep practicing, you'll get it!"}
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
        <div className="text-7xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {score}%
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xl font-medium text-slate-600">
          You got <span className={passed ? "text-green-600" : "text-yellow-600"}>{correctCount}</span> out of {totalCount} correct
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          variant="outline"
          onClick={onReview}
          className="rounded-full px-8 py-4 text-lg border-2 hover:bg-slate-50"
        >
          Review Lessons
        </Button>
        <Button
          onClick={onRetry}
          className="rounded-full px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200"
        >
          Try Again ↺
        </Button>
      </div>
    </Card>
  );
}

export function ClientModule() {
  const [phase, setPhase] = useState<Phase>("welcome");

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Start Quiz
  const startQuiz = () => {
    setQuizQuestions(generateQuizQuestions(10));
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setSelectedAnswer(null);
    setPhase("quiz");
  };

  // Handle Answer Selection
  const handleAnswer = (answer: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQ = quizQuestions[currentQuestionIndex];

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    } else {
      setPhase("results");
    }
  };

  // Results Calculation
  const results = useMemo(() => {
    if (quizQuestions.length === 0) return { score: 0, correctCount: 0, passed: false };
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const score = Math.round((correct / quizQuestions.length) * 100);
    return {
      score,
      correctCount: correct,
      passed: score >= 80,
    };
  }, [quizQuestions, answers]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-4xl mx-auto">
        {phase === "welcome" && <WelcomeView onStart={() => setPhase("lesson")} />}

        {phase === "lesson" && <LessonView onComplete={startQuiz} />}

        {phase === "quiz" && quizQuestions[currentQuestionIndex] && (
          <QuizView
            question={quizQuestions[currentQuestionIndex]}
            index={currentQuestionIndex}
            total={quizQuestions.length}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            showFeedback={showFeedback}
            selectedAnswer={selectedAnswer}
            isLastQuestion={currentQuestionIndex === quizQuestions.length - 1}
          />
        )}

        {phase === "results" && (
          <ResultsView
            score={results.score}
            correctCount={results.correctCount}
            totalCount={quizQuestions.length}
            passed={results.passed}
            onRetry={startQuiz}
            onReview={() => setPhase("lesson")}
          />
        )}
      </div>
    </div>
  );
}
