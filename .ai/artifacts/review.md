# Requirements Review

Version: 1.0  
Agent: Requirements & Planning Agent

---

## 1. Overview

This document presents the formal review of the requirements extracted from the **Agnos Candidate Assignment**.

---

## 2. Requirement Issues & Ambiguities

### ISSUE-001: Session Isolation / Multi-Patient Support

- **Category**: Ambiguous Wording & Missing Information
- **Description**: The specification mentions "the patient form" and "the staff view", but does not explicitly clarify if multiple patients can use the form simultaneously or if patient-staff pairs require session/room IDs.
- **Reason**: In a real hospital setting, multiple patients fill out forms concurrently. However, for a single test submission, a single active room or session token mechanism prevents cross-talk.
- **Proposed Resolution**: Implement room-based/session-based synchronization (e.g. default shared session with option to join session/room ID).
- **Severity**: Medium

### ISSUE-002: Inactivity Status Threshold

- **Category**: Missing Information
- **Description**: The requirement states: _"Display indicators to show if the patient has submitted, is actively filling in, or is inactive in the form."_ No duration is specified for triggering the "inactive" state.
- **Reason**: Frontend needs an explicit debounce or idle timer threshold to transition status from "actively filling in" to "inactive".
- **Proposed Resolution**: Use a deterministic 5-second idle timer threshold after the last user keystroke/input event to mark status as "inactive".
- **Severity**: Low

### ISSUE-003: Backend Database Persistence

- **Category**: Scope Boundary / Missing Information
- **Description**: The assignment asks for form submission and real-time viewing, but does not explicitly request database storage or authentication.
- **Reason**: Per system rules (`AGENTS.md` section 14 Constraints), do not add persistence or databases unless explicitly required.
- **Proposed Resolution**: Form submission will trigger state transition to "submitted" in real-time sync state without requiring a persistent database backend.
- **Severity**: Low

---

## 3. Duplicate / Conflicting Requirements Audit

- **Duplicate Requirements**: None found.
- **Conflicting Requirements**: None found.

---

## 4. Requirement Verification Summary

| Requirement ID | Title                                     | Status    | Confidence |
| -------------- | ----------------------------------------- | --------- | ---------- |
| REQ-F001       | Patient Personal Details Input            | Validated | High       |
| REQ-F002       | Patient Form Validation                   | Validated | High       |
| REQ-F003       | Staff View Real-Time Field Display        | Validated | High       |
| REQ-F004       | Patient Activity Indicators on Staff View | Validated | High       |
| REQ-F005       | Real-Time Data Synchronization            | Validated | High       |
| REQ-NF001      | Responsive Design (Patient Form)          | Validated | High       |
| REQ-NF002      | Responsive Design (Staff View)            | Validated | High       |
| REQ-NF003      | Instant Sync Latency                      | Validated | High       |
| REQ-NF004      | Simple and Intuitive UX/UI                | Validated | High       |
| REQ-C001       | 3-Day Completion Timeframe                | Validated | High       |
| REQ-C002       | Next.js Framework                         | Validated | High       |
| REQ-C003       | TailwindCSS Styling                       | Validated | High       |
| REQ-C004       | WebSockets / Real-Time Tech               | Validated | High       |
| REQ-C005       | Cloud Hosting Platform                    | Validated | High       |
| REQ-D001       | Code Repository                           | Validated | High       |
| REQ-D002       | Live Deployed Link                        | Validated | High       |
| REQ-D003       | README File                               | Validated | High       |
| REQ-D004       | Development Planning Documentation        | Validated | High       |
