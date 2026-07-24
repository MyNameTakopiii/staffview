# Real-Time Synchronization Flow Documentation

Version: 1.0

---

## 1. Synchronization Mechanics

The system establishes instant bidirectional data synchronization between the **Patient Form** and **Staff View** using WebSockets via Socket.IO.

```
┌───────────────────────────┐                ┌───────────────────────────┐
│     Patient Interface     │                │      Staff Interface      │
│  (Keystroke & Input Event)│                │     (Live Data Mirror)    │
└─────────────┬─────────────┘                └─────────────▲─────────────┘
              │                                            │
              │ emit('patient_update', data)               │ socket.on('staff_patient_update')
              │ emit('patient_status', status)             │ socket.on('staff_patient_status')
              │ emit('patient_submit', data)               │ socket.on('staff_patient_submit')
              ▼                                            │
┌──────────────────────────────────────────────────────────┴────────────┐
│                    Next.js Socket.IO Server Relay                     │
│                           (/api/socket)                               │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 2. Activity Status State Machine

1. **Typing (`actively_filling_in`)**:
   - Every input keystroke triggers `useActivityTimer`.
   - The status is set to `actively_filling_in` and emitted via WebSockets to Staff View.
2. **Idle Detection (`inactive`)**:
   - A 5-second countdown timer starts after the last keystroke.
   - If no new input occurs within 5 seconds, the timer fires `handleIdle()`, transitioning status to `inactive` and emitting an update.
3. **Form Submission (`submitted`)**:
   - Upon clicking "Submit Information", Zod validates all required fields.
   - If valid, the form emits `patient_submit` and updates status to `submitted`.
