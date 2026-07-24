'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PatientFormData } from '@/types/patient';
import { getPatientFieldList } from '@/data';

interface StaffFieldGridProps {
  data: PatientFormData;
  activeField?: string | null;
  searchQuery?: string;
}

export const StaffFieldGrid: React.FC<StaffFieldGridProps> = ({
  data,
  activeField,
  searchQuery = '',
}) => {
  // Timestamp tracking for recently updated fields (remains highlighted for 3.5s)
  const [updatedFields, setUpdatedFields] = useState<Record<string, number>>({});
  const prevDataRef = useRef<PatientFormData>(data);

  useEffect(() => {
    const now = Date.now();
    const newUpdates: Record<string, number> = {};

    Object.keys(data).forEach((key) => {
      const fieldKey = key as keyof PatientFormData;
      if (prevDataRef.current[fieldKey] !== data[fieldKey] && prevDataRef.current[fieldKey] !== undefined) {
        newUpdates[key] = now;
      }
    });

    if (Object.keys(newUpdates).length > 0) {
      setUpdatedFields((prev) => ({ ...prev, ...newUpdates }));
    }
    prevDataRef.current = data;
  }, [data]);

  // Periodically clean up highlights older than 3500ms
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setUpdatedFields((prev) => {
        const next = { ...prev };
        let changed = false;
        Object.keys(next).forEach((key) => {
          if (now - next[key] > 3500) {
            delete next[key];
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const fields = getPatientFieldList(data);

  const query = searchQuery.trim().toLowerCase();
  const filteredFields = fields.filter((field) => {
    if (!query) return true;
    return (
      field.label.toLowerCase().includes(query) ||
      (field.value && field.value.toLowerCase().includes(query))
    );
  });

  if (filteredFields.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-border bg-card shadow-sm">
        <p className="text-text-muted text-sm font-medium">
          No matching fields found for &quot;
          <span className="text-text-main font-bold">{searchQuery}</span>
          &quot;
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredFields.map((field) => {
        const isEditing = activeField === field.id;
        const isRecentlyUpdated = Boolean(updatedFields[field.id]);

        let cardStyle = 'bg-card border-border hover:border-text-muted/40 shadow-sm';
        if (isEditing) {
          cardStyle =
            'bg-cyan-500/10 border-cyan-400 ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-[1.02] transition-all duration-300';
        } else if (isRecentlyUpdated) {
          cardStyle =
            'bg-emerald-500/10 border-emerald-400 ring-2 ring-emerald-500/40 shadow-md shadow-emerald-500/10 scale-[1.01] transition-all duration-300 animate-pulse';
        }

        return (
          <div
            key={field.id}
            className={`p-4 rounded-2xl border transition-all duration-300 ${cardStyle} ${
              field.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                  isEditing
                    ? 'text-cyan-400 font-bold'
                    : isRecentlyUpdated
                      ? 'text-emerald-400 font-bold'
                      : 'text-text-muted'
                }`}
              >
                {field.label}
              </span>
              <div className="flex items-center gap-1.5">
                {isEditing && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-cyan-400/50 bg-cyan-500/20 text-cyan-300 animate-pulse flex items-center gap-1 shadow-sm shadow-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    ✏️ Editing...
                  </span>
                )}
                {!isEditing && isRecentlyUpdated && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-400/50 bg-emerald-500/20 text-emerald-300 flex items-center gap-1 shadow-sm shadow-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ⚡ Live Change
                  </span>
                )}
                {field.required ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border border-primary/20 bg-primary/10 text-primary">
                    Required
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-main text-text-muted border border-border">
                    Optional
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1">
              {field.value ? (
                <p
                  className={`text-base font-semibold break-words leading-relaxed transition-colors duration-500 ${
                    isEditing
                      ? 'text-cyan-200 font-extrabold'
                      : isRecentlyUpdated
                        ? 'text-emerald-200 font-extrabold underline decoration-emerald-400/50 decoration-2 underline-offset-4'
                        : 'text-text-main'
                  }`}
                >
                  {field.value}
                </p>
              ) : (
                <p className="text-sm font-normal italic text-text-muted/60">Not filled yet...</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
