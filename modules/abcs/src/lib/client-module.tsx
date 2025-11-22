"use client";

import { useState } from "react";
import { Card, Button } from "@learning-monorepo-poc/ui";

type AlphabetItem = {
  letter: string;
  word: string;
  emoji: string;
};

interface ClientModuleProps {
  initialData: AlphabetItem[];
}

/**
 * ClientModule - Client component for interactive UI
 */
export function ClientModule({ initialData }: ClientModuleProps) {
  const [selectedItem, setSelectedItem] = useState<AlphabetItem | null>(initialData[0]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Learn the ABCs</h1>
        <p className="text-gray-500 dark:text-gray-400">Click a letter to learn more about it!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Display Area */}
        <Card className="md:col-span-1 p-8 flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 bg-primary/5 border-2 border-primary/20">
          {selectedItem ? (
            <>
              <div className="text-9xl font-black text-primary animate-in zoom-in duration-300">
                {selectedItem.letter}
              </div>
              <div className="text-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                {selectedItem.emoji}
              </div>
              <div className="text-2xl font-medium text-primary/80 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {selectedItem.word}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Select a letter to begin</p>
          )}
        </Card>

        {/* Grid of Letters */}
        <Card className="md:col-span-2 p-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {initialData.map((item) => (
              <Button
                key={item.letter}
                variant={selectedItem?.letter === item.letter ? "default" : "outline"}
                className={`h-14 text-xl font-bold transition-all hover:scale-110 ${
                  selectedItem?.letter === item.letter ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                {item.letter}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
