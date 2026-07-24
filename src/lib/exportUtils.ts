import { PatientFormData } from '@/types/patient';

/**
 * Triggers a browser file download using a temporary anchor element.
 */
function triggerFileDownload(contentDataUri: string, filename: string): void {
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', contentDataUri);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Generates a sanitized filename timestamp for patient exports.
 */
function getExportFilename(patientName: string, extension: 'json' | 'csv'): string {
  const sanitizedName = (patientName || 'patient').toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `patient_intake_${sanitizedName}_${Date.now()}.${extension}`;
}

/**
 * Exports patient form data as a downloadable JSON file.
 */
export function exportAsJSON(data: PatientFormData): void {
  const jsonString = JSON.stringify(data, null, 2);
  const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(jsonString)}`;
  const filename = getExportFilename(data.lastName, 'json');

  triggerFileDownload(dataUri, filename);
}

/**
 * Exports patient form data as a downloadable CSV file.
 */
export function exportAsCSV(data: PatientFormData): void {
  const headers = Object.keys(data).join(',');
  const values = Object.values(data)
    .map((val) => `"${String(val || '').replace(/"/g, '""')}"`)
    .join(',');

  const csvContent = `${headers}\n${values}`;
  const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
  const filename = getExportFilename(data.lastName, 'csv');

  triggerFileDownload(dataUri, filename);
}
