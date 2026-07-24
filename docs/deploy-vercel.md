# Vercel Staging & Deployment Guide

This document describes how to deploy the **StaffView** Next.js application to **Vercel Staging / Preview** and Production with hybrid Real-Time support (Pusher Channels / Serverless Event Relay + Socket.IO).

---

## ⚡ Real-Time Provider Modes on Vercel

The application features a hybrid **`RealtimeHub`** system:
1. **Pusher Channels (Recommended for Vercel)**: Set Pusher Environment Variables in Vercel.
2. **Serverless Event Relay (Zero-Config Fallback)**: Automatically active if Pusher keys are omitted; prevents disconnect loops on Vercel.
3. **Socket.IO (Local & Docker)**: Preserved 100% for local development (`bun dev`) and Docker containers (`docker compose up`).

---

## 🔑 Environment Variables for Pusher on Vercel (Optional)

Add these to your **Vercel Project Settings -> Environment Variables**:

| Variable Name | Description | Location |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_PUSHER_KEY` | Pusher App Key | Client & Server |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | Pusher Cluster (e.g. `ap1`) | Client & Server |
| `PUSHER_APP_ID` | Pusher App ID | Server |
| `PUSHER_SECRET` | Pusher App Secret | Server |

---

## 🚀 Quick Deployment Commands

### Step 1: Login to Vercel CLI
```bash
bunx vercel login
```

### Step 2: Deploy to Staging (Preview Environment)
```bash
bunx vercel
```

### Step 3: Deploy to Production
```bash
bunx vercel --prod
```
