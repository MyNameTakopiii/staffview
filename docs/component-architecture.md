# Component Architecture Documentation

Version: 1.2

---

## 1. Overview

The application follows a modular component hierarchy separated into Shared UI, Patient Intake components, Staff Monitoring components, and Global Real-Time Context.

---

## 2. Core Components & Context Providers

### 2.0 `SyncContext` (`/src/context/SyncContext.tsx`)
- **Purpose**: Global React Context wrapping `RootLayout` (`src/app/layout.tsx`). Retains real-time sync state (`patientData`, `status`, `activeField`, `auditLog`, `isConnected`) across Next.js page navigation (`/` ↔ `/patient` ↔ `/staff`) and provides unified emit methods.

### 2.1 `Header` (`/src/components/shared/Header.tsx`)
- **Purpose**: Provides sticky navigation bar with active route highlighting and quick switching between Patient and Staff interfaces.

### 2.2 `StatusBadge` (`/src/components/shared/StatusBadge.tsx`)
- **Purpose**: Displays visual activity indicators for patient status with `aria-live="polite"` screen reader announcements:
  - `Actively Filling In`: Emerald pulsing dot & badge.
  - `Inactive`: Amber badge (triggered after 5 seconds of typing idle time).
  - `Submitted`: Blue badge.

### 2.3 `FormField` (`/src/components/shared/FormField.tsx`) [Bonus]
- **Purpose**: Reusable form input, textarea, and select dropdown component encapsulating label binding (`htmlFor`/`id`), validation error messages (`aria-describedby`), and focus/blur handlers.

### 2.4 `Footer` (`/src/components/shared/Footer.tsx`) [Bonus]
- **Purpose**: Shared copyright footer layout component.

### 2.5 `PatientFormContainer` (`/src/components/patient/PatientFormContainer.tsx`)
- **Purpose**: Manages patient form submission lifecycle, integrates `react-hook-form` with `Zod` validation, triggers real-time socket events via `usePatientSync`, manages `localStorage` auto-save/recovery, and provides 1-click sample data generation.

### 2.6 `PatientFormFields` (`/src/components/patient/PatientFormFields.tsx`)
- **Purpose**: Renders form input controls for 13 personal, contact, and background details with validation error feedback and focus tracking.

### 2.7 `StaffViewContainer` (`/src/components/staff/StaffViewContainer.tsx`)
- **Purpose**: Subscribes to real-time socket updates using `useStaffSync`, renders socket connection state, provides JSON/CSV export actions, and hosts the Audit Trail log drawer.

### 2.8 `StaffFieldGrid` (`/src/components/staff/StaffFieldGrid.tsx`)
- **Purpose**: Renders mirrored field cards reflecting patient inputs in real time, highlighting the currently edited field with a glowing focus ring and "Editing..." badge.

### 2.9 `AuditTrailLog` (`/src/components/staff/AuditTrailLog.tsx`) [Bonus]
- **Purpose**: Displays a chronological stream of timestamped updates, status changes, focus events, and form submissions on the Staff View.
