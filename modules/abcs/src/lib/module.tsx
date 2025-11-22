import { ClientModule } from "./client-module";

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
export async function Module() {
  // In a real app, we might fetch this data from a database or CMS
  const alphabetData = [
    { letter: "A", word: "Apple", emoji: "🍎" },
    { letter: "B", word: "Ball", emoji: "⚽" },
    { letter: "C", word: "Cat", emoji: "🐱" },
    { letter: "D", word: "Dog", emoji: "🐶" },
    { letter: "E", word: "Elephant", emoji: "🐘" },
    { letter: "F", word: "Fish", emoji: "🐟" },
    { letter: "G", word: "Grapes", emoji: "🍇" },
    { letter: "H", word: "House", emoji: "🏠" },
    { letter: "I", word: "Ice Cream", emoji: "🍦" },
    { letter: "J", word: "Juice", emoji: "🧃" },
    { letter: "K", word: "Kite", emoji: "🪁" },
    { letter: "L", word: "Lion", emoji: "🦁" },
    { letter: "M", word: "Moon", emoji: "🌙" },
    { letter: "N", word: "Nest", emoji: "🪺" },
    { letter: "O", word: "Orange", emoji: "🍊" },
    { letter: "P", word: "Pizza", emoji: "🍕" },
    { letter: "Q", word: "Queen", emoji: "👑" },
    { letter: "R", word: "Rainbow", emoji: "🌈" },
    { letter: "S", word: "Sun", emoji: "☀️" },
    { letter: "T", word: "Tree", emoji: "🌳" },
    { letter: "U", word: "Umbrella", emoji: "☂️" },
    { letter: "V", word: "Volcano", emoji: "🌋" },
    { letter: "W", word: "Watermelon", emoji: "🍉" },
    { letter: "X", word: "Xylophone", emoji: "🎹" },
    { letter: "Y", word: "Yo-yo", emoji: "🪀" },
    { letter: "Z", word: "Zebra", emoji: "🦓" },
  ];

  return <ClientModule initialData={alphabetData} />;
}
