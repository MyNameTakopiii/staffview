# Requirement Traceability Matrix

Version: 1.0  
Agent: Architecture Designer Agent

---

## 1. Traceability Mapping Table

| Requirement ID | Requirement Title                         | Architecture Layer      | Module Owner                                  | Target Component(s)                                                                                  |
| -------------- | ----------------------------------------- | ----------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **REQ-F001**   | Patient Personal Details Input            | Frontend App Router     | `FormValidationModule`                        | `PatientFormFields.tsx`, `PatientFormContainer.tsx`                                                  |
| **REQ-F002**   | Patient Form Validation                   | Form Validation Layer   | `FormValidationModule`                        | `PatientFormFields.tsx` (Zod validation errors)                                                      |
| **REQ-F003**   | Staff View Real-Time Field Display        | Staff Monitoring UI     | `RealTimeSyncModule`                          | `StaffFieldGrid.tsx`, `StaffViewContainer.tsx`                                                       |
| **REQ-F004**   | Patient Activity Indicators on Staff View | Activity & Status Layer | `ActivityTimerModule`                         | `StatusBadge.tsx`, `StaffViewContainer.tsx`                                                          |
| **REQ-F005**   | Real-Time Data Synchronization            | Real-Time Sync Channel  | `RealTimeSyncModule`, `WebSocketServerModule` | `usePatientSync.ts`, `useStaffSync.ts`, `socketClient.ts`                                            |
| **REQ-NF001**  | Responsive Design (Patient Form)          | UI Styling Layer        | Tailwind CSS Utility Layer                    | `PatientFormContainer.tsx`, `PatientFormFields.tsx`                                                  |
| **REQ-NF002**  | Responsive Design (Staff View)            | UI Styling Layer        | Tailwind CSS Utility Layer                    | `StaffViewContainer.tsx`, `StaffFieldGrid.tsx`                                                       |
| **REQ-NF003**  | Instant Data Sync Latency                 | Real-Time Sync Channel  | `RealTimeSyncModule`                          | `socketClient.ts`                                                                                    |
| **REQ-NF004**  | Simple and Intuitive UX/UI                | UI Layout Layer         | Design System                                 | `Header.tsx`, `StatusBadge.tsx`, `PatientFormFields.tsx`, `StaffFieldGrid.tsx`                       |
| **REQ-C001**   | 3-Day Completion Timeframe                | Workflow Planning       | Engineering Pipeline                          | Phase 1 to Phase 4 Execution                                                                         |
| **REQ-C002**   | Next.js Framework                         | Core Framework          | Next.js App Router                            | `app/layout.tsx`, `app/patient/page.tsx`, `app/staff/page.tsx`                                       |
| **REQ-C003**   | Tailwind CSS Styling                      | Styling Framework       | Tailwind Engine                               | `tailwind.config.js`, `globals.css`                                                                  |
| **REQ-C004**   | WebSockets Communication                  | Communication Layer     | WebSockets Hub                                | `lib/sync/socketClient.ts`, `pages/api/socket.ts`                                                    |
| **REQ-C005**   | Cloud Hosting Platform                    | DevOps Deployment       | Deployment Target                             | Vercel / Cloud Platform Configuration                                                                |
| **REQ-D001**   | Code Repository                           | Delivery Package        | Git Repository                                | Project Root Directory                                                                               |
| **REQ-D002**   | Deployed Application                      | Delivery Package        | Production Build                              | Cloud Live URL                                                                                       |
| **REQ-D003**   | README File                               | Documentation           | Project Documentation                         | `README.md`                                                                                          |
| **REQ-D004**   | Development Planning Documentation        | Documentation           | Project Documentation                         | `docs/` (`project-structure.md`, `design-decisions.md`, `component-architecture.md`, `sync-flow.md`) |
| **REQ-B001**   | Mock Data Generator                       | Form Helper Layer       | `FormValidationModule`                        | `PatientFormContainer.tsx`, `constants.ts`                                                           |
| **REQ-B002**   | Form Auto-Save & Local Backup             | Persistence Layer       | `WebStorageModule`                            | `PatientFormContainer.tsx` (`localStorage`)                                                          |
| **REQ-B003**   | Audit Trail / History Log                 | Activity Logging Layer  | `AuditLogModule`                              | `AuditTrailLog.tsx`, `useStaffSync.ts`                                                               |
| **REQ-B004**   | Field-Level Typing Indicator              | Real-Time UX Layer      | `RealTimeSyncModule`                          | `usePatientSync.ts`, `StaffFieldGrid.tsx`                                                            |
| **REQ-B005**   | Data Export (JSON & CSV)                  | Staff Workflow Layer    | `ExportModule`                                | `exportUtils.ts`, `StaffViewContainer.tsx`                                                           |

---

## 2. Completeness Verification

- **Orphan Requirements**: 0 (Every requirement maps to architecture, module, and component).
- **Bonus Features Mapped**: 5 (Mock Data, Auto-Save, Audit Log, Field Focus, Data Export).
