# Architecture Decision Records (ADRs)

Version: 1.0  
Agent: Architecture Designer Agent

---

## ADR-001: WebSockets / Socket.IO for Real-Time Synchronization

### Decision

Use Socket.IO / WebSockets for bidirectional communication between Patient Form and Staff View.

### Context

Requirement `REQ-F005` specifies: _"Use WebSockets or any suitable real-time technology to synchronize data between the patient and staff views instantly."_

### Alternatives

- **HTTP Short Polling**: High latency, unnecessary server load.
- **Server-Sent Events (SSE)**: Unidirectional only (server-to-client); requires separate HTTP requests from patient client to server.

### Consequences

- **Pros**: Ultra-low latency, bidirectional, event-driven state updates, easy status tracking.
- **Cons**: Requires WebSocket server layer compatible with cloud deployment.

### Reason

WebSockets provide the standard, efficient mechanism for instant bidirectional synchronization requested by assignment constraints.

---

## ADR-002: Next.js App Router with Separate `/patient` and `/staff` Routes

### Decision

Structure interfaces into distinct Next.js pages (`app/patient/page.tsx` and `app/staff/page.tsx`).

### Context

Requirements `REQ-F001` and `REQ-F003` define two distinct interfaces (Patient Form and Staff View).

### Alternatives

- **Single Page with Toggle Tabs**: Mixes patient input state with staff view monitoring in one component tree.

### Consequences

- **Pros**: Clean separation of concerns, allows testing multi-window sync across two browser tabs or distinct mobile/desktop devices.
- **Cons**: Requires shared WebSocket client connection logic.

### Reason

Separate routes cleanly reflect real-world usage where patients interact on a mobile/tablet device while staff monitor on desktop/kiosk devices.

---

## ADR-003: Client-Side Idle Activity State Machine (5s Threshold)

### Decision

Track patient typing activity with a 5-second client-side idle timer to determine activity status (`actively_filling_in`, `inactive`, `submitted`).

### Context

Requirement `REQ-F004` states: _"Display indicators to show if the patient has submitted, is actively filling in, or is inactive in the form."_

### Alternatives

- **Server-Side Idle Detection**: Adds unnecessary complexity and latency on the backend server.

### Consequences

- **Pros**: Simple, reliable, zero server computational overhead for idle tracking.
- **Cons**: Depends on client clock timer accuracy.

### Reason

Client-side debouncing and idle timers provide immediate status transitions with minimal code complexity.
