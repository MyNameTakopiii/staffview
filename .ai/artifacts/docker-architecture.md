# Docker Architecture & Deployment Artifact

Version: 1.0  
Agent: Architecture Designer Agent / Implementation Agent

---

## 1. Executive Summary

This document specifies the containerized execution model for the **StaffView Patient Intake & Staff Monitoring System**.
The application is dockerized for both **Development** (`dev`) and **Production** (`prod`) environments using Bun (`oven/bun:1-alpine`).

---

## 2. Environment Configurations

| Attribute          | Development (`Dockerfile.dev`)   | Production (`Dockerfile`)                     |
| :----------------- | :------------------------------- | :-------------------------------------------- |
| **Base Image**     | `oven/bun:1-alpine`              | `oven/bun:1-alpine`                           |
| **Build Strategy** | Single stage + host volume mount | Multi-stage (`deps` -> `builder` -> `runner`) |
| **Hot Reload**     | Enabled (`bun run dev`)          | Disabled (`bun run start`)                    |
| **Security User**  | Default                          | Non-root (`nextjs`, UID 1001)                 |
| **Compose Spec**   | `docker-compose.dev.yml`         | `docker-compose.yml`                          |
| **Exposed Port**   | 3000                             | 3000                                          |

---

## 3. Container Dataflow & Socket Gateway

```
 ┌────────────────────────────────────────────────────────┐
 │                    Docker Container                    │
 │  ┌──────────────────────┐    ┌──────────────────────┐  │
 │  │   Next.js App        │    │ Socket.IO Server     │  │
 │  │   Routes (/patient,  │───>│ Endpoint             │  │
 │  │   /staff)            │    │ (/api/socket)        │  │
 │  └──────────────────────┘    └──────────────────────┘  │
 └───────────────────────────┬────────────────────────────┘
                             │ Exposed Port 3000
                             ▼
                    Host Browser Client
```

---

## 4. Execution Commands

- **Development**: `docker compose -f docker-compose.dev.yml up --build`
- **Production**: `docker compose up --build`
