# Real-Time Synchronization Flow Documentation

Version: 2.0

---

## 1. Dual Real-Time Architecture (Socket.IO + Pusher + Serverless Relay)

The system features a hybrid **`RealtimeHub`** abstraction layer that supports both **Socket.IO** (for local development & Docker containers) and **Pusher / Serverless Event Relay** (for Vercel 100% serverless deployments) without breaking existing Socket.IO logic.

```
                             ┌───────────────────────────────────┐
                             │       RealtimeHub Abstraction    │
                             └─────────────────┬─────────────────┘
                                               │
                      ┌────────────────────────┴────────────────────────┐
                      ▼                                                 ▼
        ┌───────────────────────────┐                     ┌───────────────────────────┐
        │       Socket.IO Mode      │                     │   Pusher / Serverless     │
        │   (Local & Docker Host)   │                     │     (Vercel Platform)     │
        └─────────────┬─────────────┘                     └─────────────┬─────────────┘
                      │                                                 │
                      ▼                                                 ▼
        ┌───────────────────────────┐                     ┌───────────────────────────┐
        │ Next.js Socket.IO Server  │                     │ Pusher Channels / API     │
        │      (/api/socket)        │                     │   (/api/pusher Server)    │
        └───────────────────────────┘                     └───────────────────────────┘
```

---

## 2. Synchronization Mechanics

- **Patient Interface**: Emits input updates (`patient_update`), field focus (`patient_focus`), status changes (`patient_status`), and submissions (`patient_submit`).
- **Staff Interface**: Subscribes to events and updates mirrored UI cards and audit trail entries instantly.
- **Provider Detection**:
  1. **Socket.IO**: Used when running on a persistent server (Local Dev / Docker container).
  2. **Pusher Channels**: Used when `NEXT_PUBLIC_PUSHER_KEY` is provided in environment variables.
  3. **Serverless Event Relay**: Fallback mode for Vercel deployments ensuring zero disconnection loops.

---

## 3. Activity Status State Machine

1. **Typing (`actively_filling_in`)**:
   - Every input keystroke triggers `useActivityTimer`.
   - The status is set to `actively_filling_in` and emitted via `realtimeHub` to Staff View.
2. **Idle Detection (`inactive`)**:
   - A 5-second countdown timer starts after the last keystroke.
   - If no new input occurs within 5 seconds, the timer fires `handleIdle()`, transitioning status to `inactive` and emitting an update.
3. **Form Submission (`submitted`)**:
   - Upon clicking "Submit Information", Zod validates all required fields.
   - If valid, the form emits `patient_submit` and updates status to `submitted`.
