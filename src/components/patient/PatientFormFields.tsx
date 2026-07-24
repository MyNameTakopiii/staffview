import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PatientFormInput } from '@/lib/validation/patientSchema';
import { FormField } from '../shared/FormField';
import { GENDER_OPTIONS, LANGUAGE_OPTIONS, NATIONALITY_OPTIONS } from '@/lib/constants';

interface PatientFormFieldsProps {
  register: UseFormRegister<PatientFormInput>;
  errors: FieldErrors<PatientFormInput>;
  onFieldInput: () => void;
  onFieldFocus?: (fieldId: string | null) => void;
  disabled?: boolean;
}

export const PatientFormFields: React.FC<PatientFormFieldsProps> = ({
  register,
  errors,
  onFieldInput,
  onFieldFocus,
  disabled = false,
}) => {
  const handleFocus = (fieldId: string) => () => {
    if (onFieldFocus) onFieldFocus(fieldId);
  };

  const handleBlur = () => {
    if (onFieldFocus) onFieldFocus(null);
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Personal Details */}
      <section
        aria-labelledby="personal-details-heading"
        className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl"
      >
        <h3
          id="personal-details-heading"
          className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField
            fieldId="firstName"
            label="First Name"
            isRequired
            placeholder="e.g. Jane"
            isDisabled={disabled}
            registration={register('firstName', { onChange: onFieldInput })}
            error={errors.firstName}
            onFocus={handleFocus('firstName')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="middleName"
            label="Middle Name"
            placeholder="e.g. Marie"
            isDisabled={disabled}
            registration={register('middleName', { onChange: onFieldInput })}
            onFocus={handleFocus('middleName')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="lastName"
            label="Last Name"
            isRequired
            placeholder="e.g. Doe"
            isDisabled={disabled}
            registration={register('lastName', { onChange: onFieldInput })}
            error={errors.lastName}
            onFocus={handleFocus('lastName')}
            onBlur={handleBlur}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <FormField
            fieldId="dateOfBirth"
            label="Date of Birth"
            type="date"
            isRequired
            isDisabled={disabled}
            registration={register('dateOfBirth', { onChange: onFieldInput })}
            error={errors.dateOfBirth}
            onFocus={handleFocus('dateOfBirth')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="gender"
            label="Gender"
            isRequired
            placeholder="Select Gender"
            options={GENDER_OPTIONS}
            isDisabled={disabled}
            registration={register('gender', { onChange: onFieldInput })}
            error={errors.gender}
            onFocus={handleFocus('gender')}
            onBlur={handleBlur}
          />
        </div>
      </section>

      {/* Section 2: Contact & Address Information */}
      <section
        aria-labelledby="contact-address-heading"
        className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl"
      >
        <h3
          id="contact-address-heading"
          className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Contact & Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            fieldId="phoneNumber"
            label="Phone Number"
            type="tel"
            isRequired
            placeholder="+1 (555) 000-0000"
            isDisabled={disabled}
            registration={register('phoneNumber', { onChange: onFieldInput })}
            error={errors.phoneNumber}
            onFocus={handleFocus('phoneNumber')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="email"
            label="Email Address"
            type="email"
            isRequired
            placeholder="jane.doe@example.com"
            isDisabled={disabled}
            registration={register('email', { onChange: onFieldInput })}
            error={errors.email}
            onFocus={handleFocus('email')}
            onBlur={handleBlur}
          />
        </div>

        <div className="mt-5">
          <FormField
            fieldId="address"
            label="Full Address"
            isRequired
            isTextarea
            rows={2}
            placeholder="123 Health Ave, Suite 400, City, Country"
            isDisabled={disabled}
            registration={register('address', { onChange: onFieldInput })}
            error={errors.address}
            onFocus={handleFocus('address')}
            onBlur={handleBlur}
          />
        </div>
      </section>

      {/* Section 3: Additional & Emergency Details */}
      <section
        aria-labelledby="background-emergency-heading"
        className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl"
      >
        <h3
          id="background-emergency-heading"
          className="text-lg font-semibold text-indigo-400 mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          Background & Emergency Contact
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            fieldId="preferredLanguage"
            label="Preferred Language"
            isRequired
            placeholder="Select Preferred Language"
            options={LANGUAGE_OPTIONS}
            isDisabled={disabled}
            registration={register('preferredLanguage', { onChange: onFieldInput })}
            error={errors.preferredLanguage}
            onFocus={handleFocus('preferredLanguage')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="nationality"
            label="Nationality"
            isRequired
            placeholder="Select Nationality"
            options={NATIONALITY_OPTIONS}
            isDisabled={disabled}
            registration={register('nationality', { onChange: onFieldInput })}
            error={errors.nationality}
            onFocus={handleFocus('nationality')}
            onBlur={handleBlur}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <FormField
            fieldId="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="e.g. John Doe"
            isDisabled={disabled}
            registration={register('emergencyContactName', { onChange: onFieldInput })}
            onFocus={handleFocus('emergencyContactName')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="emergencyContactRelationship"
            label="Relationship"
            placeholder="e.g. Spouse, Parent"
            isDisabled={disabled}
            registration={register('emergencyContactRelationship', { onChange: onFieldInput })}
            onFocus={handleFocus('emergencyContactRelationship')}
            onBlur={handleBlur}
          />

          <FormField
            fieldId="religion"
            label="Religion"
            placeholder="e.g. Buddhism, Christianity"
            isDisabled={disabled}
            registration={register('religion', { onChange: onFieldInput })}
            onFocus={handleFocus('religion')}
            onBlur={handleBlur}
          />
        </div>
      </section>
    </div>
  );
};
