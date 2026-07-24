# Vercel Staging & Deployment Guide

This document describes how to deploy the **StaffView** Next.js application to **Vercel Staging / Preview** and Production.

---

## 🚀 Quick Deployment to Vercel Staging

### Step 1: Vercel CLI Authentication
If Vercel CLI is not logged in on your machine, authenticate first:

```bash
bunx vercel login
```

### Step 2: Deploy to Staging (Preview Environment)
To deploy a new preview/staging build:

```bash
bunx vercel
```
Follow the prompts:
- **Set up and deploy?**: `y`
- **Which scope?**: Select your Vercel account/team.
- **Link to existing project?**: `n` (or `y` if already linked)
- **Project Name**: `staffview-staging` (or default)
- **Directory**: `./`

Vercel will build the project and output a unique **Preview/Staging URL** (e.g., `https://staffview-xxx.vercel.app`).

### Step 3: Deploy to Production
To promote your staging deployment to production:

```bash
bunx vercel --prod
```

---

## ⚙️ Vercel Environment Configuration (`vercel.json`)

The project includes `vercel.json` pre-configured for Bun and Next.js 15:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install"
}
```

---

## ⚡ Important Architecture Note: WebSockets on Vercel

> [!IMPORTANT]
> - **Vercel Serverless Functions**: Next.js pages and API routes run as stateless serverless functions on Vercel.
> - **Real-Time WebSocket Server**: For real-time Socket.IO synchronization between `/patient` and `/staff`, set the `NEXT_PUBLIC_SOCKET_URL` environment variable in Vercel Project Settings to point to your persistent Docker/Node backend instance (e.g., hosted on Render, Railway, Fly.io, or VPS).
> - When `NEXT_PUBLIC_SOCKET_URL` is omitted, the app connects relative to `/api/socket`.
