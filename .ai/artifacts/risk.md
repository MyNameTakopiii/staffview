# Risk Analysis

Version: 1.0  
Agent: Requirements & Planning Agent

---

## 1. Risk Matrix

| Risk ID     | Category     | Description                                                                                              | Likelihood | Impact | Mitigation Strategy                                                                                                                                                        |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RSK-001** | Technical    | Serverless environments (e.g. Vercel) terminate long-lived WebSocket connections.                        | High       | High   | Use a WebSocket connection server compatible with Vercel API routes / custom Node WS server or external real-time provider (Socket.IO / Ably / Pusher / custom WS server). |
| **RSK-002** | Performance  | High-frequency input updates cause excessive network traffic or UI re-render jitter on Staff View.       | Medium     | Medium | Implement lightweight debouncing/throttling (e.g., 100ms sync batching) on form input changes before emitting socket events.                                               |
| **RSK-003** | Architecture | Race conditions or out-of-order event delivery between Patient Form and Staff View.                      | Low        | Medium | Include timestamped sequence markers or full-state snapshot payload in socket broadcast events.                                                                            |
| **RSK-004** | Security     | Unsanitized patient data rendered on Staff View (XSS risk).                                              | Low        | High   | Use React default escaping and Zod schema sanitization for all form field values.                                                                                          |
| **RSK-005** | Testing      | Inability to test real-time sync in single-browser window during verification.                           | Medium     | Medium | Design Patient Form (`/patient`) and Staff View (`/staff`) as independent routes so two tabs/windows easily demonstrate live sync.                                         |
| **RSK-006** | Deployment   | Deployment platform build fails due to missing environment variables or WebSocket URL misconfigurations. | Medium     | High   | Include clear environment configuration documentation and fallback defaults in code repository.                                                                            |
