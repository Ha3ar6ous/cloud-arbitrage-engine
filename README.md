# Cloud Arbitrage Engine 🚀

A high-performance, full-stack cloud cost optimization platform built with the MERN stack. Designed for developers and startups to simulate workloads, compare global cloud providers in INR, and uncover deep financial optimizations using smart arbitrage logic and syllabus-aligned architectural concepts.

---

## 🛠️ Tech Stack Overview

### Frontend
- **React (Vite)**: Lighting-fast HMR and build performance.
- **Context API**: Global state management for authentication and session persistence.
- **React Router**: Client-side routing for seamless navigation.
- **Vanilla CSS (Neobrutalism)**: A high-contrast, bold design system with flat colors, thick borders, and vibrant accents.
- **Lucide/React Icons**: Consistent iconography for better visual hierarchy.

### Backend
- **Node.js & Express**: Scalable RESTful API architecture.
- **MongoDB Atlas**: Persistent data storage for user sessions and history.
- **Mongoose**: ODM for structured data modeling.

---

## 📂 Project Architecture

```text
cloud/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets (Logos, Hero Mockups)
│   ├── src/
│   │   ├── components/         # Reusable UI (ResultCard, InputForm, Layout)
│   │   ├── context/            # Global state (AuthContext)
│   │   ├── data/               # Static pricing data (India-specific)
│   │   ├── pages/              # View Modules (Simulator, Dashboard, etc.)
│   │   └── App.jsx             # Route Registration
├── server/                     # Backend API
│   ├── config/                 # DB Connections
│   ├── controllers/            # Business Logic (Arbitrage Math, Scoring)
│   ├── models/                 # Mongoose Schemas (User)
│   ├── routes/                 # Express View Endpoints
│   └── index.js                # Server Entry Point
```

---

## 🧩 Module Documentation

### 1. Cloud Arbitrage Simulator (`/simulator`)
- **Purpose**: Predictive cost analysis for custom workloads.
- **Logic**: Accepts CPU, RAM, and Storage requirements. It calculates a **Weighted Composite Score** (50% Cost, 30% Performance, 20% Reliability) to recommend the "Smartest" provider, not just the cheapest.

### 2. Comparison Dashboard (`/dashboard`)
- **Purpose**: Visual and tabular cross-provider analysis.
- **Feature**: Real-time bar charts and detailed property tables comparing AWS, Azure, GCP, DigitalOcean, Hetzner, and Linode. Uses the latest local and external logos for high-fidelity branding.

### 3. What-If Scenarios (`/what-if`)
- **Purpose**: Architectural safety testing.
- **Logic**: Dynamic traffic-based simulation. Users adjust sliders for monthly traffic and toggle auto-scaling. The engine predicts cost explosions or savings and provides visual trend indicators (📈/📉).

### 4. Security & Reliability Audit (`/security`)
- **Purpose**: Compliance and risk assessment.
- **Feature**: Generates an automated audit score (0-100) based on region, data sensitivity, and public access. Includes a live feed of **real historical security incidents** relevant to the selected provider.

### 5. Syllabus Concepts (`/concepts`)
- **Purpose**: Educational alignment.
- **Feature**: A structured knowledge base covering Cloud Evolution, Virtualization, Containerization (Docker/K8s), and FinOps/Cost Management.

---

## 🚀 Development Setup

### Backend (Server)
1. `cd server`
2. `npm install`
3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_atlas_uri
   PORT=5000
   ```
4. `npm run dev`

### Frontend (Client)
1. `cd client`
2. `npm install`
3. `npm run dev`

---

## 🌐 Deployment Guide

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`.
2. Upload the `dist/` folder.
3. Ensure the `proxy` or API base URL points to your deployed backend.

### Backend (Render/Heroku)
1. Connect your GitHub repository.
2. Set Environment Variables (`MONGO_URI`).
3. Root directory: `server`.
4. Start command: `node index.js`.

---
Built for Cloud Efficiency.
