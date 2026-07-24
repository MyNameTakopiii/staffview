'use client';

import React from 'react';
import { PatientStatus } from '@/types/patient';

interface StatusBadgeProps {
  status: PatientStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'actively_filling_in':
        return {
          bg: 'bg-success-bg border-success/40 text-success',
          dot: 'bg-success animate-ping',
          solidDot: 'bg-success',
          label: 'Actively Filling In',
        };
      case 'inactive':
        return {
          bg: 'bg-warning-bg border-warning/40 text-warning',
          dot: '',
          solidDot: 'bg-warning',
          label: 'Inactive',
        };
      case 'submitted':
        return {
          bg: 'bg-info-bg border-info/40 text-info',
          dot: '',
          solidDot: 'bg-info',
          label: 'Submitted',
        };
      default:
        return {
          bg: 'bg-card border-border text-text-muted',
          dot: '',
          solidDot: 'bg-text-muted',
          label: 'Unknown',
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide shadow-sm whitespace-nowrap ${style.bg} ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        {style.dot && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${style.solidDot}`} />
      </span>
      <span>{style.label}</span>
    </div>
  );
};
