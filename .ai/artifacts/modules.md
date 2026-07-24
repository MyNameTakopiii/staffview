# Module Architecture Specification

Version: 1.0  
Agent: Architecture Designer Agent

---

## 1. Module Breakdown

### 1.1 `FormValidationModule` (`/lib/validation/patientSchema.ts`)

- **Purpose**: Defines field validation schema and error message rules for patient input details.
- **Responsibility**: Validate required vs optional fields, email pattern, phone pattern, DOB format.
- **Dependencies**: `zod`
- **Owner**: Patient Form Layer
- **Public Interface**:
  - `patientSchema: ZodSchema`
  - `type PatientFormData = z.infer<typeof patientSchema>`

---

### 1.2 `RealTimeSyncModule` (`/lib/sync/socketClient.ts` & `/hooks/useSync.ts`)

- **Purpose**: Manages real-time WebSocket client connection and event pub/sub.
- **Responsibility**: Establish WS connection, emit patient input & status events, receive live patient data on Staff View.
- **Dependencies**: WebSockets API / Socket.IO Client
- **Owner**: Real-Time Communication Layer
- **Public Interface**:
  - `usePatientSync(): { emitInputChange, emitStatusChange, emitSubmit }`
  - `useStaffSync(): { patientData, patientStatus, connectionState }`

---

### 1.3 `ActivityTimerModule` (`/hooks/useActivityTimer.ts`)

- **Purpose**: Tracks patient typing activity and detects idle timeout.
- **Responsibility**: Reset idle timer on input, trigger `inactive` status after 5s idle duration.
- **Dependencies**: React hooks (`useCallback`, `useRef`, `useEffect`)
- **Owner**: Patient Form Layer
- **Public Interface**:
  - `useActivityTimer(onIdle: () => void, onActive: () => void, idleTimeoutMs?: number)`

---

### 1.4 `WebSocketServerModule` (`/pages/api/socket.ts` or `/server/socketServer.ts`)

- **Purpose**: Server-side WebSocket server relaying real-time messages between patient and staff clients.
- **Responsibility**: Handle client connection events, broadcast form state & status updates to subscribers.
- **Dependencies**: Node.js `ws` / `socket.io`
- **Owner**: Real-Time Backend Service
- **Public Interface**:
  - Socket events: `join_room`, `patient_update`, `patient_status`, `patient_submit`
