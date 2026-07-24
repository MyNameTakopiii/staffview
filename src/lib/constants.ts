/**
 * Duration in milliseconds before a patient session is considered idle.
 * Used by useActivityTimer to transition status from "actively_filling_in" to "inactive".
 */
export const IDLE_TIMEOUT_MS = 5000;

export const DRAFT_STORAGE_KEY = 'staffview_patient_draft';

export {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  SAMPLE_PATIENT_DATA,
} from '@/data';
