'use client';

import React, { useState } from 'react';
import { AuditLogEntry } from '@/types/patient';
import { HistoryIcon, TrashIcon } from '../shared/Icons';

interface AuditTrailLogProps {
  logs: AuditLogEntry[];
  onClearLogs: () => void;
}

export const AuditTrailLog: React.FC<AuditTrailLogProps> = ({ logs, onClearLogs }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getLogBadge = (type: AuditLogEntry['type']) => {
    switch (type) {
      case 'submit':
        return 'bg-success-bg text-success border-success/40';
      case 'focus':
        return 'bg-info-bg text-info border-info/40';
      case 'update':
        return 'bg-secondary/15 text-secondary border-secondary/40';
      default:
        return 'bg-main text-text-muted border-border';
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section
      aria-labelledby="audit-log-heading"
      className="mt-8 rounded-3xl border border-border bg-card shadow-lg overflow-hidden transition-colors"
    >
      <div className="p-4 px-6 border-b border-border bg-main/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HistoryIcon className="w-5 h-5 text-primary" />
          <h3
            id="audit-log-heading"
            className="text-sm font-bold tracking-wide uppercase text-text-main"
          >
            Audit Trail & Change Log ({logs.length})
          </h3>
        </div>

        <div className="flex items-center space-x-3">
          {logs.length > 0 && (
            <button
              type="button"
              onClick={onClearLogs}
              className="text-xs text-text-muted hover:text-error transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-error/30 rounded-lg px-2 py-1"
              aria-label="Clear all audit log entries"
            >
              <TrashIcon className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
            aria-controls="audit-log-content"
            className="text-xs font-semibold text-text-muted hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-lg px-2 py-1"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div id="audit-log-content" className="p-4 max-h-64 overflow-y-auto space-y-2.5">
          {logs.length === 0 ? (
            <p className="text-xs italic text-center py-4 text-text-muted">
              No audit log entries recorded yet. Waiting for patient interactions...
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-border bg-main/40"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-[11px] text-text-muted">{log.timestamp}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase ${getLogBadge(
                      log.type
                    )}`}
                  >
                    {log.type}
                  </span>
                  <span className="font-medium text-text-main">{log.field}:</span>
                  <span className="truncate max-w-xs text-text-muted">{log.value}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};
