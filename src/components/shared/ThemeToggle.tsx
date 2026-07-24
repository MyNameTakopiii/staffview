'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
      className={`px-3 py-2 min-h-[44px] rounded-xl font-semibold text-xs flex items-center gap-2 transition-all border focus:outline-none focus:ring-2 ${
        isLight
          ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 focus:ring-blue-500/40'
          : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 focus:ring-cyan-500/40'
      }`}
    >
      {isLight ? (
        <>
          <svg
            className="w-4 h-4 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="font-bold">Light Mode</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span className="font-bold">Dark Mode</span>
        </>
      )}
    </button>
  );
};
