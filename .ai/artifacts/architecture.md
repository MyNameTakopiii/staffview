# System Architecture Document

Version: 1.0  
Agent: Architecture Designer Agent

---

## 1. Executive Summary

This document defines the high-level architecture for the **Patient Form & Staff View Real-Time System** built with **Next.js**, **Tailwind CSS**, and **WebSockets / Real-Time Messaging**.

The architecture adheres strictly to validated requirements from Phase 1 without adding unrequested functionality or external dependencies.

---

## 2. Architecture Style & Principles

- **Architecture Style**: Client-Server with Event-Driven Real-Time Synchronization.
- **Frontend Layer**: Next.js App Router providing two main responsive views:
  1. `/patient` - Patient Form Interface
  2. `/staff` - Staff Real-Time Monitoring Interface
- **Real-Time Layer**: WebSocket / Real-Time Event Hub operating as a bidirectional pub/sub channel for synchronized form updates, status flags, and submissions.
- **Design Principles**:
  - **Single Source of Truth**: Patient Form produces form state; Staff View consumes form state.
  - **Unidirectional Data Flow**: Form input -> Validation -> Real-Time Event Broadcast -> Staff View UI update.
  - **Loose Coupling**: Components communicate exclusively via explicit event messages and props.

---

## 3. System Boundaries

```
┌─────────────────────────┐                   ┌─────────────────────────┐
│   Patient Form View     │                   │     Staff View UI       │
│  (Next.js Client Page)  │                   │  (Next.js Client Page)  │
└────────────┬────────────┘                   └────────────▲────────────┘
             │                                             │
             │ Emit Input / Status Events                  │ Listen for Events
             ▼                                             │
┌──────────────────────────────────────────────────────────┴────────────┐
│                    Real-Time Synchronization Server                   │
│             (WebSockets Server / Custom WS / Socket.IO Hub)           │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 4. Communication & Synchronization Protocol

### 4.1 Event Types

1. `PATIENT_INPUT_CHANGE`: Transmits field name and value as patient types.
2. `PATIENT_STATUS_CHANGE`: Transmits activity state (`actively_filling_in`, `inactive`, `submitted`).
3. `PATIENT_FORM_SUBMIT`: Transmits final submitted form payload.
4. `PATIENT_FIELD_FOCUS` (Bonus): Transmits the specific field ID currently focused by the patient.

### 4.2 Inactivity & Draft Management

- Patient client tracks typing events and focused input field.
- Local draft is saved to browser `localStorage` (`staffview_patient_draft`) on input change and cleared on submission.
- After 5 seconds of no keystrokes, client emits `PATIENT_STATUS_CHANGE` with status `inactive`.
- Resume typing emits status `actively_filling_in`.
- Form submit emits status `submitted`.

---

## 5. Technology & Bonus Architecture Mapping

| Layer                   | Technology                             | Purpose / Justification            |
| ----------------------- | -------------------------------------- | ---------------------------------- |
| Framework               | Next.js (App Router)                   | Constraint `REQ-C002`              |
| Styling                 | Tailwind CSS                           | Constraint `REQ-C003`              |
| Real-Time Communication | WebSockets / Socket.IO Client & Server | Constraint `REQ-C004` & `REQ-F005` |
| Form Validation         | React Hook Form + Zod                  | Requirement `REQ-F002`             |
| Deployment Platform     | Vercel / Cloud Frontend Platform       | Constraint `REQ-C005`              |
| Draft Storage (Bonus)   | HTML5 Web Storage (`localStorage`)     | Feature `REQ-B002` (Auto-Save)     |
| Audit Logging (Bonus)   | Reactive Event Stream State            | Feature `REQ-B003` (Audit Trail)   |
| Data Export (Bonus)     | Browser Blob & File Download API       | Feature `REQ-B005` (Data Export)   |
