export type PatientStatus = 'actively_filling_in' | 'inactive' | 'submitted';

export interface PatientFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  religion?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  field: string;
  value: string;
  type: 'update' | 'status' | 'submit' | 'focus';
}
