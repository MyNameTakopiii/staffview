# Skill Selection & Discovery

Version: 1.0  
Agent: Requirements & Planning Agent

---

## 1. Skill Classification

### 1.1 Official Skills

#### Skill 1: Next.js Framework

- **Name**: Next.js App Router
- **Purpose**: Core full-stack web application framework supporting Patient Form and Staff View pages.
- **Input**: React components, TypeScript code, App routes.
- **Output**: SSR / Static / Dynamic HTML, JS bundles, API routes.
- **Required Tools**: Node.js, npm/pnpm.
- **Reusability**: High.
- **Source**: Explicit requirement (`Framework: Next.js`).

#### Skill 2: Tailwind CSS

- **Name**: Tailwind CSS Utility Styling
- **Purpose**: Responsive, modern styling for mobile and desktop views.
- **Input**: JSX classes, Tailwind config.
- **Output**: Optimized CSS bundle.
- **Required Tools**: PostCSS, Tailwind CLI/plugin.
- **Reusability**: High.
- **Source**: Explicit requirement (`Styling: TailwindCSS`).

#### Skill 3: WebSocket / Realtime API

- **Name**: WebSockets / Bidirectional Data Channel
- **Purpose**: Instant synchronization of patient input and form status to staff view.
- **Input**: JSON payload events (`INPUT_CHANGE`, `STATUS_CHANGE`, `SUBMIT`).
- **Output**: Real-time event broadcasts.
- **Required Tools**: Node.js WebSocket engine or WebSockets browser API.
- **Reusability**: High.
- **Source**: Explicit requirement (`Real-Time Communication: WebSockets or any suitable solution`).

---

### 1.2 Community Skills

#### Skill 4: React Hook Form + Zod

- **Name**: React Hook Form with Zod Validation
- **Purpose**: Performant form handling and schema validation for patient details.
- **Input**: Form inputs, Zod validation schema.
- **Output**: Validated form state, field-level error messages.
- **Required Tools**: npm packages (`react-hook-form`, `zod`, `@hookform/resolvers`).
- **Reusability**: High.
- **Source**: Community standard for Next.js form validation.

#### Skill 5: Socket.IO / Custom WS Client

- **Name**: WebSockets Communication Layer
- **Purpose**: Reliable real-time event subscription and broadcast between client sessions.
- **Input**: Socket events.
- **Output**: Real-time state listeners and emitters.
- **Required Tools**: `socket.io-client` or native WebSocket wrapper.
- **Reusability**: High.
- **Source**: Community standard for Next.js real-time apps.

---

### 1.3 Custom & Engineering Skills

#### Skill 6: Clean Code (`.ai/skills/clean-code`)

- **Purpose**: Enforces small single-responsibility functions, DRY principles, and self-documenting code.
- **Source**: Custom project skill.

#### Skill 7: Semantic HTML (`.ai/skills/semantic-html`)

- **Purpose**: Ensures HTML5 semantic layout (`<header>`, `<main>`, `<section>`, `<label>`).
- **Source**: Custom project skill.

#### Skill 8: Accessibility (`.ai/skills/accessibility`)

- **Purpose**: Guarantees WCAG compliance, keyboard navigation, and ARIA attributes for real-time updates.
- **Source**: Custom project skill.

#### Skill 9: Component Design (`.ai/skills/component-design`)

- **Purpose**: Enforces modular presentational vs container component architecture.
- **Source**: Custom project skill.

#### Skill 10: Refactoring (`.ai/skills/refactoring`)

- **Purpose**: Guides non-breaking structural code improvements verified by builds and E2E tests.
- **Source**: Custom project skill.

#### Skill 11: Code Review (`.ai/skills/code-review`)

- **Purpose**: Code review checklist for type safety, security, memory leak prevention, and requirement mapping.
- **Source**: Custom project skill.

#### Skill 12: Patient-Staff Sync Flow Designer

- **Name**: Real-Time Synchronization Protocol
- **Purpose**: Manages debounced input broadcast and idle status detection logic (`filling_in`, `inactive`, `submitted`).
- **Input**: Local form changes and keystrokes.
- **Output**: Synced state object sent to staff view.
- **Required Tools**: Custom React hooks (`usePatientSync`, `useStaffSync`).
- **Reusability**: Project-specific.
- **Source**: Custom design.

---

## 2. Minimum Required Skill Set Selection

| Skill Name             | Category           | Status       | Justification                                                                                               |
| ---------------------- | ------------------ | ------------ | ----------------------------------------------------------------------------------------------------------- |
| Next.js                | Official           | **Selected** | Mandated framework by assignment constraints.                                                               |
| Tailwind CSS           | Official           | **Selected** | Mandated styling by assignment constraints.                                                                 |
| WebSockets / Socket.IO | Official/Community | **Selected** | Mandated real-time communication by assignment constraints.                                                 |
| React Hook Form + Zod  | Community          | **Selected** | Provides robust field validation (email, phone, required fields) as requested.                              |
| Custom Sync Hooks      | Custom             | **Selected** | Enables seamless real-time state sync and activity status tracking (`submitted`, `filling_in`, `inactive`). |

---

## 3. Rejected Skills

| Skill Name          | Reason for Rejection                                                         |
| ------------------- | ---------------------------------------------------------------------------- |
| Redux / Zustand     | Unnecessary state overhead for simple real-time socket sync.                 |
| PostgreSQL / Prisma | Database persistence is not required by assignment scope.                    |
| GraphQL / Apollo    | REST / WebSocket events provide a simpler, lighter real-time sync mechanism. |
