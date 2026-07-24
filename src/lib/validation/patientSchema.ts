import { z } from 'zod';

export const patientSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last Name is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone Number is required')
    .regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  preferredLanguage: z.string().min(1, 'Preferred Language is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  religion: z.string().optional(),
});

export type PatientFormInput = z.infer<typeof patientSchema>;

export const initialPatientFormData: PatientFormInput = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  email: '',
  address: '',
  preferredLanguage: '',
  nationality: '',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  religion: '',
};
