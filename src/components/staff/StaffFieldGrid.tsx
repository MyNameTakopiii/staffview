'use client';

import React from 'react';
import { PatientFormData } from '@/types/patient';

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
  const fields = [
    { id: 'firstName', label: 'First Name', value: data.firstName, required: true },
    { id: 'middleName', label: 'Middle Name', value: data.middleName, required: false },
    { id: 'lastName', label: 'Last Name', value: data.lastName, required: true },
    { id: 'dateOfBirth', label: 'Date of Birth', value: data.dateOfBirth, required: true },
    { id: 'gender', label: 'Gender', value: data.gender, required: true },
    { id: 'phoneNumber', label: 'Phone Number', value: data.phoneNumber, required: true },
    { id: 'email', label: 'Email Address', value: data.email, required: true },
    { id: 'address', label: 'Full Address', value: data.address, required: true, fullWidth: true },
    {
      id: 'preferredLanguage',
      label: 'Preferred Language',
      value: data.preferredLanguage,
      required: true,
    },
    { id: 'nationality', label: 'Nationality', value: data.nationality, required: true },
    {
      id: 'emergencyContactName',
      label: 'Emergency Contact Name',
      value: data.emergencyContactName,
      required: false,
    },
    {
      id: 'emergencyContactRelationship',
      label: 'Emergency Relationship',
      value: data.emergencyContactRelationship,
      required: false,
    },
    { id: 'religion', label: 'Religion', value: data.religion, required: false },
  ];

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

        const cardStyle = isEditing
          ? 'bg-info-bg/90 border-info shadow-md ring-2 ring-info/30 scale-[1.01]'
          : 'bg-card border-border hover:border-text-muted/40 shadow-sm';

        return (
          <div
            key={field.id}
            className={`p-4 rounded-2xl border transition-all duration-300 ${cardStyle} ${
              field.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-text-muted">
                {field.label}
              </span>
              <div className="flex items-center gap-1.5">
                {isEditing && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border border-info/40 bg-info-bg text-info animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-info animate-ping" />
                    Editing...
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
                <p className="text-base font-semibold break-words leading-relaxed text-text-main">
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
