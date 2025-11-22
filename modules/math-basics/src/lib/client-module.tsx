"use client";

import { Card, Button } from "@learning-monorepo-poc/ui";
import { useState, useMemo } from "react";

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
    <div className="flex flex-wrap gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-2xl">
          {symbol}
        </span>
      ))}
    </div>
  );
}

function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <Card className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Arithmetic Trainer</h1>
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        Master the basics of addition and subtraction! <br />
        We'll start with some quick lessons, then test your skills with a quiz.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10 max-w-sm mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg">
          <span className="block text-3xl mb-2">➕</span>
          <span className="font-semibold text-blue-700">Addition</span>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <span className="block text-3xl mb-2">➖</span>
          <span className="font-semibold text-purple-700">Subtraction</span>
        </div>
      </div>

      <Button size="lg" onClick={onStart} className="w-full sm:w-auto px-12">
        Start Learning
      </Button>
    </Card>
  );
}

function LessonView({ onComplete }: { onComplete: () => void }) {
  const [lessonStep, setLessonStep] = useState(0);
  const lesson = LESSONS[lessonStep];
  const isLastLesson = lessonStep === LESSONS.length - 1;

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
        <span>Lesson</span>
        <span>
          Step {lessonStep + 1} of {LESSONS.length}
        </span>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">{lesson.title}</h2>
      <p className="text-xl mb-8 text-gray-700">{lesson.text}</p>

      <div className="bg-gray-50 p-8 rounded-xl mb-8 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-4 text-4xl font-mono font-bold text-gray-800">
          <span>{lesson.a}</span>
          <span>{lesson.op === "addition" ? "+" : "-"}</span>
          <span>{lesson.b}</span>
          <span>=</span>
          <span className="text-blue-600">?</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <VisualAid count={lesson.a} symbol={lesson.visual} />
          </div>
          {lesson.op === "addition" && <span className="text-2xl text-gray-400">+</span>}
          {lesson.op === "subtraction" && <span className="text-2xl text-gray-400">-</span>}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <VisualAid count={lesson.b} symbol={lesson.visual} />
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="text-lg font-medium text-gray-600">{lesson.explanation}</p>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            Answer: {lesson.op === "addition" ? lesson.a + lesson.b : lesson.a - lesson.b}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setLessonStep((prev) => Math.max(0, prev - 1))}
          disabled={lessonStep === 0}
        >
          Previous
        </Button>

        {isLastLesson ? (
          <Button onClick={onComplete} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            Ready for Quiz?
          </Button>
        ) : (
          <Button onClick={() => setLessonStep((prev) => prev + 1)}>Next Lesson</Button>
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
  // Generate simple multiple choice options
  // Memoize options so they don't shuffle on re-render
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
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
        <span>Quiz Mode</span>
        <span>
          Question {index + 1} of {total}
        </span>
      </div>

      <div className="text-center mb-12">
        <div className="text-6xl font-mono font-bold text-gray-800 mb-8">
          {question.a} {question.op === "addition" ? "+" : "-"} {question.b} = ?
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {options.map((opt) => {
            let variant: "default" | "outline" = "outline";
            let className = "text-xl py-8";

            if (showFeedback) {
              if (opt === question.correctAnswer) {
                className += " bg-green-100 border-green-500 text-green-700 hover:bg-green-100";
              } else if (opt === selectedAnswer) {
                className += " bg-red-100 border-red-500 text-red-700 hover:bg-red-100";
              } else {
                className += " opacity-50";
              }
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className={`p-4 rounded-lg text-center mb-6 ${
              selectedAnswer === question.correctAnswer ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            <p className="font-bold text-lg">
              {selectedAnswer === question.correctAnswer
                ? "Correct! 🎉"
                : `Not quite. The answer is ${question.correctAnswer}.`}
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={onNext} size="lg">
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
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
    <Card className="p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Quiz Complete!</h2>

      <div className="mb-8">
        <div className="text-6xl font-bold mb-2 text-blue-600">{score}%</div>
        <p className="text-xl text-gray-600">
          You got {correctCount} out of {totalCount} correct.
        </p>
      </div>

      {passed ? (
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <p className="text-2xl font-bold text-green-700 mb-2">You Passed! 🏆</p>
          <p className="text-green-800">Great job mastering addition and subtraction!</p>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-xl mb-8">
          <p className="text-2xl font-bold text-yellow-700 mb-2">Almost there!</p>
          <p className="text-yellow-800">You need 80% to pass. Keep practicing!</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onReview}>
          Review Lessons
        </Button>
        <Button onClick={onRetry}>Try Again</Button>
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
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
