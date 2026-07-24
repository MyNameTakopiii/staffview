# Real-Time Patient Intake Form & Staff View System

[![Framework](https://img.shields.io/badge/Framework-Next.js_15-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![Styling](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Real-Time](https://img.shields.io/badge/Real--Time-WebSockets%2FSocket.IO-010101.svg?style=flat&logo=socketdotio)](https://socket.io/)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=flat&logo=docker)](docs/docker.md)
[![Vercel](https://img.shields.io/badge/Vercel-Staging_Ready-000000.svg?style=flat&logo=vercel)](docs/deploy-vercel.md)

A responsive, real-time patient input form and staff monitoring interface built for the **Agnos Candidate Assignment**.

---

## 🌟 Key Features

- **Patient Form (`/patient`)**:
  - Collects 13 personal, contact, address, background, and emergency contact details.
  - Complete form validation powered by **React Hook Form** and **Zod** schemas.
  - Real-time keystroke broadcasting to staff view.
  - 5-second inactivity idle detection.
- **Staff View (`/staff`)**:
  - Mirrored real-time display reflecting every patient input instantly.
  - Activity status indicators: **Actively Filling In**, **Inactive**, and **Submitted**.
  - Responsive card grid layout adapting seamlessly across mobile, tablet, and desktop viewports.
- **Real-Time Engine**:
  - Built using **Socket.IO / WebSockets** event streaming for ultra-low latency updates.
- **Docker & Vercel Staging Support**:
  - Out-of-the-box containerization for **Development** and **Production** plus pre-configured **Vercel Staging** deployment.

---

## 🎁 Bonus Features

1. 🪄 **1-Click Mock Data Generator**:
   - Includes a "Fill Sample Data" button on the Patient Form to instantly populate valid test data for quick evaluator testing.
2. 💾 **Form Auto-Save & Draft Recovery**:
   - Incomplete form inputs are automatically saved to `localStorage` and restored upon browser refresh to prevent accidental data loss.
3. 📜 **Real-Time Audit Trail & Change Log**:
   - Staff View includes an expandable Audit Log recording timestamped events (input changes, focus events, status updates, submissions).
4. 🔍 **Field-Level Focus & Typing Indicator**:
   - Highlights the specific field card on the Staff View with a glowing cyan ring and pulsing "Editing..." tag when the patient focuses an input.
5. 📥 **Patient Data Export (JSON & CSV)**:
   - Staff members can export current or submitted patient intake summaries directly as downloadable `.json` or `.csv` files.

---

## 🚀 Quick Start & Run Instructions

### Option A: Local Development (without Docker)

#### Prerequisites
- **Bun**: `v1.3.x` or higher (or Node.js `v18.x`+)

#### Steps
1. **Install dependencies**:
   ```bash
   bun install
   ```
2. **Run dev server**:
   ```bash
   bun dev
   ```
3. Open in browser: `http://localhost:3000`
   - **Homepage**: `http://localhost:3000`
   - **Patient Form**: `http://localhost:3000/patient`
   - **Staff View**: `http://localhost:3000/staff`

---

### Option B: Docker Development (with Hot Reload)

Run the local development container with live code reloading:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Access the app at `http://localhost:3000`.

---

### Option C: Docker Production Mode

Run the optimized multi-stage production container:

```bash
docker compose up --build
```

Access the app at `http://localhost:3000`.

---

### Option D: Deploy to Vercel Staging

Deploy a preview / staging build using Vercel CLI:

```bash
bunx vercel
```

Detailed Vercel staging deployment instructions are in [docs/deploy-vercel.md](docs/deploy-vercel.md).

> 💡 **Tip**: Open `http://localhost:3000/patient` and `http://localhost:3000/staff` in two side-by-side browser windows to observe live keystroke mirroring, active field focus indicators, and audit trail updates in real time!

---

## 📂 Project Structure & Documentation

Detailed development planning documentation is available in the `docs/` directory:

- 📐 [Project Structure](docs/project-structure.md) - Explanation of directory & file organization.
- 🐳 [Docker Containerization Guide](docs/docker.md) - Dev & Prod container setup instructions.
- ☁️ [Vercel Deployment Guide](docs/deploy-vercel.md) - Staging and production deployment setup on Vercel.
- 🎨 [UI/UX Design Decisions](docs/design-decisions.md) - Responsive layout decisions for mobile vs desktop.
- 🧩 [Component Architecture](docs/component-architecture.md) - Summary of core components and purposes.
- ⚡ [Real-Time Synchronization Flow](docs/sync-flow.md) - WebSocket event flow and inactivity state machine mechanics.

---

## 🧪 Verification, Testing & Build

### Running Playwright End-to-End Tests

To execute real-time synchronization E2E tests:

```bash
bun run test:e2e
```

### Production Build Verification

To test production build compilation with Bun:

```bash
bun run build
bun start
```
