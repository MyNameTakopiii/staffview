'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  patientSchema,
  PatientFormInput,
  initialPatientFormData,
} from '@/lib/validation/patientSchema';
import { usePatientSync } from '@/hooks/usePatientSync';
import { useActivityTimer } from '@/hooks/useActivityTimer';
import { IDLE_TIMEOUT_MS, SAMPLE_PATIENT_DATA, DRAFT_STORAGE_KEY } from '@/lib/constants';
import { PatientFormFields } from './PatientFormFields';
import { StatusBadge } from '../shared/StatusBadge';
import { CheckIcon, ArrowRightIcon, SparklesIcon, TrashIcon } from '../shared/Icons';
import { PatientStatus } from '@/types/patient';

export const PatientFormContainer: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<PatientStatus>('inactive');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const isSubmittedRef = useRef(false);

  const { emitInputChange, emitStatusChange, emitSubmit, emitFieldFocus } = usePatientSync();

  const handleIdle = () => {
    if (!isSubmittedRef.current) {
      setCurrentStatus('inactive');
      emitStatusChange('inactive');
    }
  };

  const handleActive = () => {
    if (!isSubmittedRef.current) {
      setCurrentStatus('actively_filling_in');
      emitStatusChange('actively_filling_in');
    }
  };

  const { resetTimer, clearTimer } = useActivityTimer(handleIdle, handleActive, IDLE_TIMEOUT_MS);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialPatientFormData,
    mode: 'onChange',
  });

  // Restore draft from localStorage on mount if available
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        reset(parsed);
        setHasDraft(true);
        emitInputChange(parsed);
      }
    } catch {
      // Ignore storage read error
    }
  }, []);

  const handleFormChange = () => {
    if (isSubmittedRef.current) return;
    resetTimer();
    const values = watch();
    emitInputChange(values);
    // Auto-save draft to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
        setHasDraft(true);
      } catch {
        // Ignore storage save error
      }
    }
  };

  const handleFillSampleData = () => {
    if (isSubmittedRef.current) return;
    reset(SAMPLE_PATIENT_DATA);
    resetTimer();
    emitInputChange(SAMPLE_PATIENT_DATA);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(SAMPLE_PATIENT_DATA));
      setHasDraft(true);
    }
  };

  const handleClearDraft = () => {
    if (isSubmittedRef.current) return;
    reset(initialPatientFormData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
    setHasDraft(false);
    emitInputChange(initialPatientFormData);
  };

  const onSubmit = (data: PatientFormInput) => {
    isSubmittedRef.current = true;
    setIsSubmitted(true);
    clearTimer();
    setCurrentStatus('submitted');
    emitSubmit(data);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <section
        aria-labelledby="patient-form-heading"
        className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl relative overflow-hidden text-white"
      >
        <div
          className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-1.5">
              <span>Patient Intake Portal</span>
            </div>
            <h2
              id="patient-form-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              Patient Information Form
            </h2>
            <p className="text-slate-200 text-sm mt-1.5 leading-relaxed">
              Please enter your personal details below. Your information is mirrored in real time
              for clinic staff.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
            {!isSubmitted && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillSampleData}
                  className="px-3.5 py-2 min-h-[44px] bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white/50"
                  title="Fill form with sample data for quick evaluation"
                >
                  <SparklesIcon className="w-4 h-4 shrink-0 text-cyan-300" />
                  <span className="whitespace-nowrap">Fill Sample Data</span>
                </button>

                {hasDraft && (
                  <button
                    type="button"
                    onClick={handleClearDraft}
                    className="px-3.5 py-2 min-h-[44px] bg-black/20 hover:bg-rose-500/30 text-white hover:text-rose-200 border border-white/20 hover:border-rose-400/40 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    title="Clear saved draft"
                  >
                    <TrashIcon className="w-4 h-4 shrink-0" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            )}
            <StatusBadge status={currentStatus} />
          </div>
        </div>
      </section>

      {/* Form Fields Card Container */}
      {isSubmitted ? (
        <section
          aria-labelledby="submission-success-heading"
          className="p-8 rounded-3xl border border-success/30 bg-success-bg text-success-text text-center shadow-lg backdrop-blur-md transition-colors"
        >
          <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4 border border-success/40 shadow-lg shadow-success/20">
            <CheckIcon className="w-8 h-8" />
          </div>
          <h3 id="submission-success-heading" className="text-2xl font-bold">
            Form Submitted Successfully!
          </h3>
          <p className="text-sm mt-2 max-w-md mx-auto opacity-90">
            Thank you for completing your intake details. Clinic staff have received your
            submission.
          </p>
        </section>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm transition-colors">
            <PatientFormFields
              register={register}
              errors={errors}
              onFieldInput={handleFormChange}
              onFieldFocus={emitFieldFocus}
              disabled={isSubmitted || isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:opacity-90 transition-all duration-200 transform active:scale-95 disabled:opacity-50 text-sm tracking-wide flex items-center justify-center space-x-2"
            >
              <span>Submit Information</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
