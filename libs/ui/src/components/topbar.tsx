"use client";

import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  return (
    <header className="bg-white dark:bg-gray-900 h-16 flex items-center justify-between px-8 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Handshake AI Learning</h1>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <BellIcon />
        </button>

        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
          GJ
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
