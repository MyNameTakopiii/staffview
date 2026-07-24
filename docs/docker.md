# Docker Setup & Containerization Guide

This document describes the Docker configuration for running the **StaffView** application in Development and Production modes.

---

## 🏗 Container Configurations

### 1. Development Mode (`Dockerfile.dev` & `docker-compose.dev.yml`)
Designed for rapid local development with live hot-reloading (Fast Refresh).

- **Base Image**: `oven/bun:1-alpine`
- **Volume Binding**: Binds local repository directory `.:/app` into the container while preserving isolated `/app/node_modules` and `/app/.next`.
- **Hot Reloading / HMR**: Enabled via `WATCHPACK_POLLING=true` and `CHOKIDAR_USEPOLLING=true`.
- **Port**: `3000:3000`

#### Why `WATCHPACK_POLLING=true` is required for Real-Time Hot Reloading:
When running Docker Desktop on **Windows**, file change events (e.g. `inotify`) from the Windows filesystem often do **not** automatically pass into the Linux container filesystem across volume mounts. By setting `WATCHPACK_POLLING=true`, Next.js / Webpack / Watchpack actively polls mounted files for changes, ensuring immediate Fast Refresh / HMR updates in the browser whenever source code is edited.

#### Running Development Container:
```bash
# Using Docker Compose
docker compose -f docker-compose.dev.yml up --build -d

# Or using Docker CLI directly
docker build -t staffview:dev -f Dockerfile.dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules -e WATCHPACK_POLLING=true staffview:dev
```

---

### 2. Production Mode (`Dockerfile` & `docker-compose.yml`)
Optimized for deployment with multi-stage builds and security hardening.

- **Stage 1 (`deps`)**: Installs production dependencies.
- **Stage 2 (`builder`)**: Builds the optimized Next.js static assets and server bundles.
- **Stage 3 (`runner`)**: Runs as non-root user `nextjs` (UID 1001) for security compliance.
- **Port**: `3000:3000`

#### Running Production Container:
```bash
# Using Docker Compose
docker compose up --build -d

# Or using Docker CLI directly
docker build -t staffview:prod -f Dockerfile .
docker run -p 3000:3000 staffview:prod
```

---

## 📡 Port & Socket.IO Architecture inside Docker

- **HTTP & WebSockets**: Both Next.js HTTP pages (`/patient`, `/staff`) and Socket.IO WebSocket streams (`/api/socket`) operate on port **`3000`**.
- Ensure host port `3000` is free before launching containers.
