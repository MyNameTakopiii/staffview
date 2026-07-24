# Bonus Feature Impact Analysis

## Selected Bonus Features

| #   | Feature                           | Target         | Value / Effort             | Risk Level |
| --- | --------------------------------- | -------------- | -------------------------- | ---------- |
| 1   | **Mock Data Generator**           | Patient Form   | High Value / Low Effort    | Very Low   |
| 2   | **Form Auto-Save & Local Backup** | Patient Form   | High Value / Low Effort    | Very Low   |
| 3   | **Audit Trail / History Log**     | Staff View     | High Value / Medium Effort | Low        |
| 4   | **Field-Level Typing Indicator**  | Real-Time Sync | High Value / Medium Effort | Low        |
| 5   | **Data Export (JSON & CSV)**      | Staff View     | High Value / Low Effort    | Very Low   |

---

## 1. Mock Data Generator

- **Purpose**: Allow evaluators and staff to fill valid patient test data with 1 click.
- **Architecture Impact**: Extends `PatientFormContainer.tsx` with a `handleFillSampleData` function that uses `form.reset(sampleData)` and triggers immediate real-time sync.
- **Data Flow**: User clicks "Fill Sample Data" → Form inputs populated → Socket broadcast sent → Staff View updates.
- **Risks**: None. Uses existing Zod schema default format.

---

## 2. Form Auto-Save & Local Backup

- **Purpose**: Prevent accidental loss of patient input during browser refreshes or accidental navigation.
- **Architecture Impact**: Uses `localStorage` key `staffview_patient_draft`. Automatically saves draft on input change and restores it on page load; clears on successful form submission.
- **Data Flow**: `onFieldInput` → Write to `localStorage` → Socket broadcast. On submit → Clear `localStorage`.
- **Risks**: None. Fallback handles SSR/hydration safety checks (`typeof window !== 'undefined'`).

---

## 3. Audit Trail / History Log

- **Purpose**: Provide staff with a real-time chronological log of patient form modifications.
- **Architecture Impact**: `useStaffSync.ts` maintains an array of `AuditLogEntry` items (`{ timestamp, fieldName, value, type }`). Adds `AuditTrailLog.tsx` component in Staff View.
- **Data Flow**: `staff_patient_update` socket event received → Compare changed fields → Append entry to `auditLog` state → Render in Audit Trail panel.
- **Risks**: Memory footprint capped at 50 most recent log entries.

---

## 4. Field-Level Typing Indicator

- **Purpose**: Inform staff which specific field the patient is currently focused on.
- **Architecture Impact**: Patient form emits `patient_focus` event on input focus; Staff View updates `activeField` state and highlights the target field card in `StaffFieldGrid.tsx`.
- **Data Flow**: Patient focuses input → `emitFieldFocus(fieldName)` → Socket server broadcasts `staff_patient_focus` → Staff View displays glowing indicator on target card.
- **Risks**: Minimal network overhead (single field name string per focus change).

---

## 5. Data Export (JSON & CSV)

- **Purpose**: Allow staff members to export patient intake details into downloadable files.
- **Architecture Impact**: Adds utility function `exportPatientData(data, format)` in `src/lib/exportUtils.ts` and action buttons in `StaffViewContainer.tsx`.
- **Data Flow**: Staff clicks "Export JSON" or "Export CSV" → Browser generates Blob URL → Initiates instant file download.
- **Risks**: Client-side execution only, zero backend/network risk.

---

## Summary of File & Module Changes

```
src/
├── components/
│   ├── patient/
│   │   ├── PatientFormContainer.tsx   (Add sample data button & localStorage auto-save/restore)
│   │   └── PatientFormFields.tsx      (Add onFocus handler for active field tracking)
│   ├── staff/
│   │   ├── StaffViewContainer.tsx     (Add Audit Trail drawer & Export button bar)
│   │   ├── StaffFieldGrid.tsx         (Highlight active focus field with badge/glow)
│   │   └── AuditTrailLog.tsx          (New component rendering chronological update log)
│   └── shared/
│       └── Icons.tsx                  (Add SparklesIcon, DownloadIcon, HistoryIcon)
├── hooks/
│   ├── usePatientSync.ts              (Add emitFieldFocus capability)
│   └── useStaffSync.ts                (Add auditLog state and activeField tracker)
├── lib/
│   ├── constants.ts                   (Add SAMPLE_PATIENT_DATA preset)
│   └── exportUtils.ts                 (New utility for JSON/CSV generation)
└── types/
    └── patient.ts                     (Add AuditLogEntry type)
```
