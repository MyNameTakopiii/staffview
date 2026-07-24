import { PatientFormData } from '@/types/patient';

export interface FieldDefinition {
  id: keyof PatientFormData;
  label: string;
  required: boolean;
  fullWidth?: boolean;
}

export const PATIENT_FIELD_DEFINITIONS: FieldDefinition[] = [
  { id: 'firstName', label: 'First Name', required: true },
  { id: 'middleName', label: 'Middle Name', required: false },
  { id: 'lastName', label: 'Last Name', required: true },
  { id: 'dateOfBirth', label: 'Date of Birth', required: true },
  { id: 'gender', label: 'Gender', required: true },
  { id: 'phoneNumber', label: 'Phone Number', required: true },
  { id: 'email', label: 'Email Address', required: true },
  { id: 'address', label: 'Full Address', required: true, fullWidth: true },
  { id: 'preferredLanguage', label: 'Preferred Language', required: true },
  { id: 'nationality', label: 'Nationality', required: true },
  { id: 'emergencyContactName', label: 'Emergency Contact Name', required: false },
  { id: 'emergencyContactRelationship', label: 'Emergency Relationship', required: false },
  { id: 'religion', label: 'Religion', required: false },
];

export function getPatientFieldList(data: PatientFormData) {
  return PATIENT_FIELD_DEFINITIONS.map((def) => ({
    ...def,
    value: data[def.id],
  }));
}
