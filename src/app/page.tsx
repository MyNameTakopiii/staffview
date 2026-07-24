'use client';

import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { UserIcon, ChartIcon, ArrowRightIcon } from '@/components/shared/Icons';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      <Header title="Patient & Staff Real-Time System" subtitle="Agnos Healthcare Portal" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <section aria-labelledby="hero-heading" className="text-center max-w-2xl mb-12">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-4 ${
              isLight
                ? 'bg-blue-100 border-blue-200 text-blue-700'
                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isLight ? 'bg-blue-600' : 'bg-cyan-400'
              }`}
              aria-hidden="true"
            />
            <span>Real-Time WebSockets Engine</span>
          </div>
          <h1
            id="hero-heading"
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Patient Intake & Staff Monitoring
          </h1>
          <p
            className={`text-base mt-4 leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Select an interface below to test real-time data synchronization between patient form
            entry and staff monitoring.
          </p>
        </section>

        <section
          aria-label="Interface selection"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
        >
          {/* Patient Form Card */}
          <Link
            href="/patient"
            className={`group relative p-8 rounded-3xl border transition-all duration-300 shadow-lg flex flex-col justify-between overflow-hidden ${
              isLight
                ? 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-blue-500/10'
                : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
            }`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all ${
                isLight
                  ? 'bg-blue-500/10 group-hover:bg-blue-500/20'
                  : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
              }`}
              aria-hidden="true"
            />
            <div>
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  isLight
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                }`}
              >
                <UserIcon className="w-7 h-7" />
              </div>
              <h2
                className={`text-2xl font-bold transition-colors ${
                  isLight
                    ? 'text-slate-900 group-hover:text-blue-600'
                    : 'text-white group-hover:text-cyan-400'
                }`}
              >
                Patient Form Interface
              </h2>
              <p
                className={`text-sm mt-2 leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Responsive patient intake form with input validation and instant keystroke
                broadcasting.
              </p>
            </div>
            <div
              className={`mt-8 flex items-center font-semibold text-sm group-hover:translate-x-1 transition-transform ${
                isLight ? 'text-blue-600' : 'text-cyan-400'
              }`}
            >
              <span>Open Patient Form</span>
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </div>
          </Link>

          {/* Staff View Card */}
          <Link
            href="/staff"
            className={`group relative p-8 rounded-3xl border transition-all duration-300 shadow-lg flex flex-col justify-between overflow-hidden ${
              isLight
                ? 'bg-white border-slate-200 hover:border-blue-600 hover:shadow-blue-600/10'
                : 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50 hover:shadow-blue-500/10'
            }`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all ${
                isLight
                  ? 'bg-blue-600/10 group-hover:bg-blue-600/20'
                  : 'bg-blue-600/10 group-hover:bg-blue-600/20'
              }`}
              aria-hidden="true"
            />
            <div>
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  isLight
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-blue-600/10 border-blue-600/30 text-blue-400'
                }`}
              >
                <ChartIcon className="w-7 h-7" />
              </div>
              <h2
                className={`text-2xl font-bold transition-colors ${
                  isLight
                    ? 'text-slate-900 group-hover:text-blue-600'
                    : 'text-white group-hover:text-blue-400'
                }`}
              >
                Staff View Interface
              </h2>
              <p
                className={`text-sm mt-2 leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Live monitoring dashboard with real-time field mirroring and activity status
                indicators.
              </p>
            </div>
            <div
              className={`mt-8 flex items-center font-semibold text-sm group-hover:translate-x-1 transition-transform ${
                isLight ? 'text-blue-600' : 'text-blue-400'
              }`}
            >
              <span>Open Staff View</span>
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
