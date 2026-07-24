# Component Architecture Specification

Version: 1.0  
Agent: Architecture Designer Agent

---

## 1. Component Overview

The application comprises modular, reusable React components split into Shared components, Patient Form components, and Staff View components.

---

## 2. Shared Components

### 2.1 `Header`

- **Responsibility**: Displays application header and active view title.
- **Inputs**: `title: string`, `subtitle?: string`
- **Outputs**: Rendered navigation bar.
- **State Ownership**: Stateless.
- **Dependencies**: Tailwind CSS styling utilities.

### 2.2 `StatusBadge`

- **Responsibility**: Render visual badge for patient activity status (`actively_filling_in`, `inactive`, `submitted`).
- **Inputs**: `status: 'actively_filling_in' | 'inactive' | 'submitted'`
- **Outputs**: Styled status pill indicator with distinct color/icon.
- **State Ownership**: Stateless.
- **Dependencies**: Tailwind CSS.

---

## 3. Patient Form Components

### 3.1 `PatientFormContainer`

- **Responsibility**: Root container for Patient Form page (`/patient`). Holds form hook and manages real-time sync socket lifecycle.
- **Inputs**: None (Page route container).
- **Outputs**: Form layout and socket event emitters.
- **State Ownership**: Local form state (`react-hook-form`), socket connection state, idle timer reference.
- **Dependencies**: `PatientFormFields`, `usePatientSync`, `Zod` validation schema.

### 3.2 `PatientFormFields`

- **Responsibility**: Render form input fields grouped by section (Personal, Contact, Emergency, Optional Details).
- **Inputs**: `register: UseFormRegister`, `errors: FieldErrors`, `onFieldChange: (name, value) => void`
- **Outputs**: Form inputs with validation error messages.
- **State Ownership**: Controlled via `react-hook-form`.
- **Dependencies**: Tailwind CSS, HTML form elements.

---

## 4. Staff View Components

### 4.1 `StaffViewContainer`

- **Responsibility**: Root container for Staff View page (`/staff`). Listens to real-time sync socket and renders live mirrored patient state.
- **Inputs**: None (Page route container).
- **Outputs**: Live monitoring layout with status banner and field mirrors.
- **State Ownership**: Mirrored patient form data object, patient status state (`actively_filling_in`, `inactive`, `submitted`).
- **Dependencies**: `StaffFieldGrid`, `StatusBadge`, `useStaffSync`.

### 4.2 `StaffFieldGrid`

- **Responsibility**: Renders grid of mirrored field values receiving real-time updates.
- **Inputs**: `data: PatientFormData`
- **Outputs**: Field cards displaying real-time text/values.
- **State Ownership**: Stateless.
- **Dependencies**: Tailwind CSS.
