import { SelectOption } from '@/components/shared/FormField';
import { PatientFormData } from '@/types/patient';

export const GENDER_OPTIONS: SelectOption[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { label: 'English', value: 'English' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Thai', value: 'Thai' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'French', value: 'French' },
  { label: 'German', value: 'German' },
  { label: 'Other', value: 'Other' },
];

export const NATIONALITY_OPTIONS: SelectOption[] = [
  { label: 'American', value: 'American' },
  { label: 'Thai', value: 'Thai' },
  { label: 'British', value: 'British' },
  { label: 'Canadian', value: 'Canadian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Australian', value: 'Australian' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'German', value: 'German' },
  { label: 'French', value: 'French' },
  { label: 'Other', value: 'Other' },
];

export const SAMPLE_PATIENT_DATA: PatientFormData = {
  firstName: 'Jane',
  middleName: 'Marie',
  lastName: 'Smith',
  dateOfBirth: '1992-08-15',
  gender: 'Female',
  phoneNumber: '+1 (555) 234-5678',
  email: 'jane.smith@example.com',
  address: '742 Evergreen Terrace, Suite 100, Springfield, USA',
  preferredLanguage: 'English',
  nationality: 'American',
  emergencyContactName: 'John Smith',
  emergencyContactRelationship: 'Spouse',
  religion: 'Other',
};
