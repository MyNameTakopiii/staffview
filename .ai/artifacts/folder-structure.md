# Target Project Folder Structure

Version: 1.0  
Agent: Architecture Designer Agent

---

```text
staffview/
├── .ai/                       # Agent workflow & artifacts
│   ├── AGENTS.md
│   ├── WORKFLOW.md
│   ├── CHECKLIST.md
│   ├── agents/
│   ├── artifacts/
│   ├── memory/
│   └── skills/
├── public/                    # Static assets & favicon
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with Tailwind fonts & styles
│   │   ├── page.tsx           # Home navigation page (links to /patient and /staff)
│   │   ├── patient/
│   │   │   └── page.tsx       # Patient Form Page
│   │   └── staff/
│   │       └── page.tsx       # Staff View Monitoring Page
│   ├── components/            # UI Components
│   │   ├── shared/
│   │   │   ├── Header.tsx     # Navigation header
│   │   │   └── StatusBadge.tsx # Patient status indicator badge
│   │   ├── patient/
│   │   │   ├── PatientFormContainer.tsx # Root patient form container
│   │   │   └── PatientFormFields.tsx    # Form fields grid
│   │   └── staff/
│   │       ├── StaffViewContainer.tsx   # Root staff view container
│   │       └── StaffFieldGrid.tsx       # Live mirrored field grid
│   ├── hooks/                 # Custom React Hooks
│   │   ├── usePatientSync.ts  # Emitter hook for patient form
│   │   ├── useStaffSync.ts    # Listener hook for staff view
│   │   └── useActivityTimer.ts # Inactivity timer hook
│   ├── lib/                   # Utility modules & validation schemas
│   │   ├── validation/
│   │   │   └── patientSchema.ts # Zod schema for patient details
│   │   └── sync/
│   │       └── socketClient.ts # WebSocket connection client
│   ├── types/                 # TypeScript interfaces
│   │   └── patient.ts         # Patient data & status types
│   └── pages/api/             # Next.js API Routes (if using Socket.IO server route)
│       └── socket.ts          # WebSocket server handler
├── docs/                      # Development planning & project documentation
│   ├── project-structure.md
│   ├── design-decisions.md
│   ├── component-architecture.md
│   └── sync-flow.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
