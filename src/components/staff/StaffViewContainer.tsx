'use client';

import React, { useState } from 'react';
import { useStaffSync } from '@/hooks/useStaffSync';
import { StatusBadge } from '../shared/StatusBadge';
import { StaffFieldGrid } from './StaffFieldGrid';
import { AuditTrailLog } from './AuditTrailLog';
import { exportAsJSON, exportAsCSV } from '@/lib/exportUtils';
import { DownloadIcon } from '../shared/Icons';

export const StaffViewContainer: React.FC = () => {
  const { patientData, status, isConnected, activeField, auditLog, clearAuditLog } = useStaffSync();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <section
        aria-labelledby="staff-view-heading"
        className="mb-8 p-6 rounded-3xl border border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl relative overflow-hidden text-white"
      >
        <div
          className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" aria-hidden="true" />
              <span>Real-Time Staff Monitoring Terminal</span>
            </div>
            <h2 id="staff-view-heading" className="text-2xl sm:text-3xl font-extrabold text-white">
              Live Patient Input Stream
            </h2>
            <p className="text-slate-200 text-sm mt-1">
              Monitoring patient form progress in real time across active sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Export Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => exportAsJSON(patientData)}
                className="px-3.5 py-2 min-h-[44px] bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                title="Export patient data as JSON file"
              >
                <DownloadIcon className="w-4 h-4 text-blue-300" />
                <span>JSON</span>
              </button>

              <button
                type="button"
                onClick={() => exportAsCSV(patientData)}
                className="px-3.5 py-2 min-h-[44px] bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                title="Export patient data as CSV file"
              >
                <DownloadIcon className="w-4 h-4 text-emerald-300" />
                <span>CSV</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 bg-black/20 p-2.5 rounded-2xl border border-white/20 shadow-inner">
              <div className="flex items-center space-x-2 px-3 py-1 bg-black/30 rounded-xl border border-white/20 text-xs text-white">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-success shadow-sm shadow-success/50' : 'bg-error'
                  }`}
                  aria-hidden="true"
                />
                <span>{isConnected ? 'Socket Live' : 'Connecting...'}</span>
              </div>

              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Field Filter Bar */}
      <section
        aria-label="Field Search & Filter Controls"
        className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fields or values..."
            aria-label="Filter patient form fields by label or content"
            className="w-full px-4 py-2.5 pl-10 min-h-[44px] border border-border rounded-xl text-sm bg-card text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-text-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-xs text-text-muted hover:text-text-main"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Main Grid display */}
      <section aria-label="Patient data fields">
        <StaffFieldGrid data={patientData} activeField={activeField} searchQuery={searchQuery} />
      </section>

      {/* Audit Trail Log */}
      <AuditTrailLog logs={auditLog} onClearLogs={clearAuditLog} />
    </div>
  );
};
