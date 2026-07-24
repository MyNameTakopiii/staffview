'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ArrowRightIcon, UserIcon, ChartIcon } from '@/components/shared/Icons';
import { useTheme } from '@/context/ThemeContext';

export const NotFoundContainer: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="min-h-screen bg-main text-text-main flex flex-col transition-colors duration-200">
      <Header title="404 — Page Not Found" subtitle="Agnos Healthcare Portal" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <section aria-labelledby="not-found-heading" className="max-w-xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
            <span>Error 404 — Route Not Found</span>
          </div>

          {/* 404 Big Display */}
          <h1
            id="not-found-heading"
            className="text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 mb-4"
          >
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Oops! Page Not Found
          </h2>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, renamed, or is temporarily
            unavailable.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className={`w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isLight
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/20'
              }`}
            >
              <span>Back to Portal Home</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/patient"
                className={`flex-1 sm:flex-initial px-4 py-3 min-h-[44px] rounded-xl font-semibold text-xs border flex items-center justify-center gap-1.5 transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <UserIcon className="w-4 h-4 text-blue-500" />
                <span>Patient Form</span>
              </Link>

              <Link
                href="/staff"
                className={`flex-1 sm:flex-initial px-4 py-3 min-h-[44px] rounded-xl font-semibold text-xs border flex items-center justify-center gap-1.5 transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <ChartIcon className="w-4 h-4 text-teal-500" />
                <span>Staff View</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
