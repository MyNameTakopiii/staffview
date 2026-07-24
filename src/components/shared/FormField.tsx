'use client';

import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: string;
}

interface FormFieldProps {
  /** Unique identifier for the field, used for htmlFor/id/aria binding */
  fieldId: string;
  /** Display label text */
  label: string;
  /** Whether the field is required */
  isRequired?: boolean;
  /** react-hook-form register return value */
  registration: UseFormRegisterReturn;
  /** Field validation error */
  error?: FieldError;
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** Input placeholder text */
  placeholder?: string;
  /** Input type — defaults to "text" */
  type?: 'text' | 'email' | 'tel' | 'date';
  /** Render as textarea instead of input */
  isTextarea?: boolean;
  /** Number of textarea rows */
  rows?: number;
  /** Options array to render as a select dropdown */
  options?: SelectOption[];
  /** Optional focus event handler */
  onFocus?: (e: React.FocusEvent) => void;
  /** Optional blur event handler */
  onBlur?: (e: React.FocusEvent) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldId,
  label,
  isRequired = false,
  registration,
  error,
  isDisabled = false,
  placeholder,
  type = 'text',
  isTextarea = false,
  rows = 2,
  options,
  onFocus,
  onBlur,
}) => {
  const errorId = `${fieldId}-error`;
  const hasError = Boolean(error);

  const baseInputClasses =
    'w-full px-4 py-2.5 min-h-[44px] border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm sm:text-base bg-card text-text-main';

  const normalClasses =
    'border-border placeholder-text-muted/60 focus:border-primary focus:ring-primary/20';

  const errorClasses =
    'border-error text-error placeholder-error/60 focus:border-error focus:ring-error/20';

  const inputClasses = `${baseInputClasses} ${hasError ? errorClasses : normalClasses}`;

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    registration.onBlur(e);
    if (onBlur) onBlur(e);
  };

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-text-muted"
      >
        {label}{' '}
        {isRequired ? (
          <span className="text-error" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="font-normal lowercase text-text-muted/80">(optional)</span>
        )}
      </label>

      {options ? (
        <div className="relative">
          <select
            id={fieldId}
            disabled={isDisabled}
            aria-required={isRequired}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
            {...registration}
            onFocus={onFocus}
            onBlur={handleBlur}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-text-main">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      ) : isTextarea ? (
        <textarea
          id={fieldId}
          rows={rows}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-required={isRequired}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={inputClasses}
          {...registration}
          onFocus={onFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-required={isRequired}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={inputClasses}
          {...registration}
          onFocus={onFocus}
          onBlur={handleBlur}
        />
      )}

      {error && (
        <p
          id={errorId}
          className="mt-1.5 text-xs text-error font-semibold flex items-center gap-1"
          role="alert"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-error" />
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
};
