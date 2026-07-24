# Project Structure Documentation

Version: 1.2

---

```text
staffview/
├── .ai/                            # AI Multi-Agent configuration & execution artifacts
│   ├── AGENTS.md                   # Multi-agent system workflow definition
│   ├── CHECKLIST.md                # Phase quality gates & DoD
│   ├── WORKFLOW.md                 # Pipeline graph & agent roles
│   ├── agents/                     # Agent role specifications
│   └── artifacts/                  # Phase deliverables (requirements, architecture, implementation)
├── docs/                           # Development planning documentation
│   ├── project-structure.md        # File & directory organization
│   ├── design-decisions.md         # UI/UX design choices across viewports
│   ├── component-architecture.md   # Core component hierarchy & contracts
│   ├── sync-flow.md                # Real-time WebSocket synchronization mechanics
│   ├── docker.md                   # Docker development & production containerization guide
│   └── deploy-vercel.md            # Vercel staging & preview deployment guide
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root HTML wrapper & fonts
│   │   ├── globals.css             # Tailwind CSS imports & global styles
│   │   ├── page.tsx                # Portal home page with navigation tiles
│   │   ├── patient/page.tsx        # Patient form intake route
│   │   └── staff/page.tsx          # Staff real-time monitoring route
│   ├── components/                 # UI Components
│   │   ├── shared/                 # Shared widgets (Header, StatusBadge)
│   │   ├── patient/                # Patient form containers & field inputs
│   │   └── staff/                  # Staff monitoring container & mirrored data grid
│   ├── hooks/                      # Reusable React hooks
│   │   ├── usePatientSync.ts       # Socket emitter hook for patient form
│   │   ├── useStaffSync.ts         # Socket listener hook for staff view
│   │   └── useActivityTimer.ts     # Keystroke & 5s idle activity timer
│   ├── lib/                        # Core logic modules
│   │   ├── validation/             # Zod validation schema (patientSchema.ts)
│   │   └── sync/                   # Socket.IO client initialization
│   ├── types/                      # TypeScript definitions (patient.ts)
│   └── pages/api/                  # Next.js API Routes
│       └── socket.ts               # Socket.IO WebSocket server endpoint
├── Dockerfile                      # Multi-stage Production Dockerfile
├── Dockerfile.dev                  # Development Dockerfile with hot reload
├── docker-compose.yml              # Production Docker Compose stack configuration
├── docker-compose.dev.yml          # Development Docker Compose stack configuration
├── .dockerignore                   # Docker build ignore filters
├── vercel.json                     # Vercel deployment configuration
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript compiler configuration
├── tailwind.config.js              # Tailwind styling configuration
├── next.config.js                  # Next.js framework configuration
└── README.md                       # Project overview & running instructions
```
