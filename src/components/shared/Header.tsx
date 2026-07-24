'use client';

import React from 'react';
import Link from 'next/link';
import { MedicalCaseIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title: string;
  subtitle?: string;
  activeNav?: 'patient' | 'staff';
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, activeNav }) => {
  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border text-text-main px-4 lg:px-8 py-4 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <MedicalCaseIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="block text-xl font-bold tracking-tight text-text-main">{title}</span>
            {subtitle && <p className="text-xs font-medium text-text-muted">{subtitle}</p>}
          </div>
        </Link>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
          <nav
            aria-label="Main navigation"
            className="flex items-center space-x-1.5 p-1.5 rounded-xl border border-border bg-main/50"
          >
            <Link
              href="/patient"
              className={`px-4 py-2 min-h-[44px] flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeNav === 'patient'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-text-muted hover:text-text-main hover:bg-card'
              }`}
            >
              Patient Form
            </Link>
            <Link
              href="/staff"
              className={`px-4 py-2 min-h-[44px] flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeNav === 'staff'
                  ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                  : 'text-text-muted hover:text-text-main hover:bg-card'
              }`}
            >
              Staff View
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
