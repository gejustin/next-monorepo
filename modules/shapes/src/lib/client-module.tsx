"use client";

import { useState } from "react";
import { Card, Button } from "@learning-monorepo-poc/ui";

interface Shape {
  id: string;
  name: string;
  sides: number;
  color: string;
  description: string;
}

export function ClientModule({ shapes }: { shapes: Shape[] }) {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState<Shape | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const startQuiz = () => {
    setQuizMode(true);
    setSelectedShape(null);
    setFeedback("");
    // Need to wait for state update or just call nextQuestion logic directly with current shapes
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setQuizTarget(randomShape);
  };

  const nextQuestion = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setQuizTarget(randomShape);
    setFeedback("");
  };

  const handleShapeClick = (shape: Shape) => {
    if (quizMode) {
      if (shape.id === quizTarget?.id) {
        setFeedback("Correct! Great job!");
        setTimeout(nextQuestion, 1500);
      } else {
        setFeedback("Try again!");
      }
    } else {
      setSelectedShape(shape);
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Learn about Shapes</h1>
            <Button onClick={() => {
                const newMode = !quizMode;
                setQuizMode(newMode);
                setFeedback("");
                setSelectedShape(null);
                if (newMode) {
                     const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
                     setQuizTarget(randomShape);
                } else {
                    setQuizTarget(null);
                }
            }}>
                {quizMode ? "Exit Quiz" : "Start Quiz"}
            </Button>
        </div>

        {quizMode && quizTarget && (
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 text-center">
                <h2 className="text-xl font-semibold">
                    Find the <span className="font-bold text-blue-600 dark:text-blue-400">{quizTarget.name}</span>!
                </h2>
                {feedback && (
                    <p className={`text-lg mt-2 font-bold ${feedback.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                        {feedback}
                    </p>
                )}
            </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shapes.map((shape) => (
                <div key={shape.id} onClick={() => handleShapeClick(shape)} className="cursor-pointer group flex flex-col items-center">
                    <div className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all transform group-hover:scale-105 hover:shadow-lg ${selectedShape?.id === shape.id ? 'ring-4 ring-offset-2 ring-blue-500' : ''} bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700`}>

                         {shape.id === 'triangle' ? (
                             <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-green-500"></div>
                         ) : (
                            <div className={`${shape.id === 'rectangle' ? 'w-32 h-20' : 'w-24 h-24'} ${shape.color} ${shape.id === 'circle' ? 'rounded-full' : 'rounded-md'}`}></div>
                         )}
                    </div>
                    <p className="text-center mt-3 font-medium text-lg">{shape.name}</p>
                </div>
            ))}
        </div>

        {!quizMode && selectedShape && (
            <Card className="p-6 mt-6 animate-in fade-in slide-in-from-bottom-4 border-l-4 border-l-blue-500">
                <h2 className="text-2xl font-bold mb-2">{selectedShape.name}</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">{selectedShape.description}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">It has <strong>{selectedShape.sides}</strong> sides.</p>
            </Card>
        )}
    </div>
  );
}
